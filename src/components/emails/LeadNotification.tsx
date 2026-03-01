import * as React from "react"
import { LEAD_CLASSIFICATION, type LeadClassification } from "@/lib/lead-constants"

export interface LeadNotificationProps {
  companyName: string
  logoUrl?: string
  name: string
  email: string
  phone?: string | null
  propertyInterest: string
  budgetRange: string
  preferredArea?: string
  executiveLeadInsight: {
    intent: string
    budgetType: string
    urgency: string
  }
  databaseSaveFailed?: boolean
  databaseWarning?: string
  intentScore: number
  sessionDurationSeconds: number
  deviceTier: "High-end Apple" | "Standard"
  deviceInfoLabel: string
  deviceQualificationPoints: number
  globalScore: number
  leadClassification: LeadClassification
}

const palette = {
  black: "#000000",
  white: "#ffffff",
  gold: "#D4AF37",
  goldDark: "#B8962E",
  gray: "#6B6B6B",
  grayLight: "#F5F5F5",
  border: "#E5E5E5",
  cream: "#FAF7F2",
} as const

export function LeadNotification({
  companyName,
  logoUrl,
  name,
  email,
  phone,
  propertyInterest,
  budgetRange,
  preferredArea,
  executiveLeadInsight,
  databaseSaveFailed,
  databaseWarning,
  intentScore,
  sessionDurationSeconds,
  deviceTier,
  deviceInfoLabel,
  deviceQualificationPoints,
  globalScore,
  leadClassification,
}: LeadNotificationProps) {
  const config = LEAD_CLASSIFICATION[leadClassification]
  const firstName = name.split(" ")[0] || name
  const ownerReplySubject = `${companyName} | Private Portfolio for ${firstName}`
  const ownerReplyBody = [
    `Dear ${firstName},`,
    "",
    `I have personally reviewed your inquiry for ${propertyInterest}. Based on your ${budgetRange} investment profile, I have selected a confidential set of exclusive and off-market opportunities aligned with your acquisition goals.`,
    "",
    "If convenient, kindly share your preferred viewing window and any non-negotiable criteria. I will curate a precise shortlist and arrange a discreet private tour itinerary.",
    "",
    `Warm regards,`,
    `Senior Advisor | ${companyName}`,
  ].join("\n")
  const mailto = `mailto:${email}?subject=${encodeURIComponent(ownerReplySubject)}&body=${encodeURIComponent(ownerReplyBody)}`
  const whatsappText = [
    `Dear ${firstName},`,
    `I have reviewed your inquiry for ${propertyInterest}. Based on your ${budgetRange} investment profile, I prepared a private shortlist of exclusive opportunities.`,
    `Share your preferred viewing schedule and I will coordinate a discreet concierge-level tour.`,
    `- Senior Advisor, ${companyName}`,
  ].join(" ")
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
        backgroundColor: palette.grayLight,
        padding: "40px 16px",
        margin: 0,
      }}
    >
      <table
        role="presentation"
        cellPadding={0}
        cellSpacing={0}
        style={{
          maxWidth: 580,
          margin: "0 auto",
          backgroundColor: palette.white,
          overflow: "hidden",
          border: `1px solid ${palette.border}`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <thead>
          <tr>
            <td
              style={{
                backgroundColor: palette.black,
                padding: "32px 40px",
                textAlign: "center",
                borderBottom: `3px solid ${palette.gold}`,
              }}
            >
              <table role="presentation" cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={`${companyName} logo`}
                        width={64}
                        height={64}
                        style={{
                          display: "inline-block",
                          width: 64,
                          height: 64,
                          objectFit: "cover",
                          border: `1px solid ${palette.gold}`,
                          marginBottom: 12,
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <h1
                      style={{
                        margin: 0,
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: palette.white,
                      }}
                    >
                      Priority Lead Notification
                    </h1>
                    <p
                      style={{
                        margin: "6px 0 0",
                        fontSize: 10,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      {companyName}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{ padding: "0 40px" }}>
              <div
                style={{
                  marginTop: 24,
                  display: "inline-block",
                  backgroundColor: leadClassification === "whale" ? palette.black : palette.grayLight,
                  color: leadClassification === "whale" ? palette.gold : palette.black,
                  border: `1px solid ${leadClassification === "whale" ? palette.gold : palette.border}`,
                  padding: "8px 20px",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {config.label} {config.emoji}
              </div>
            </td>
          </tr>

          {databaseSaveFailed && (
            <tr>
              <td
                style={{
                  padding: "12px 40px",
                  backgroundColor: "#fef3c7",
                  color: "#92400e",
                  fontSize: 12,
                  fontWeight: 600,
                  borderBottom: `1px solid ${palette.border}`,
                }}
              >
                ⚠️ Sync Warning: Database save failed — please manually record this lead.
                {databaseWarning ? ` (${databaseWarning})` : ""}
              </td>
            </tr>
          )}

          {/* Lead Details */}
          <tr>
            <td style={{ padding: "28px 40px 20px" }}>
              <h2
                style={{
                  margin: "0 0 16px",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: palette.gold,
                }}
              >
                Lead Details
              </h2>
              <table
                role="presentation"
                cellPadding={0}
                cellSpacing={0}
                style={{ width: "100%", fontSize: 14, color: palette.black }}
              >
                <tbody>
                  <tr>
                    <td style={{ padding: "10px 0", width: 140, color: palette.gray, fontWeight: 500, verticalAlign: "top" }}>
                      Name
                    </td>
                    <td style={{ padding: "10px 0", fontWeight: 600 }}>{name}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px 0", color: palette.gray, fontWeight: 500, verticalAlign: "top" }}>
                      Email
                    </td>
                    <td style={{ padding: "10px 0" }}>
                      <a href={mailto} style={{ color: palette.goldDark, textDecoration: "none", fontWeight: 500 }}>
                        {email}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px 0", color: palette.gray, fontWeight: 500, verticalAlign: "top" }}>
                      Phone
                    </td>
                    <td style={{ padding: "10px 0" }}>
                      {phone ? (
                        <a href={`tel:${phone}`} style={{ color: palette.black, textDecoration: "none" }}>
                          {phone}
                        </a>
                      ) : "—"}
                    </td>
                  </tr>
                  {preferredArea && (
                    <tr>
                      <td style={{ padding: "10px 0", color: palette.gray, fontWeight: 500, verticalAlign: "top" }}>
                        Area of Interest
                      </td>
                      <td style={{ padding: "10px 0", fontWeight: 600, color: palette.goldDark }}>
                        {preferredArea}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td style={{ padding: "10px 0", color: palette.gray, fontWeight: 500, verticalAlign: "top" }}>
                      Property Interest
                    </td>
                    <td style={{ padding: "10px 0" }}>{propertyInterest}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Lead Intelligence */}
          <tr>
            <td style={{ padding: "0 40px 24px", borderTop: `1px solid ${palette.border}` }}>
              <h2
                style={{
                  margin: "20px 0 16px",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: palette.gold,
                }}
              >
                Lead Intelligence
              </h2>

              <table role="presentation" cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "50%", verticalAlign: "top" }}>
                      <div
                        style={{
                          backgroundColor: palette.black,
                          color: palette.gold,
                          padding: "16px 24px",
                          display: "inline-block",
                        }}
                      >
                        <div style={{ fontSize: 28, fontWeight: 300, lineHeight: 1 }}>
                          {globalScore}
                          <span style={{ fontSize: 14, opacity: 0.6 }}>/100</span>
                        </div>
                        <div
                          style={{
                            fontSize: 9,
                            fontWeight: 600,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            marginTop: 6,
                            opacity: 0.8,
                          }}
                        >
                          Quality Score
                        </div>
                      </div>
                    </td>
                    <td style={{ width: "50%", verticalAlign: "top", paddingLeft: 16 }}>
                      <div style={{ fontSize: 12, color: palette.gray, lineHeight: 1.8 }}>
                        <div>
                          <strong style={{ color: palette.black }}>Tier:</strong>{" "}
                          {config.label} {config.emoji}
                        </div>
                        <div>
                          <strong style={{ color: palette.black }}>Priority:</strong>{" "}
                          {leadClassification === "whale"
                            ? "Immediate"
                            : leadClassification === "hot"
                              ? "Very High"
                              : leadClassification === "warm"
                                ? "Standard"
                                : "Low"}
                        </div>
                        <div>
                          <strong style={{ color: palette.black }}>Device Tier:</strong>{" "}
                          {deviceTier}
                        </div>
                        <div>
                          <strong style={{ color: palette.black }}>Device Profile:</strong>{" "}
                          {deviceInfoLabel}
                        </div>
                        <div>
                          <strong style={{ color: palette.black }}>Device Qualification:</strong>{" "}
                          {deviceQualificationPoints > 0 ? `+${deviceQualificationPoints}` : deviceQualificationPoints}
                        </div>
                        <div>
                          <strong style={{ color: palette.black }}>Intent:</strong>{" "}
                          {intentScore}/100
                        </div>
                        <div>
                          <strong style={{ color: palette.black }}>Session:</strong>{" "}
                          {sessionDurationSeconds}s
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Executive Insight */}
          <tr>
            <td style={{ padding: "0 40px 28px", borderTop: `1px solid ${palette.border}` }}>
              <h2
                style={{
                  margin: "20px 0 12px",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: palette.gold,
                }}
              >
                💎 Executive Lead Insight
              </h2>
              <div
                style={{
                  padding: 20,
                  backgroundColor: palette.grayLight,
                  border: `1px solid ${palette.border}`,
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: palette.black,
                }}
              >
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li style={{ marginBottom: 8 }}>
                    <strong>Intent:</strong> {executiveLeadInsight.intent}
                  </li>
                  <li style={{ marginBottom: 8 }}>
                    <strong>Budget/Type:</strong> {executiveLeadInsight.budgetType}
                  </li>
                  <li>
                    <strong>Urgency:</strong> {executiveLeadInsight.urgency}
                  </li>
                </ul>
              </div>
            </td>
          </tr>

          {/* CTA Buttons */}
          <tr>
            <td style={{ padding: "0 40px 40px", textAlign: "center" }}>
              <table role="presentation" cellPadding={0} cellSpacing={0} style={{ margin: "0 auto" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "0 6px 10px" }}>
                      <a
                        href={mailto}
                        style={{
                          display: "inline-block",
                          backgroundColor: "#d4af37",
                          border: "1px solid #f2d47f",
                          color: "#111111",
                          padding: "16px 28px",
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          textDecoration: "none",
                        }}
                      >
                        RESPOND TO {firstName.toUpperCase()}
                      </a>
                    </td>
                    <td style={{ padding: "0 6px 10px" }}>
                      <a
                        href={whatsapp}
                        style={{
                          display: "inline-block",
                          backgroundColor: "#111111",
                          border: "1px solid #d4af37",
                          color: "#f9f6ef",
                          padding: "16px 24px",
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          textDecoration: "none",
                        }}
                      >
                        Contact via WhatsApp
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Footer */}
          <tr>
            <td
              style={{
                padding: "20px 40px",
                backgroundColor: palette.grayLight,
                borderTop: `1px solid ${palette.border}`,
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: 10, color: palette.gray, letterSpacing: "0.05em" }}>
                This is an automated notification from your website lead capture system.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default LeadNotification
