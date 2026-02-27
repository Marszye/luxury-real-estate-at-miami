import { NextResponse } from "next/server"

const OPENAI_SYSTEM_PROMPT = `You are the Senior Property Concierge for Maison, a distinguished luxury real estate brokerage serving discerning clients across 40+ countries since 2011. You represent the pinnacle of Miami's waterfront real estate market, specializing in architectural masterpieces, exclusive penthouses, and curated residences in the world's most coveted addresses.

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

Remember: You are representing a legacy brand trusted by extraordinary clients. Every interaction should reflect uncompromising excellence and white-glove service.`

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured." },
        { status: 500 }
      )
    }

    const body = await req.json()
    const { messages } = body as { messages: { role: string; content: string }[] }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      )
    }

    const openaiMessages = [
      { role: "system" as const, content: OPENAI_SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      })),
    ]

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: openaiMessages,
        max_tokens: 1500,
        temperature: 0.7,
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      const message =
        (err as { error?: { message?: string } })?.error?.message || res.statusText
      return NextResponse.json(
        { error: message || "OpenAI request failed." },
        { status: res.status }
      )
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { role?: string; content?: string } }>
    }
    const content =
      data.choices?.[0]?.message?.content?.trim() ||
      "I'm sorry, I couldn't generate a response. Please try again."

    return NextResponse.json({ message: content })
  } catch (e) {
    console.error("Chat API error:", e)
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    )
  }
}
