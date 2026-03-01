import { z } from "zod"
import { parsePhoneNumberFromString } from "libphonenumber-js"

/** Client payload sent to POST /api/send. Includes silent metrics. */
export const leadFormSchema = z.object({
  lead_id: z.string().uuid().optional(),
  session_id: z.string().optional(),
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  preferredDate: z.string().optional(),
  propertyInterest: z.string().optional(),
  budgetRange: z.string().optional(),
  message: z.string().optional(),
  // Silent metrics (optional, set by client)
  sessionDurationSeconds: z.number().min(0).optional(),
  device_tier: z.enum(["High-end Apple", "Standard"]).optional(),
  deviceInfo: z
    .object({
      tier: z.enum(["high", "mid", "low"]).optional(),
      label: z.string().optional(),
      userAgent: z.string().optional(),
      screenWidth: z.number().min(0).optional(),
      screenHeight: z.number().min(0).optional(),
      pixelRatio: z.number().min(0.1).optional(),
    })
    .optional(),
  device_info: z.string().optional(),
  user_agent: z.string().optional(),
  referrer_url: z.string().optional(),
  client_intelligence: z
    .object({
      ipLocation: z.string().optional(),
      localTime: z.string().optional(),
      timezone: z.string().optional(),
      hardwareClass: z.enum(["Apple", "Other"]).optional(),
    })
    .optional(),
  behavioral_profile: z
    .object({
      style: z.enum(["analytical", "visionary", "balanced"]).optional(),
      sentiment: z.enum(["positive", "neutral", "cautious"]).optional(),
      cadence: z.enum(["concise", "balanced", "detailed"]).optional(),
      confidence: z.number().min(0).max(1).optional(),
    })
    .optional(),
  lead_image_url: z.string().optional(),
  image_analysis_summary: z.string().optional(),
  intentScore: z.number().min(0).max(100).optional(),
}).superRefine((data, ctx) => {
  if (!data.phone || !data.phone.trim()) return
  const phone = parsePhoneNumberFromString(data.phone)
  if (!phone || !phone.isValid()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please enter a valid international phone number",
      path: ["phone"],
    })
  }
})

export type LeadFormValues = z.infer<typeof leadFormSchema>
