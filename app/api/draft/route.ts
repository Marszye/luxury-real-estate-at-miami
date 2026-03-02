/**
 * Sanity Draft Mode — activate draft preview from Studio
 * Enables viewing unpublished content in the frontend.
 *
 * Configure in Sanity: Project → API → CORS
 * Add your frontend URL. For production: https://your-domain.com
 *
 * In Sanity Studio, use "Open preview" with:
 * https://your-domain.com/api/draft?secret=DRAFT_SECRET&slug=/properties/my-property
 */

import { draftMode } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const DRAFT_SECRET = process.env.DRAFT_SECRET

export async function GET(request: NextRequest) {
  if (!DRAFT_SECRET) {
    return NextResponse.json(
      { error: "Draft mode not configured" },
      { status: 500 },
    )
  }

  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const slug = searchParams.get("slug") || "/"

  if (secret !== DRAFT_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  return NextResponse.redirect(new URL(slug, request.url))
}
