import { NextResponse } from "next/server"
import { z } from "zod"
import { getSupabaseServerClient } from "@/lib/supabase"
import { verifySignedNonce } from "@/lib/security"

const bodySchema = z.object({
  imageDataUrl: z.string().min(32),
  fileName: z.string().optional(),
  leadId: z.string().uuid().optional(),
  sessionId: z.string().uuid().optional(),
})

async function syncVisionAnalysisToLead(params: {
  leadId: string
  leadImageUrl: string
  imageAnalysisSummary: string
}): Promise<{ synced: boolean; warning?: string }> {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return {
      synced: false,
      warning:
        "Supabase server client missing. Check SUPABASE_SERVICE_ROLE_KEY and SUPABASE_URL.",
    }
  }

  const preLeadEmail = `prelead+${params.leadId}@placeholder.local`
  const leadPatch = {
    id: params.leadId,
    full_name: "Pre-Lead Visitor",
    email: preLeadEmail,
    lead_image_url: params.leadImageUrl,
    image_analysis_summary: params.imageAnalysisSummary,
  }

  const { error: upsertError } = await supabase
    .from("leads")
    .upsert([leadPatch], { onConflict: "id" })
  if (!upsertError) return { synced: true }

  // Fallback for environments with stricter constraints.
  const { data: updatedRows, error: updateError } = await supabase
    .from("leads")
    .update({
      lead_image_url: params.leadImageUrl,
      image_analysis_summary: params.imageAnalysisSummary,
    })
    .eq("id", params.leadId)
    .select("id")
    .limit(1)

  if (!updateError && Array.isArray(updatedRows) && updatedRows.length > 0) {
    return { synced: true }
  }

  const { error: insertError } = await supabase.from("leads").insert([leadPatch])
  if (!insertError) return { synced: true }

  return {
    synced: false,
    warning: insertError.message || upsertError.message || "Lead sync failed.",
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: "OpenAI API key is not configured." },
      { status: 500 }
    )
  }

  let payload: z.infer<typeof bodySchema>
  try {
    payload = bodySchema.parse(await request.json())
  } catch {
    return NextResponse.json({ error: "Invalid vision payload." }, { status: 400 })
  }

  const signatureSecret = process.env.API_SIGNATURE_SECRET
  if (!signatureSecret) {
    return NextResponse.json(
      { error: "API_SIGNATURE_SECRET is not configured." },
      { status: 500 }
    )
  }
  const isValidSignature = verifySignedNonce(
    signatureSecret,
    request.headers.get("x-send-nonce"),
    request.headers.get("x-send-signature")
  )
  if (!isValidSignature) {
    return NextResponse.json({ error: "Unauthorized request signature." }, { status: 401 })
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: "Analyze this luxury property inspiration image. Return concise JSON with keys: style, materials, vibe, locationSuggestion, summary. Summary must be one polished sentence.",
              },
              {
                type: "input_image",
                image_url: payload.imageDataUrl,
              },
            ],
          },
        ],
        text: { format: { type: "json_object" } },
      }),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "Vision analysis failed." },
        { status: 500 }
      )
    }

    const data = (await response.json()) as {
      output_text?: string
    }

    let parsed: {
      style?: string
      materials?: string
      vibe?: string
      locationSuggestion?: string
      summary?: string
    } = {}
    try {
      parsed = JSON.parse(data.output_text || "{}")
    } catch {
      parsed = { summary: "Elegant luxury residential cues detected." }
    }

    const style = parsed.style || "Contemporary Luxury"
    const materials = parsed.materials || "Natural stone, warm woods, premium metal accents"
    const vibe = parsed.vibe || "Refined, tranquil, and prestige-forward"
    const locationSuggestion = parsed.locationSuggestion || "Miami Beach"
    const analysisSummary =
      parsed.summary ||
      `Style: ${style}. Materials: ${materials}. Vibe: ${vibe}.`

    const conciergeMessage = `I see you appreciate ${style} aesthetics and ${vibe.toLowerCase()} environments. This perfectly aligns with exclusive opportunities we curate in ${locationSuggestion}.`
    const effectiveLeadId = payload.leadId ?? payload.sessionId
    let syncResult: { synced: boolean; warning?: string } | undefined
    if (effectiveLeadId) {
      syncResult = await syncVisionAnalysisToLead({
        leadId: effectiveLeadId,
        leadImageUrl: payload.imageDataUrl,
        imageAnalysisSummary: analysisSummary,
      })
    }

    return NextResponse.json(
      {
        analysisSummary,
        conciergeMessage,
        style,
        materials,
        vibe,
        locationSuggestion,
        imageUrl: payload.imageDataUrl,
        fileName: payload.fileName || "upload",
        leadId: effectiveLeadId || null,
        leadSync: syncResult || { synced: false },
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: "Unexpected vision processing error." },
      { status: 500 }
    )
  }
}

