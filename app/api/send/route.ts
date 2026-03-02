import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { groq } from "next-sanity"
import { LeadNotification } from "@/src/components/emails/LeadNotification"
import {
  HIGH_VALUE_KEYWORDS,
  computeIntentScore,
} from "@/lib/lead-constants"
import { getSupabaseServerClient } from "@/lib/supabase"
import { sanityClient, sanityWriteClient } from "@/lib/sanity.client"
import { hasSanityEnv } from "@/sanity/env"
import { decryptLeadField, encryptLeadField, verifySignedNonce } from "@/lib/security"

const contactEmail = process.env.CONTACT_EMAIL
const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"

const leadApiSchema = z.object({
  lead_id: z.string().uuid().optional(),
  session_id: z.string().optional(),
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  propertyInterest: z.string().optional(),
  budgetRange: z.string().optional(),
  preferredDate: z.string().optional(),
  referrer_url: z.string().optional(),
  intentScore: z.number().min(0).max(100).optional(),
  sessionDurationSeconds: z.number().min(0).optional(),
  device_info: z.string().optional(),
  device_tier: z.enum(["High-end Apple", "Standard"]).optional(),
  user_agent: z.string().optional(),
  lead_image_url: z.string().optional(),
  image_analysis_summary: z.string().optional(),
  client_intelligence: z
    .object({
      ipLocation: z.string().optional(),
      localTime: z.string().optional(),
      timezone: z.string().optional(),
      hardwareClass: z.enum(["Apple", "Other"]).optional(),
    })
    .optional(),
  behavioral_profile: z
    .object({
      style: z.enum(["analytical", "visionary", "balanced"]).optional(),
      sentiment: z.enum(["positive", "neutral", "cautious"]).optional(),
      cadence: z.enum(["concise", "balanced", "detailed"]).optional(),
      confidence: z.number().min(0).max(1).optional(),
    })
    .optional(),
  deviceInfo: z
    .object({
      tier: z.enum(["high", "mid", "low"]).optional(),
      label: z.string().optional(),
      userAgent: z.string().optional(),
      screenWidth: z.number().min(0).optional(),
      screenHeight: z.number().min(0).optional(),
      pixelRatio: z.number().min(0.1).optional(),
    })
    .optional(),
  chat_history: z.array(z.object({ role: z.string(), text: z.string() })).optional(),
})

const executiveInsightSchema = z.object({
  intent: z.string(),
  budgetType: z.string(),
  urgency: z.string(),
})

type ExecutiveInsight = z.infer<typeof executiveInsightSchema>
type EmailBranding = { companyName: string; logoUrl?: string }
type EmailBrandingRaw = { companyName?: string; logoUrl?: string; updatedAt?: string }

const emailBrandingQuery = groq`*[_type == "siteSettings"][0]{
  companyName,
  "logoUrl": logo.asset->url,
  "updatedAt": _updatedAt
}`

function parseAssistantJson<T>(raw: string): T {
  const cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "")
  return JSON.parse(cleaned) as T
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function getBudgetPoints(budgetRange?: string | null): number {
  const normalized = (budgetRange || "").toLowerCase()
  if (normalized.includes("5m+")) return 50
  if (normalized.includes("2m") && normalized.includes("5m")) return 30
  if (normalized.includes("1m") && normalized.includes("2m")) return 15
  if (normalized.includes("under") && normalized.includes("500")) return -30
  return 0
}

function isUnder500k(budgetRange?: string | null): boolean {
  const normalized = (budgetRange || "").toLowerCase()
  return normalized.includes("under") && normalized.includes("500")
}

function isHighEndApple(deviceTier: string): boolean {
  return deviceTier === "High-end Apple"
}

function isBudgetAtLeast2m(budgetRange?: string | null): boolean {
  const normalized = (budgetRange || "").toLowerCase()
  return normalized.includes("2m") || normalized.includes("5m+")
}

function isBudgetOver5m(budgetRange?: string | null): boolean {
  const normalized = (budgetRange || "").toLowerCase()
  return normalized.includes("5m+")
}

