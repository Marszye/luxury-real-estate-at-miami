import { defineField, defineType } from "sanity"
import { UsersIcon } from "@sanity/icons"

export const lead = defineType({
  name: "lead",
  title: "Lead",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "contact", title: "Contact Info", default: true },
    { name: "intelligence", title: "AI Intelligence" },
    { name: "device", title: "Device & Behavioral" },
    { name: "scoring", title: "Scoring" },
  ],
  fields: [
    // Contact
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email (Encrypted)",
      type: "string",
      group: "contact",
      description:
        "Stored encrypted via AES-256-GCM. Raw value never persists in Sanity.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "propertyInterest",
      title: "Property Interest",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "budgetRange",
      title: "Budget Range",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      group: "contact",
      rows: 6,
    }),

    // AI Intelligence
    defineField({
      name: "aiImageAnalysis",
      title: "AI Image Analysis",
      type: "text",
      group: "intelligence",
      rows: 8,
      description:
        "AI-generated analysis from the vision model when user uploads property images in chat.",
    }),
    defineField({
      name: "aiConversationSummary",
      title: "AI Conversation Summary",
      type: "text",
      group: "intelligence",
      rows: 8,
      description:
        "Executive summary of the AI concierge conversation, including intent and key questions asked.",
    }),
    defineField({
      name: "userPersona",
      title: "User Persona",
      type: "string",
      group: "intelligence",
      options: {
        list: [
          { title: "Analytical", value: "analytical" },
          { title: "Aesthetic / Visionary", value: "aesthetic" },
          { title: "Balanced", value: "balanced" },
        ],
      },
      description:
        "Psychological profile derived from browsing behavior and chat patterns.",
    }),
    defineField({
      name: "psychologicalProfile",
      title: "Psychological Profile (Encrypted)",
      type: "string",
      group: "intelligence",
      description:
        "Encrypted JSON: behavioral style, sentiment, cadence, confidence score.",
    }),

    // Device & Behavioral
    defineField({
      name: "deviceTier",
      title: "Device Tier",
      type: "string",
      group: "device",
      options: {
        list: [
          { title: "High-end Apple", value: "High-end Apple" },
          { title: "Standard", value: "Standard" },
        ],
      },
    }),
    defineField({
      name: "deviceInfo",
      title: "Device Info",
      type: "string",
      group: "device",
      description: "e.g. iPhone 15 Pro Max, Safari 17",
    }),
    defineField({
      name: "ipLocation",
      title: "IP Location",
      type: "string",
      group: "device",
    }),
    defineField({
      name: "sessionDuration",
      title: "Session Duration (seconds)",
      type: "number",
      group: "device",
    }),
    defineField({
      name: "referrerUrl",
      title: "Referrer URL",
      type: "url",
      group: "device",
    }),

    // Scoring
    defineField({
      name: "intentScore",
      title: "Intent Score",
      type: "number",
      group: "scoring",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "leadClassification",
      title: "Lead Classification",
      type: "string",
      group: "scoring",
      options: {
        list: [
          { title: "Whale", value: "whale" },
          { title: "Hot", value: "hot" },
          { title: "Warm", value: "warm" },
          { title: "Cold", value: "cold" },
        ],
      },
    }),
    defineField({
      name: "leadImageUrl",
      title: "Lead Image URL",
      type: "url",
      group: "intelligence",
    }),

    // Timestamps
    defineField({
      name: "capturedAt",
      title: "Captured At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "leadClassification",
    },
    prepare({ title, subtitle }) {
      const badge =
        subtitle === "whale"
          ? "Whale"
          : subtitle === "hot"
            ? "Hot"
            : subtitle === "warm"
              ? "Warm"
              : "Cold"
      return {
        title: title || "Unknown Lead",
        subtitle: `${badge} Lead`,
      }
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "capturedAtDesc",
      by: [{ field: "capturedAt", direction: "desc" }],
    },
    {
      title: "Highest Score",
      name: "intentScoreDesc",
      by: [{ field: "intentScore", direction: "desc" }],
    },
  ],
})

export const leadIcon = UsersIcon
