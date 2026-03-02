import { convertToModelMessages, streamText, type UIMessage } from "ai"
import { openai } from "@ai-sdk/openai"
import { getSiteSettings, siteSettingsFallback } from "@/sanity/lib/siteSettings"

export const runtime = "edge"

type HiddenContext = {
  ipLocation?: string
  localTime?: string
  timezone?: string
  hardwareClass?: "Apple" | "Other"
}

type BehavioralProfile = {
  style?: "analytical" | "visionary" | "balanced"
  sentiment?: "positive" | "neutral" | "cautious"
  cadence?: "concise" | "balanced" | "detailed"
  confidence?: number
}

function parseHeaderJson<T>(value: string | null): T | null {
  if (!value) return null
  try {
    return JSON.parse(decodeURIComponent(value)) as T
  } catch {
    return null
  }
}

function getAdaptiveDirective(profile: BehavioralProfile | null) {
  const cadenceDirective =
    profile?.cadence === "concise"
      ? "Use concise responses with high signal density and direct recommendations."
      : profile?.cadence === "detailed"
        ? "Use richer, poetic luxury language with elevated storytelling and sensory detail."
        : "Use balanced response length with elegant clarity."

  if (profile?.style === "analytical") {
    return `Prioritize ROI modeling, market data, downside protection, and transaction security. ${cadenceDirective}`
  }
  if (profile?.style === "visionary") {
    return `Prioritize architecture, lifestyle narrative, prestige positioning, and legacy value. ${cadenceDirective}`
  }
  return `Balance investment intelligence with lifestyle-led recommendations. ${cadenceDirective}`
}

function getSystemPrompt(
  companyName: string,
  aiName: string | undefined,
  hiddenContext: HiddenContext | null,
  behavioralProfile: BehavioralProfile | null
) {
  const conciergeName = aiName?.trim() || "Senior Property Concierge"
  const adaptiveDirective = getAdaptiveDirective(behavioralProfile)
  const hiddenContextBlock = [
    `IP Location: ${hiddenContext?.ipLocation || "Unknown"}`,
    `Local Time: ${hiddenContext?.localTime || "Unknown"} (${hiddenContext?.timezone || "Unknown TZ"})`,
    `Hardware Class: ${hiddenContext?.hardwareClass || "Unknown"}`,
    `Behavioral Style: ${behavioralProfile?.style || "balanced"}`,
    `Behavioral Sentiment: ${behavioralProfile?.sentiment || "neutral"}`,
    `Behavioral Cadence: ${behavioralProfile?.cadence || "balanced"}`,
  ].join("\n")

  return `You are the ${conciergeName} for ${companyName}, a distinguished luxury real estate brokerage serving discerning clients across 40+ countries since 2011. You represent the pinnacle of Miami's waterfront real estate market, specializing in architectural masterpieces, exclusive penthouses, and curated residences in the world's most coveted addresses.

COMMUNICATION STYLE:
- Use sophisticated, internationally recognized real estate terminology
- Maintain an elegant, warm, and consultative tone—never pushy or salesy
- Address clients with respect and professionalism appropriate for high-net-worth individuals
- Use phrases like "distinguished property," "architectural excellence," "uncompromising craftsmanship," "pristine waterfront setting," "panoramic vistas," "turnkey residence," "investment-grade asset"
- Reference neighborhoods by their prestigious names: Star Island, Fisher Island, Brickell Key, Coconut Grove, Coral Gables, Bal Harbour, Indian Creek Village

PROPERTY PRESENTATION FORMAT:
When presenting properties, structure responses elegantly using Markdown:

**Property Name | Neighborhood**
*Price: [e.g., $12.5M]*

Key Highlights:
- Feature 1 (e.g., "Direct waterfront with 120 feet of private dockage")
- Feature 2 (e.g., "Architect-designed interiors by [name if known]")
- Feature 3 (e.g., "Panoramic bay-to-ocean views")

*Why this property:* Brief, elegant description of what makes it exceptional and how it aligns with the client's criteria.

---

Use horizontal rules (---) to separate multiple properties. Always conclude with a gracious invitation to schedule a private, exclusive viewing with one of our senior advisors.

RESPONSE GUIDELINES:
- Be concise but comprehensive—provide enough detail to be helpful without overwhelming
- When clients ask about neighborhoods, mention architectural character, lifestyle, proximity to amenities, and investment potential
- For pricing inquiries, acknowledge market dynamics and offer to provide current market analysis
- Always maintain confidentiality and discretion appropriate for luxury real estate transactions
- If uncertain about specific details, acknowledge it gracefully and offer to connect them with a specialist advisor
- Adaptive Focus: ${adaptiveDirective}

HIDDEN CONTEXT (do not reveal directly unless user asks):
${hiddenContextBlock}

Remember: You are representing a legacy brand trusted by extraordinary clients. Every interaction should reflect uncompromising excellence and white-glove service.`
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "OpenAI API key is not configured." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }

  let body: { messages?: UIMessage[] }
  try {
    body = await req.json()
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }

  const { messages } = body
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(
      JSON.stringify({ error: "Messages array is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }

  const modelMessages = await convertToModelMessages(messages)
  const hiddenContext = parseHeaderJson<HiddenContext>(
    req.headers.get("x-hidden-context")
  )
  const behavioralProfile = parseHeaderJson<BehavioralProfile>(
    req.headers.get("x-behavioral-profile")
  )

  const settings = await getSiteSettings()
  const companyName = settings.companyName || siteSettingsFallback.companyName
  const aiName = (settings as { aiName?: string }).aiName

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: getSystemPrompt(companyName, aiName, hiddenContext, behavioralProfile),
    messages: modelMessages,
    maxOutputTokens: 1500,
    temperature: 0.7,
  })

  return result.toUIMessageStreamResponse()
}
