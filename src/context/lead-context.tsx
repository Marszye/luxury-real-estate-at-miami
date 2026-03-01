"use client"

import * as React from "react"

export type InquiryType = "general" | "low" | "high" | "luxury"

export interface ChatMessage {
  role: "user" | "assistant"
  text: string
}

export interface ClientIntelligence {
  ipLocation?: string
  localTime?: string
  timezone?: string
  hardwareClass?: "Apple" | "Other"
}

export interface BehavioralProfile {
  style: "analytical" | "visionary" | "balanced"
  sentiment: "positive" | "neutral" | "cautious"
  cadence: "concise" | "balanced" | "detailed"
  confidence: number
}

export interface UploadedLeadImage {
  imageUrl: string
  analysisSummary: string
}

interface LeadContextValue {
  sessionId: string
  chatMessages: ChatMessage[]
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
  addChatMessage: (role: "user" | "assistant", text: string) => void
  clearChatMessages: () => void
  clientIntelligence: ClientIntelligence | null
  setClientIntelligence: React.Dispatch<
    React.SetStateAction<ClientIntelligence | null>
  >
  behavioralProfile: BehavioralProfile | null
  setBehavioralProfile: React.Dispatch<
    React.SetStateAction<BehavioralProfile | null>
  >
  uploadedLeadImage: UploadedLeadImage | null
  setUploadedLeadImage: React.Dispatch<
    React.SetStateAction<UploadedLeadImage | null>
  >
}

const LeadContext = React.createContext<LeadContextValue | null>(null)

function createLeadSessionId(): string {
  const createFallbackUuid = () =>
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const rand = Math.floor(Math.random() * 16)
      const value = char === "x" ? rand : (rand & 0x3) | 0x8
      return value.toString(16)
    })

  if (typeof window === "undefined") {
    return createFallbackUuid()
  }
  const existing = window.sessionStorage.getItem("lead_session_id")
  if (existing) return existing
  const generated =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : createFallbackUuid()
  window.sessionStorage.setItem("lead_session_id", generated)
  return generated
}

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [sessionId] = React.useState<string>(() => createLeadSessionId())
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([])
  const [clientIntelligence, setClientIntelligence] =
    React.useState<ClientIntelligence | null>(null)
  const [behavioralProfile, setBehavioralProfile] =
    React.useState<BehavioralProfile | null>(null)
  const [uploadedLeadImage, setUploadedLeadImage] =
    React.useState<UploadedLeadImage | null>(null)

  const addChatMessage = React.useCallback(
    (role: "user" | "assistant", text: string) => {
      setChatMessages((prev) => [...prev, { role, text }])
    },
    []
  )

  const clearChatMessages = React.useCallback(() => {
    setChatMessages([])
  }, [])

  const value: LeadContextValue = {
    sessionId,
    chatMessages,
    setChatMessages,
    addChatMessage,
    clearChatMessages,
    clientIntelligence,
    setClientIntelligence,
    behavioralProfile,
    setBehavioralProfile,
    uploadedLeadImage,
    setUploadedLeadImage,
  }

  return (
    <LeadContext.Provider value={value}>{children}</LeadContext.Provider>
  )
}

export function useLeadContext(): LeadContextValue | null {
  return React.useContext(LeadContext)
}
