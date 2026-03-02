import { NextResponse } from "next/server"
import { z } from "zod"
import { sanityWriteClient } from "@/lib/sanity.client"
import { hasSanityEnv } from "@/sanity/env"
import { encryptLeadField, verifySignedNonce } from "@/lib/security"

const createLeadSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  propertyInterest: z.string().optional(),
  budgetRange: z.string().optional(),
  message: z.string().optional(),

  aiImageAnalysis: z.string().optional(),
  aiConversationSummary: z.string().optional(),
  userPersona: z.enum(["analytical", "aesthetic", "balanced"]).optional(),
  psychologicalProfile: z
    .object({
      style: z.enum(["analytical", "visionary", "balanced"]).optional(),
      sentiment: z.enum(["positive", "neutral", "cautious"]).optional(),
      cadence: z.enum(["concise", "balanced", "detailed"]).optional(),
      confidence: z.number().min(0).max(1).optional(),
    })
    .optional(),

  deviceTier: z.enum(["High-end Apple", "Standard"]).optional(),
  deviceInfo: z.string().optional(),
  ipLocation: z.string().optional(),
  sessionDuration: z.number().min(0).optional(),
  referrerUrl: z.string().optional(),

  intentScore: z.number().min(0).max(100).optional(),
  leadClassification: z.enum(["whale", "hot", "warm", "cold"]).optional(),
  leadImageUrl: z.string().optional(),
})

function errorResponse(message: string, status: number, detail?: string) {
  const isDev = process.env.NODE_ENV === "development"
  return NextResponse.json(
    { success: false, error: message, ...(isDev && detail ? { detail } : {}) },
    { status },
  )
}

export async function POST(request: Request) {
  if (!hasSanityEnv) {
    return errorResponse(
      "Sanity is not configured.",
      500,
      "Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET",
    )
  }

  if (!process.env.SANITY_API_TOKEN) {
    return errorResponse(
      "Server write token missing.",
      500,
      "Set SANITY_API_TOKEN with write access in .env.local",
    )
  }

  const signatureSecret = process.env.API_SIGNATURE_SECRET
  if (!signatureSecret) {
    return errorResponse(
      "API signature configuration missing.",
      500,
      "Set API_SIGNATURE_SECRET in .env.local",
    )
  }

  const isValidSignature = verifySignedNonce(
    signatureSecret,
    request.headers.get("x-send-nonce"),
    request.headers.get("x-send-signature"),
  )
  if (!isValidSignature) {
    return errorResponse("Unauthorized request signature.", 401)
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return errorResponse("Invalid JSON body.", 400)
  }

  const parsed = createLeadSchema.safeParse(json)
  if (!parsed.success) {
    return errorResponse(
      "Invalid lead payload.",
      400,
      parsed.error.message,
    )
  }

  const data = parsed.data
  const encryptionKey = process.env.LEAD_ENCRYPTION_KEY

  try {
    const doc = {
      _type: "lead" as const,
      fullName: data.fullName,
      email: encryptLeadField(data.email, encryptionKey) ?? data.email,
      phone: data.phone
        ? (encryptLeadField(data.phone, encryptionKey) ?? data.phone)
        : undefined,
      propertyInterest: data.propertyInterest || undefined,
      budgetRange: data.budgetRange || undefined,
      message: data.message || undefined,
      aiImageAnalysis: data.aiImageAnalysis || undefined,
      aiConversationSummary: data.aiConversationSummary || undefined,
      userPersona: data.userPersona || undefined,
      psychologicalProfile: data.psychologicalProfile
        ? (encryptLeadField(
            JSON.stringify(data.psychologicalProfile),
            encryptionKey,
          ) ?? undefined)
        : undefined,
      deviceTier: data.deviceTier || undefined,
      deviceInfo: data.deviceInfo || undefined,
      ipLocation: data.ipLocation || undefined,
      sessionDuration: data.sessionDuration ?? undefined,
      referrerUrl: data.referrerUrl || undefined,
      intentScore: data.intentScore ?? undefined,
      leadClassification: data.leadClassification || undefined,
      leadImageUrl: data.leadImageUrl || undefined,
      capturedAt: new Date().toISOString(),
    }

    const result = await sanityWriteClient.create(doc)

    return NextResponse.json(
      { success: true, id: result._id },
      { status: 201 },
    )
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err)
    return errorResponse("Failed to create lead in Sanity.", 500, errMsg)
  }
}
