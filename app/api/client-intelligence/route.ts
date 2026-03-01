import { NextResponse } from "next/server"

function parseForwardedIp(value: string | null): string | null {
  if (!value) return null
  const first = value.split(",")[0]?.trim()
  return first || null
}

export async function GET(request: Request) {
  const ip =
    parseForwardedIp(request.headers.get("x-forwarded-for")) ||
    request.headers.get("x-real-ip") ||
    null

  if (!ip) {
    return NextResponse.json({ location: "Unknown location" }, { status: 200 })
  }

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 1200)
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: controller.signal,
      cache: "no-store",
    })
    clearTimeout(timer)
    if (!res.ok) {
      return NextResponse.json({ location: "Unknown location" }, { status: 200 })
    }
    const data = (await res.json()) as {
      city?: string
      region?: string
      country_name?: string
    }
    const location = [data.city, data.region, data.country_name]
      .filter(Boolean)
      .join(", ")
    return NextResponse.json(
      { location: location || "Unknown location" },
      { status: 200 }
    )
  } catch {
    return NextResponse.json({ location: "Unknown location" }, { status: 200 })
  }
}