function getLeadClassification(params: {
  score: number
  budgetRange: string | null
  deviceTier: string
  hasHighIntent: boolean
}): "whale" | "hot" | "warm" | "cold" {
  if (
    params.score >= 90 &&
    isBudgetAtLeast2m(params.budgetRange) &&
    isHighEndApple(params.deviceTier) &&
    params.hasHighIntent
  ) {
    return "whale"
  }
  if (params.score >= 70) return "hot"
  if (params.score >= 40) return "warm"
  return "cold"
}

function computeIntentKeywordPoints(text: string): number {
  const normalized = text.toLowerCase()
  const uniqueMatches = new Set(
    HIGH_VALUE_KEYWORDS.filter((kw) => normalized.includes(kw.toLowerCase()))
  )
  return Math.min(uniqueMatches.size * 5, 20)
}

function dedupeChatHistory(
  input: Array<{ role: string; text: string }>
): Array<{ role: string; text: string }> {
  const result: Array<{ role: string; text: string }> = []
  const seen = new Set<string>()

  for (const item of input) {
    const role = item.role.trim().toLowerCase()
    const text = item.text.trim()
    if (!role || !text) continue

    const normalized = text.toLowerCase().replace(/\s+/g, " ")
    const key = `${role}:${normalized}`
    if (seen.has(key)) continue

    const previous = result[result.length - 1]
    if (previous) {
      const prevNorm = previous.text.trim().toLowerCase().replace(/\s+/g, " ")
      if (previous.role.toLowerCase() === role && prevNorm === normalized) continue
      if (role === "assistant" && previous.role.toLowerCase() === "assistant") {
        if (normalized.includes(prevNorm) || prevNorm.includes(normalized)) {
          if (text.length > previous.text.length) {
            result[result.length - 1] = { role, text }
            seen.delete(`${previous.role.toLowerCase()}:${prevNorm}`)
          }
          seen.add(key)
          continue
        }
      }
    }

    seen.add(key)
    result.push({ role, text })
  }

  return result
}

async function buildExecutiveLeadInsight(params: {
  name: string
  budgetRange: string | null
  propertyInterest: string | null
  preferredDate: string | null
  message: string
  chatHistory: Array<{ role: string; text: string }>
}): Promise<ExecutiveInsight> {
  const transcript = params.chatHistory
    .map((item) => `${item.role}: ${item.text}`)
    .join("\n")
  const prompt = [
    "Return ONLY strict JSON with keys: intent, budgetType, urgency.",
    "Each value must be one concise sentence in executive luxury tone.",
    "",
    `Lead Name: ${params.name}`,
    `Budget: ${params.budgetRange || "Not specified"}`,
    `Property Type / Interest: ${params.propertyInterest || "Not specified"}`,
    `Preferred Date: ${params.preferredDate || "Not specified"}`,
    `Message: ${params.message || "Not provided"}`,
    transcript ? `Chat:\n${transcript}` : "Chat: Not provided",
  ].join("\n")

  if (!process.env.OPENAI_API_KEY) {
    return {
      intent: params.message
        ? "New private tour request indicates active interest in exploring suitable luxury properties."
        : "Inquiry submitted with limited context and requires qualification.",
      budgetType: `${params.budgetRange || "Budget not specified"}; focused on ${params.propertyInterest || "preferred property type not specified"}.`,
      urgency: params.preferredDate
        ? `Preferred tour date set for ${params.preferredDate}; urgency should be confirmed directly.`
        : "Timeline not explicitly defined; prompt concierge follow-up is recommended.",
    }
  }

  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      temperature: 0.2,
      maxOutputTokens: 220,
      system:
        "You are an executive real-estate lead analyst. Output valid JSON only.",
      prompt,
    })
    const parsed = executiveInsightSchema.safeParse(parseAssistantJson<unknown>(text))
    if (parsed.success) return parsed.data
    return {
      intent: "Lead intent is present but requires direct confirmation of decision criteria.",
      budgetType: `${params.budgetRange || "Budget not specified"}; ${params.propertyInterest || "property preference not specified"}.`,
      urgency: params.preferredDate
        ? `Preferred date shared (${params.preferredDate}); urgency remains moderately time-sensitive.`
        : "Urgency remains unclear and should be confirmed in immediate follow-up.",
    }
  } catch {
    return {
      intent: params.message
        ? "New private tour request indicates interest in exploring properties."
        : "Intent exists but supporting detail is limited.",
      budgetType: `${params.budgetRange || "Budget unclear"}; focused on ${params.propertyInterest || "property type unclear"}.`,
      urgency: params.preferredDate
        ? `Preferred tour date set for ${params.preferredDate}; urgency unclear.`
        : "Urgency unclear; schedule immediate advisor outreach.",
    }
  }
}

