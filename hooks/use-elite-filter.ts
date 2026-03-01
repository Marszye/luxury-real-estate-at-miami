"use client"

import { useState, useEffect, useMemo } from "react"

export type PsychProfile = "analytical" | "aesthetic"
export type DeviceTier = "elite-apple" | "apple" | "standard"

interface EliteFilterState {
  profile: PsychProfile
  deviceTier: DeviceTier
  isEliteApple: boolean
  isApple: boolean
  contentVariant: "investment" | "lifestyle" | "balanced"
}

function detectDeviceTier(): DeviceTier {
  if (typeof navigator === "undefined") return "standard"
  const ua = navigator.userAgent.toLowerCase()
  const isApple =
    ua.includes("macintosh") ||
    ua.includes("iphone") ||
    ua.includes("ipad")

  if (!isApple) return "standard"

  const isHighEnd =
    (ua.includes("iphone") && /iphone\s*(1[4-9]|[2-9]\d)/i.test(navigator.userAgent)) ||
    (ua.includes("ipad") && ua.includes("mac os")) ||
    (ua.includes("macintosh") && (
      window.devicePixelRatio >= 2 ||
      navigator.hardwareConcurrency >= 8
    ))

  return isHighEnd ? "elite-apple" : "apple"
}

function inferProfile(): PsychProfile {
  if (typeof window === "undefined") return "balanced" as PsychProfile

  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) return "analytical"
  if (hour >= 18 && hour < 23) return "aesthetic"

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
  if (prefersReducedMotion) return "analytical"

  return "aesthetic"
}

export function useEliteFilter(): EliteFilterState {
  const [deviceTier, setDeviceTier] = useState<DeviceTier>("standard")
  const [profile, setProfile] = useState<PsychProfile>("aesthetic")

  useEffect(() => {
    setDeviceTier(detectDeviceTier())
    setProfile(inferProfile())
  }, [])

  const state = useMemo<EliteFilterState>(() => {
    const isEliteApple = deviceTier === "elite-apple"
    const isApple = deviceTier !== "standard"

    let contentVariant: "investment" | "lifestyle" | "balanced"
    if (profile === "analytical") {
      contentVariant = isEliteApple ? "investment" : "balanced"
    } else {
      contentVariant = isEliteApple ? "lifestyle" : "balanced"
    }

    return { profile, deviceTier, isEliteApple, isApple, contentVariant }
  }, [profile, deviceTier])

  return state
}

export const eliteContent = {
  roiHeadline: {
    investment:
      "Capital Preservation Meets Asymmetric Upside. Miami's waterfront corridor is delivering 14.2% annualized returns, outpacing every traditional asset class in the current macro environment.",
    lifestyle:
      "Where Vision Becomes Address. The finest residences are not merely purchased. They are recognized, claimed, and curated into a portfolio that speaks before you enter a room.",
    balanced:
      "Strategic Acquisitions in America's Most Dynamic Market. Our portfolio approach combines rigorous market analysis with an uncompromising eye for architectural distinction.",
  },
  migrationCta: {
    investment: "Download Full Migration Capital Flow Report",
    lifestyle: "Explore Where the World's Elite Are Relocating",
    balanced: "View Miami Migration & Investment Overview",
  },
  lifestyleLabel: {
    investment: "Asset Performance Index",
    lifestyle: "Lifestyle Elevation Index",
    balanced: "Luxury Market Index",
  },
} as const
