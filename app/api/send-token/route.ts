import { NextResponse } from "next/server"
import { createSignedNonce } from "@/lib/security"

export async function GET() {
  const secret = process.env.API_SIGNATURE_SECRET
  if (!secret) {
    return NextResponse.json(
      { error: "API_SIGNATURE_SECRET is not configured." },
      { status: 500 }
    )
  }

  const token = createSignedNonce(secret)
  return NextResponse.json(token, {
    status: 200,
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
  })
}

