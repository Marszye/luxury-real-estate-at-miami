"use client"

import { useEffect, useMemo, useState } from "react"
import type { ClientIntelligence } from "@/src/context/lead-context"

function detectHardwareClass(userAgent: string): "Apple" | "Other" {
  const ua = userAgent.toLowerCase()
  return ua.includes("iphone") || ua.includes("ipad") || ua.includes("macintosh")
    ? "Apple"
    : "Other"
}

export function useClientIntelligence() {
  const [location, setLocation] = useState<string>("Unknown location")

  const localTime = useMemo(() => new Date().toLocaleString(), [])
  const timezone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    []
  )
  const hardwareClass = useMemo(
    () =>
      typeof navigator === "undefined"
        ? ("Other" as const)
        : detectHardwareClass(navigator.userAgent),
    []
  )

  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 1400)

    fetch("/api/client-intelligence", {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.location) setLocation(String(data.location))
      })
      .catch(() => {
        // Silently degrade; hidden context is optional.
      })
      .finally(() => clearTimeout(timer))

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [])

  const intelligence = useMemo<ClientIntelligence>(
    () => ({
      ipLocation: location,
      localTime,
      timezone,
      hardwareClass,
    }),
    [location, localTime, timezone, hardwareClass]
  )

  return intelligence
}

