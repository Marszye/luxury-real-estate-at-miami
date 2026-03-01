/**
 * Lead scoring & classification constants. Shared between frontend (intent score)
 * and backend (global score = intentScore + sessionDuration + deviceTier).
 */

/** High-value keywords: each match contributes to intentScore (0–100) */
export const HIGH_VALUE_KEYWORDS = [
  "cash",
  "investment",
  "immediate",
  "penthouse",
  "luxury",
  "waterfront",
  "exclusive",
  "ready",
  "budget",
  "viewing",
  "tour",
  "purchase",
  "buy",
  "mansion",
  "estate",
  "fisher island",
  "star island",
  "brickell",
  "coral gables",
  "high-end",
  "premium",
  "ultra",
  "investment-grade",
] as const

export type LeadClassification = "whale" | "hot" | "warm" | "cold"
export type BudgetBand = "5m_plus" | "2m_to_5m" | "under_500k" | "other"

export interface LeadClassificationConfig {
  label: string
  emoji: string
  subjectPrefix: string
  minScore: number
  maxScore: number
}

/** Score > 90: Whale. 70-89: Hot. 40-69: Warm. < 40: Cold */
export const LEAD_CLASSIFICATION: Record<LeadClassification, LeadClassificationConfig> = {
  whale: {
    label: "Whale",
    emoji: "💎",
    subjectPrefix: "[URGENT 💎] Whale Client Detected",
    minScore: 91,
    maxScore: 100,
  },
  hot: {
    label: "Hot",
    emoji: "🔥",
    subjectPrefix: "[HOT 🔥] High-Intent Lead",
    minScore: 70,
    maxScore: 89,
  },
  warm: {
    label: "Warm",
    emoji: "⚡",
    subjectPrefix: "[WARM] New Inquiry from",
    minScore: 40,
    maxScore: 69,
  },
  cold: {
    label: "Cold",
    emoji: "❄️",
    subjectPrefix: "New Lead",
    minScore: 0,
    maxScore: 34,
  },
}

export function getLeadClassification(score: number): LeadClassification {
  if (score >= LEAD_CLASSIFICATION.whale.minScore) return "whale"
  if (score >= LEAD_CLASSIFICATION.hot.minScore) return "hot"
  if (score >= LEAD_CLASSIFICATION.warm.minScore) return "warm"
  return "cold"
}

export function getEmailSubject(classification: LeadClassification, name: string): string {
  const config = LEAD_CLASSIFICATION[classification]
  if (classification === "whale") return `${config.subjectPrefix} ${name}`
  if (classification === "hot") return `${config.subjectPrefix}: ${name}`
  if (classification === "warm") return `${config.subjectPrefix} ${name}`
  return `${config.subjectPrefix}: ${name}`
}

/** Device tier points: High-end = 15, Mid-end = 8, Low = 0 */
export const DEVICE_TIER_POINTS = {
  high: 15,
  mid: 8,
  low: 0,
} as const

export type DeviceTier = keyof typeof DEVICE_TIER_POINTS

export const BUDGET_PRIORITY_POINTS: Record<BudgetBand, number> = {
  "5m_plus": 60,
  "2m_to_5m": 40,
  "under_500k": -20,
  other: 0,
}

export function getBudgetBand(input?: string | null): BudgetBand {
  const normalized = (input || "").toLowerCase()
  if (!normalized) return "other"
  if (normalized.includes("under") && normalized.includes("500")) return "under_500k"
  if (normalized.includes("5m+") || normalized.includes("5m++")) return "5m_plus"
  if (normalized.includes("2m") && normalized.includes("5m")) return "2m_to_5m"
  return "other"
}

/** Compute 0–100 intent score from message text (keyword density). */
export function computeIntentScore(text: string): number {
  if (!text || typeof text !== "string") return 0
  const normalized = text.toLowerCase().trim()
  const matches = HIGH_VALUE_KEYWORDS.filter((kw) => normalized.includes(kw)).length
  const raw = Math.min(matches * 8, 100)
  return Math.round(raw)
}
