"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const AIConcierge = dynamic(
  () => import("@/components/ai-concierge").then((mod) => mod.AIConcierge),
  { ssr: false }
)

export function AIConciergeLazy() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const kickoff = () => setEnabled(true)
    const ric = globalThis.requestIdleCallback

    if (typeof ric === "function") {
      const id = ric(kickoff, { timeout: 2500 })
      return () => {
        globalThis.cancelIdleCallback?.(id)
      }
    }

    const timeout = globalThis.setTimeout(kickoff, 1200)
    return () => globalThis.clearTimeout(timeout)
  }, [])

  return enabled ? <AIConcierge /> : null
}
