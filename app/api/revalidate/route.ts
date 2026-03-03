/**
 * Sanity Webhook → Vercel Revalidation
 * When a property or content is updated in Sanity Studio, this webhook
 * triggers revalidation so the site updates instantly without redeployment.
 *
 * Configure in Sanity: Project → API → Webhooks
 * URL: https://your-domain.com/api/revalidate
 * Secret: REVALIDATION_SECRET (must match env)
 */

import { revalidatePath, revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET
const REVALIDATE_TAG = "sanity"

// Ensure this route is never statically optimized at build time
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  if (!REVALIDATION_SECRET) {
    console.error("[revalidate] REVALIDATION_SECRET not configured")
    return NextResponse.json(
      { error: "Revalidation not configured" },
      { status: 500 },
    )
  }

  const authHeader = request.headers.get("authorization")
  const secret = authHeader?.replace(/^Bearer\s+/i, "").trim()
  if (secret !== REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const _type = body?._type as string | undefined
    const slug = body?.slug?.current as string | undefined

    // Next.js 16+ requires second arg: { expire: 0 } for webhooks (immediate expiration)
    revalidateTag(REVALIDATE_TAG, { expire: 0 })

    // Path-specific revalidation for instant updates
    revalidatePath("/")
    revalidatePath("/collection")
    revalidatePath("/market-intelligence")
    revalidatePath("/blog")
    revalidatePath("/neighborhoods")
    revalidatePath("/services")

    if (_type === "property" && slug) {
      revalidatePath(`/properties/${slug}`)
      revalidatePath("/properties/ultra-luxury-showcase")
    }
    if (_type === "marketInsight" && slug) {
      revalidatePath(`/blog/${slug}`)
    }
    if (_type === "siteSettings") {
      revalidatePath("/")
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      paths: ["/", "/collection", "/market-intelligence", "/blog", "/neighborhoods", "/services"],
    })
  } catch (err) {
    console.error("[revalidate] Error:", err)
    return NextResponse.json(
      { error: "Revalidation failed" },
      { status: 500 },
    )
  }
}