async function getEmailBranding(): Promise<EmailBranding> {
  if (!hasSanityEnv) return { companyName: "Maison" }
  try {
    const data = await sanityClient
      .withConfig({ useCdn: false })
      .fetch<EmailBrandingRaw>(emailBrandingQuery, {}, { cache: "no-store" as RequestCache })
    const cacheBust = data?.updatedAt ? `?v=${encodeURIComponent(data.updatedAt)}` : ""
    return {
      companyName: data?.companyName?.trim() || "Maison",
      logoUrl: data?.logoUrl ? `${data.logoUrl}${cacheBust}` : undefined,
    }
  } catch {
    return { companyName: "Maison" }
  }
}

function getDynamicSubject(classification: ReturnType<typeof getLeadClassification>, score: number, name: string) {
  if (classification === "whale") {
    return `[URGENT 💎] Whale Client Detected (${score}): ${name}`
  }
  if (classification === "hot") {
    return `[HOT 🔥] High-Intent Lead: ${name}`
  }
  return `New Lead Inquiry: ${name}`
}

function errorResponse(
  message: string,
  status: number,
  devDetail?: string
) {
  const isDev = process.env.NODE_ENV === "development"
  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(isDev && devDetail && { detail: devDetail }),
    },
    { status }
  )
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY || !contactEmail) {
    return errorResponse(
      "Server email configuration is missing.",
      500,
      "Set RESEND_API_KEY and CONTACT_EMAIL in .env.local"
    )
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const rawBody = await request.text()
    const signatureSecret = process.env.API_SIGNATURE_SECRET
    if (!signatureSecret) {
      return errorResponse(
        "API signature configuration missing.",
        500,
        "Set API_SIGNATURE_SECRET in .env.local"
      )
    }
    const isValidSignature = verifySignedNonce(
      signatureSecret,
      request.headers.get("x-send-nonce"),
      request.headers.get("x-send-signature")
    )
    if (!isValidSignature) {
      return errorResponse("Unauthorized request signature.", 401)
    }

    let json: unknown
    try {
      json = JSON.parse(rawBody)
    } catch {
      return errorResponse("Invalid JSON body.", 400)
    }
    const parsed = leadApiSchema.safeParse(json)
    if (!parsed.success) {
      return errorResponse("Invalid lead payload.", 400, parsed.error.message)
    }

    const payload = parsed.data
    const leadId = payload.lead_id?.trim() || payload.session_id?.trim() || null
    const name =
      payload.name?.trim() ||
      `${payload.firstName?.trim() ?? ""} ${payload.lastName?.trim() ?? ""}`.trim()
    const email = payload.email.trim()
    const phone = payload.phone?.trim() || null
    const propertyInterest = payload.propertyInterest?.trim() || null
    const budgetRange = payload.budgetRange?.trim() || null
    const preferredDate = payload.preferredDate?.trim() || null
    const message = payload.message?.trim() || ""
    const behavioralProfile = payload.behavioral_profile
    const clientIntelligence = payload.client_intelligence
    const leadImageUrl = payload.lead_image_url?.trim() || null
    const imageAnalysisSummary =
      payload.image_analysis_summary?.trim() || null
    const deviceInfoLabel =
      payload.device_info?.trim() ||
      payload.deviceInfo?.label?.trim() ||
      "Unknown Device • Unknown Browser"
    const deviceTier =
      payload.device_tier ??
      (deviceInfoLabel.toLowerCase().includes("iphone") ||
      deviceInfoLabel.toLowerCase().includes("ipad") ||
      deviceInfoLabel.toLowerCase().includes("mac")
        ? "High-end Apple"
        : "Standard")
    const dedupedChatHistory = dedupeChatHistory(payload.chat_history ?? [])
    const chatTranscript = dedupedChatHistory.map((item) => `${item.role}: ${item.text}`).join("\n")
    const composedMessage = [message, chatTranscript].filter(Boolean).join("\n").trim()

    if (!name || !email || !composedMessage) {
      return errorResponse("Name, email, and message are required.", 400)
    }

    const intentScore = clamp(Math.round(payload.intentScore ?? computeIntentScore(composedMessage)), 0, 100)
    const intentKeywordPoints = computeIntentKeywordPoints(composedMessage)
    const hasHighIntent = intentKeywordPoints >= 15
    const sessionDurationSeconds = clamp(Math.round(payload.sessionDurationSeconds ?? 0), 0, 900)
    const budgetPoints = getBudgetPoints(budgetRange)
    const hardwareBonus = isHighEndApple(deviceTier) ? 10 : 0

    let globalScore = clamp(
      budgetPoints +
        hardwareBonus +
        intentKeywordPoints +
        Math.min(Math.floor(sessionDurationSeconds / 30), 10),
      0,
      100
    )
    if (isUnder500k(budgetRange)) {
      // Strict hierarchy gate: low-budget leads never exceed 40.
      globalScore = Math.min(globalScore, 40)
    }
    if (!(isBudgetOver5m(budgetRange) && isHighEndApple(deviceTier) && hasHighIntent)) {
      // Score 100 is reserved for >5M budgets on high-end Apple devices.
      globalScore = Math.min(globalScore, 99)
    }
    const classification = getLeadClassification({
      score: globalScore,
      budgetRange,
      deviceTier,
      hasHighIntent,
    })
    const subject = getDynamicSubject(classification, globalScore, name)

    const executiveLeadInsight = await buildExecutiveLeadInsight({
      name,
      budgetRange,
      propertyInterest,
      preferredDate,
      message,
      chatHistory: dedupedChatHistory,
    })

    const effectivePropertyInterest = propertyInterest || null
    const supabase = getSupabaseServerClient()
    let databaseSaveFailed = false
    let databaseWarning: string | undefined
    const encryptedEmail = encryptLeadField(email, process.env.LEAD_ENCRYPTION_KEY)
    const readableEmail = decryptLeadField(encryptedEmail, process.env.LEAD_ENCRYPTION_KEY) || email
    if (supabase) {
      const cleanedRawChatHistory = dedupedChatHistory.map((item) => ({
        role: item.role,
        text: item.text,
      }))
      const encryptedBehavioralProfile = encryptLeadField(
        behavioralProfile ? JSON.stringify(behavioralProfile) : null,
        process.env.LEAD_ENCRYPTION_KEY
      )
      const leadRow = {
        ...(leadId ? { id: leadId } : {}),
        full_name: name,
        email: encryptedEmail,
        phone: encryptLeadField(phone, process.env.LEAD_ENCRYPTION_KEY),
        message: encryptLeadField(
          `${message || "No direct message provided."}\n\n💎 Executive Lead Insight\n- Intent: ${executiveLeadInsight.intent}\n- Property/Budget: ${executiveLeadInsight.budgetType}\n- Urgency: ${executiveLeadInsight.urgency}`,
          process.env.LEAD_ENCRYPTION_KEY
        ),
        ip_location: clientIntelligence?.ipLocation || null,
        local_time: clientIntelligence?.localTime || null,
        device_info: deviceInfoLabel,
        device_tier: deviceTier,
        psychological_profile: encryptedBehavioralProfile,
        lead_image_url: leadImageUrl,
        image_analysis_summary: imageAnalysisSummary,
        property_interest: effectivePropertyInterest,
        budget_range: budgetRange,
        final_score: globalScore,
        intent_label: classification,
        session_duration: sessionDurationSeconds,
        raw_chat_history: cleanedRawChatHistory,
      }
      let dbError: { message: string } | null = null
      if (leadId) {
        const upsertAttempt = await supabase
          .from("leads")
          .upsert([leadRow], { onConflict: "id" })
        dbError = upsertAttempt.error

        if (dbError) {
          const updateAttempt = await supabase
            .from("leads")
            .update(leadRow)
            .eq("id", leadId)
            .select("id")
            .limit(1)

          if (
            !updateAttempt.error &&
            Array.isArray(updateAttempt.data) &&
            updateAttempt.data.length > 0
          ) {
            dbError = null
          } else {
            const insertAttempt = await supabase.from("leads").insert([leadRow])
            dbError = insertAttempt.error
          }
        }
      } else {
        const insertAttempt = await supabase.from("leads").insert([leadRow])
        dbError = insertAttempt.error
      }

      if (!dbError) {
        databaseSaveFailed = false
      } else {
        databaseSaveFailed = true
        databaseWarning = dbError.message
      }
    } else {
      databaseSaveFailed = true
      databaseWarning = "Supabase server client missing. Check SUPABASE_SERVICE_ROLE_KEY and SUPABASE_URL."
    }

    // Write lead to Sanity Lead Vault (in addition to Supabase/email)
    if (hasSanityEnv && process.env.SANITY_API_TOKEN) {
      try {
        const encryptionKey = process.env.LEAD_ENCRYPTION_KEY
        const userPersona =
          behavioralProfile?.style === "analytical"
            ? "analytical"
            : behavioralProfile?.style === "visionary"
              ? "aesthetic"
              : "balanced"
        await sanityWriteClient.create({
          _type: "lead",
          fullName: name,
          email: encryptedEmail ?? email,
          phone: phone ? (encryptLeadField(phone, encryptionKey) ?? phone) : undefined,
          propertyInterest: effectivePropertyInterest ?? undefined,
          budgetRange: budgetRange ?? undefined,
          message: message
            ? `${message}\n\nExecutive Insight: ${executiveLeadInsight.intent} | ${executiveLeadInsight.budgetType} | ${executiveLeadInsight.urgency}`
            : undefined,
          aiConversationSummary: dedupedChatHistory.length > 0
            ? dedupedChatHistory.map((m) => `${m.role}: ${m.text}`).join("\n\n")
            : undefined,
          aiImageAnalysis: imageAnalysisSummary ?? undefined,
          userPersona,
          psychologicalProfile: behavioralProfile
            ? (encryptLeadField(JSON.stringify(behavioralProfile), encryptionKey) ?? undefined)
            : undefined,
          deviceTier: deviceTier ?? undefined,
          deviceInfo: deviceInfoLabel ?? undefined,
          ipLocation: clientIntelligence?.ipLocation ?? undefined,
          sessionDuration: sessionDurationSeconds ?? undefined,
          referrerUrl: payload.referrer_url ?? undefined,
          intentScore: globalScore ?? undefined,
          leadClassification: classification ?? undefined,
          leadImageUrl: leadImageUrl ?? undefined,
          capturedAt: new Date().toISOString(),
        })
      } catch {
        // Sanity write is non-blocking; lead still sent via email/supabase
      }
    }

    const branding = await getEmailBranding()
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [contactEmail],
      replyTo: readableEmail,
      subject,
      react: LeadNotification({
        companyName: branding.companyName,
        logoUrl: branding.logoUrl,
        name,
        email: readableEmail,
        phone,
        propertyInterest: effectivePropertyInterest || "N/A",
        preferredArea: propertyInterest || undefined,
        budgetRange: budgetRange || "Not specified",
        executiveLeadInsight,
        databaseSaveFailed,
        databaseWarning,
        intentScore,
        sessionDurationSeconds,
        deviceTier,
        deviceInfoLabel,
        deviceQualificationPoints: hardwareBonus,
        globalScore,
        leadClassification: classification,
      }),
    })

    if (error) {
      const errMsg =
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: string }).message)
          : String(error)
      return errorResponse(
        "Failed to send email.",
        500,
        `Resend: ${errMsg}`
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err)
    return errorResponse(
      "Unexpected server error.",
      500,
      errMsg
    )
  }
}
