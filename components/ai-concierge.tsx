"use client"

import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { motion, AnimatePresence } from "framer-motion"
import { SendHorizontal, Sparkles, X, Minus, Bot, ImagePlus, Square } from "lucide-react"
import ReactMarkdown, { type Components } from "react-markdown"
import type { UIMessage } from "ai"
import { useSiteSettings } from "@/components/site-settings-provider"
import { useLeadContext } from "@/src/context/lead-context"
import { useClientIntelligence } from "@/src/hooks/use-client-intelligence"
import type { BehavioralProfile } from "@/src/context/lead-context"

const DEFAULT_WELCOME_TEXT =
  "Good day. I'm your Senior Property Concierge. We've been curating exceptional Miami residences for discerning clients since 2011. Whether you're seeking a waterfront estate, a penthouse with panoramic vistas, or an investment-grade property, I'm here to guide you through our exclusive portfolio.\n\nHow may I assist you today?"

const THINKING_STATES = [
  "Analyzing your architectural preferences...",
  "Curating exclusive off-market matches...",
  "Synchronizing with your investment profile...",
] as const

const VISION_STATES = [
  "Scanning architectural DNA...",
  "Identifying luxury material signatures...",
  "Synchronizing with your profile...",
] as const

const LAYOUT_SPRING = {
  type: "spring" as const,
  stiffness: 500,
  damping: 40,
  mass: 1,
}

function getMessageText(msg: UIMessage): string {
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

function cleanAssistantFormatting(text: string): string {
  return text
    .replace(/\*{3,}/g, "")
    .replace(/^\s*-{3,}\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

const markdownComponents: Components = {
  p: ({ children }) => (
    <p className="mb-2 last:mb-0 font-serif text-[15px] leading-relaxed text-foreground/95">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-serif font-semibold text-[#D4AF37]">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="my-2 list-disc space-y-1 pl-4 marker:text-[#D4AF37]">
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className="font-serif text-[14px] leading-relaxed text-foreground/95">
      {children}
    </li>
  ),
}

function ThinkingBubble({
  states,
  index,
}: {
  states: readonly string[]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.1 } }}
      transition={LAYOUT_SPRING}
      className="flex justify-start"
    >
      <div className="max-w-[85%] border border-gold/15 bg-secondary px-4 py-3.5 rounded-sm shadow-sm">
        <div className="flex items-center gap-3">
          <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
            <span className="absolute h-4 w-4 rounded-full border-[1.5px] border-gold/50 border-t-transparent animate-spin [animation-duration:2s]" />
          </span>
          <AnimatePresence mode="wait">
            <motion.p
              key={states[index]}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-xs tracking-wide text-foreground/80"
            >
              {states[index]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

function analyzeBehavioralProfile(input: string): BehavioralProfile {
  const text = input.toLowerCase().trim()
  const words = text.split(/\s+/).filter(Boolean).length
  const analyticalSignals = [
    "roi", "yield", "security", "cap rate", "returns",
    "risk", "data", "cash flow", "valuation",
  ]
  const visionarySignals = [
    "architecture", "lifestyle", "prestige", "legacy", "view",
    "design", "iconic", "exclusive", "dream",
  ]
  const cautiousSignals = ["concern", "worried", "uncertain", "maybe", "not sure", "risk"]
  const positiveSignals = ["love", "great", "perfect", "excellent", "excited", "amazing"]

  const analyticalScore = analyticalSignals.reduce(
    (acc, k) => acc + (text.includes(k) ? 1 : 0), 0,
  )
  const visionaryScore = visionarySignals.reduce(
    (acc, k) => acc + (text.includes(k) ? 1 : 0), 0,
  )
  const cautiousScore = cautiousSignals.reduce(
    (acc, k) => acc + (text.includes(k) ? 1 : 0), 0,
  )
  const positiveScore = positiveSignals.reduce(
    (acc, k) => acc + (text.includes(k) ? 1 : 0), 0,
  )

  const style: BehavioralProfile["style"] =
    analyticalScore > visionaryScore ? "analytical"
      : visionaryScore > analyticalScore ? "visionary"
        : "balanced"

  const sentiment: BehavioralProfile["sentiment"] =
    cautiousScore > positiveScore ? "cautious"
      : positiveScore > cautiousScore ? "positive"
        : "neutral"

  const cadence: BehavioralProfile["cadence"] =
    words <= 8 ? "concise" : words >= 25 ? "detailed" : "balanced"

  const confidence = Math.min(0.98, 0.55 + (Math.abs(analyticalScore - visionaryScore) * 0.12))

  return { style, sentiment, cadence, confidence }
}

export function AIConcierge() {
  const { companyName, aiName, aiWelcomeMessage, aiAvatarUrl } = useSiteSettings()
  const leadCtx = useLeadContext()
  const intelligence = useClientIntelligence()

  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [isVisionAnalyzing, setIsVisionAnalyzing] = useState(false)
  const [thinkingIndex, setThinkingIndex] = useState(0)
  const [sendAuth, setSendAuth] = useState<{ nonce: string; signature: string } | null>(null)

  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const uploadInputRef = useRef<HTMLInputElement>(null)

  const welcomeText = (aiWelcomeMessage || DEFAULT_WELCOME_TEXT).trim()
  const displayName = (aiName || "Property Concierge").trim()

  const initialMessages: UIMessage[] = useMemo(
    () => [
      {
        id: "welcome",
        role: "assistant",
        parts: [{ type: "text" as const, text: welcomeText }],
      },
    ],
    [welcomeText]
  )

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        headers: {
          "x-hidden-context": encodeURIComponent(JSON.stringify(intelligence)),
          "x-lead-session-id": leadCtx?.sessionId || "",
          "x-behavioral-profile": encodeURIComponent(
            JSON.stringify(
              leadCtx?.behavioralProfile || {
                style: "balanced",
                sentiment: "neutral",
                cadence: "balanced",
                confidence: 0.5,
              }
            )
          ),
        },
      }),
    [intelligence, leadCtx?.behavioralProfile, leadCtx?.sessionId]
  )

  const { messages, setMessages, sendMessage, status, error, stop } = useChat({
    transport,
    messages: initialMessages,
  })

  const isStreaming = status === "streaming"
  const isWaiting = status === "submitted"
  const isGenerating = isStreaming || isWaiting
  const isBusy = isGenerating || isVisionAnalyzing

  const lastMessage = messages[messages.length - 1]
  const lastIsAssistantWithContent =
    lastMessage?.role === "assistant" && getMessageText(lastMessage).length > 0
  const showThinking = (isWaiting || (isStreaming && !lastIsAssistantWithContent)) && !isVisionAnalyzing

  useEffect(() => {
    if (!isOpen || isMinimized) return
    const el = messagesContainerRef.current
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "auto" })
    }
  }, [messages, isOpen, isMinimized, showThinking, isVisionAnalyzing])

  const loadSendAuth = useCallback(async (retries = 2) => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const res = await fetch("/api/send-token", { cache: "no-store" })
        if (!res.ok) {
          if (attempt < retries) continue
          return null
        }
        const data = await res.json()
        if (!data?.nonce || !data?.signature) {
          if (attempt < retries) continue
          return null
        }
        const token = { nonce: String(data.nonce), signature: String(data.signature) }
        setSendAuth(token)
        return token
      } catch {
        if (attempt < retries) continue
        return null
      }
    }
    return null
  }, [])

  useEffect(() => {
    void loadSendAuth()
  }, [loadSendAuth])

  const setChatMessages = leadCtx?.setChatMessages
  const setClientIntelligence = leadCtx?.setClientIntelligence
  const setBehavioralProfile = leadCtx?.setBehavioralProfile

  useEffect(() => {
    if (!setClientIntelligence) return
    setClientIntelligence(intelligence)
  }, [intelligence, setClientIntelligence])

  useEffect(() => {
    if (!showThinking && !isVisionAnalyzing) return
    const states = isVisionAnalyzing ? VISION_STATES : THINKING_STATES
    const timer = window.setInterval(() => {
      setThinkingIndex((prev) => (prev + 1) % states.length)
    }, 2200)
    return () => window.clearInterval(timer)
  }, [showThinking, isVisionAnalyzing])

  useEffect(() => {
    if (!setChatMessages || status === "streaming" || status === "submitted") return
    const chatMessages = messages
      .filter((m: UIMessage) => m.role !== "system")
      .map((m: UIMessage) => ({
        role: m.role as "user" | "assistant",
        text: getMessageText(m),
      }))
      .filter((m) => m.text.trim().length > 0)
    setChatMessages(chatMessages)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, status])

  const replaceBrand = (text: string) => {
    const name = companyName || "Maison"
    return text.replaceAll("Maison", name)
  }

  const handleQuickAction = (text: string) => {
    setBehavioralProfile?.(analyzeBehavioralProfile(text))
    sendMessage({ parts: [{ type: "text", text }] })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isBusy) return
    const value = input.trim()
    if (!value) return
    setBehavioralProfile?.(analyzeBehavioralProfile(value))
    sendMessage({ parts: [{ type: "text", text: value }] })
    setInput("")
  }

  const handleStop = () => {
    stop()
  }

  const handleImageUpload = async (file: File) => {
    if (!file || !setMessages) return
    setIsVisionAnalyzing(true)
    setThinkingIndex(0)
    try {
      const imageDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result || ""))
        reader.onerror = () => reject(new Error("Failed to read image"))
        reader.readAsDataURL(file)
      })

      const token = (await loadSendAuth()) ?? sendAuth
      if (!token) {
        throw new Error("Secure analysis token unavailable. Please refresh and try again.")
      }

      const res = await fetch("/api/vision-analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-send-nonce": token.nonce,
          "x-send-signature": token.signature,
        },
        body: JSON.stringify({
          imageDataUrl,
          fileName: file.name,
          leadId: leadCtx?.sessionId || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || "Image analysis failed.")
      }

      const assistantText =
        data?.conciergeMessage ||
        "I can align this aesthetic direction with highly curated opportunities."
      const summary = String(data?.analysisSummary || "Luxury architectural cues detected.")

      leadCtx?.setUploadedLeadImage({
        imageUrl: String(data?.imageUrl || imageDataUrl),
        analysisSummary: summary,
      })

      setMessages((prev) => [
        ...prev,
        {
          id: `user-image-${Date.now()}`,
          role: "user",
          parts: [{ type: "text", text: `Uploaded inspiration image: ${file.name}` }],
        } as UIMessage,
        {
          id: `assistant-vision-${Date.now()}`,
          role: "assistant",
          parts: [{ type: "text", text: `${assistantText}\n\nInsight: ${summary}` }],
        } as UIMessage,
      ])
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to process uploaded image."
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-vision-error-${Date.now()}`,
          role: "assistant",
          parts: [{ type: "text", text: message }],
        } as UIMessage,
      ])
    } finally {
      setIsVisionAnalyzing(false)
    }
  }

  const quickActions: string[] = []

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => {
              setIsOpen(true)
              setIsMinimized(false)
            }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3"
            aria-label="Open AI Property Concierge"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-gold/20" />
            <div className="relative flex items-center gap-3 bg-charcoal pl-5 pr-6 py-3.5 shadow-2xl shadow-charcoal/20 border border-gold/10">
              <div className="relative">
                <Sparkles className="h-4 w-4 text-gold" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="font-sans text-xs tracking-[0.15em] text-cream uppercase">
                AI Concierge Online
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-x-4 bottom-4 sm:bottom-6 sm:right-6 sm:left-auto z-50 flex flex-col overflow-hidden border border-gold/15 bg-pearl shadow-2xl shadow-charcoal/15 ${
              isMinimized
                ? "h-[68px] w-full sm:w-[340px]"
                : "h-[540px] w-full sm:w-[380px] max-h-[80vh]"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gold/10 bg-charcoal px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden border border-gold/30 bg-charcoal-light">
                  {aiAvatarUrl ? (
                    <img
                      src={aiAvatarUrl}
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Bot className="h-4 w-4 text-gold" />
                  )}
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-charcoal bg-emerald-400" />
                </div>
                <div>
                  <p className="font-serif text-sm font-medium tracking-wide text-cream">
                    {displayName}
                  </p>
                  <p className="flex items-center gap-1.5 font-sans text-[10px] tracking-wider text-cream/50 uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {isGenerating ? "Generating..." : "AI-Powered"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="flex h-8 w-8 items-center justify-center text-cream/40 transition-colors hover:text-cream"
                  aria-label="Minimize chat"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center text-cream/40 transition-colors hover:text-cream"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div
                  ref={messagesContainerRef}
                  className="relative flex-1 overflow-y-auto p-5 space-y-4"
                  style={{ overflowAnchor: "auto" }}
                >
                  {messages
                    .filter((msg: UIMessage) => msg.role !== "system")
                    .map((msg: UIMessage) => {
                      const raw = replaceBrand(getMessageText(msg))
                      const content =
                        msg.role === "assistant" ? cleanAssistantFormatting(raw) : raw
                      if (!content && msg.role === "assistant") return null
                      return (
                        <motion.div
                          key={msg.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={LAYOUT_SPRING}
                          className={`flex ${
                            msg.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[85%] px-4 py-3.5 text-sm leading-relaxed rounded-sm ${
                              msg.role === "user"
                                ? "bg-charcoal text-cream shadow-sm"
                                : "border border-gold/10 bg-secondary text-foreground shadow-sm"
                            }`}
                          >
                            {msg.role === "user" ? (
                              <span className="font-sans text-cream/95">{content}</span>
                            ) : (
                              <div className="whitespace-pre-wrap">
                                <ReactMarkdown components={markdownComponents}>
                                  {content}
                                </ReactMarkdown>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}

                  {error && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] px-4 py-3.5 font-sans text-sm text-red-600 border border-red-200 bg-red-50 rounded-sm">
                        {error.message}
                      </div>
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    {isVisionAnalyzing ? (
                      <ThinkingBubble
                        key="vision-thinking"
                        states={VISION_STATES}
                        index={thinkingIndex % VISION_STATES.length}
                      />
                    ) : showThinking ? (
                      <ThinkingBubble
                        key="chat-thinking"
                        states={THINKING_STATES}
                        index={thinkingIndex % THINKING_STATES.length}
                      />
                    ) : null}
                  </AnimatePresence>
                </div>

                {/* Quick Actions */}
                {messages.filter((m: UIMessage) => m.role !== "system").length <= 1 &&
                  quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-2 px-5 pb-3">
                      {quickActions.map((action) => (
                        <button
                          key={action}
                          onClick={() => handleQuickAction(action)}
                          disabled={isBusy}
                          className="border border-gold/15 bg-secondary/50 px-3 py-1.5 font-sans text-[11px] tracking-wide text-muted-foreground transition-all duration-300 hover:border-gold/30 hover:text-foreground disabled:opacity-50"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}

                {/* Input Bar */}
                <div className="border-t border-gold/10 bg-pearl p-4">
                  <form onSubmit={onSubmit} className="flex items-center gap-3">
                    <input
                      ref={uploadInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) void handleImageUpload(file)
                        e.currentTarget.value = ""
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => uploadInputRef.current?.click()}
                      className="flex h-9 w-9 shrink-0 items-center justify-center border border-gold/25 text-charcoal transition-colors hover:border-gold hover:text-gold disabled:opacity-30 disabled:pointer-events-none"
                      aria-label="Upload inspiration image"
                      disabled={isBusy}
                    >
                      <ImagePlus className="h-4 w-4" />
                    </button>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={
                        isBusy
                          ? "Generating response..."
                          : "Share your preferences or questions..."
                      }
                      className="flex-1 bg-transparent font-sans text-sm text-foreground placeholder:text-muted-foreground/60 outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={isBusy}
                    />

                    <AnimatePresence mode="wait">
                      {isGenerating ? (
                        <motion.button
                          key="stop-btn"
                          type="button"
                          onClick={handleStop}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.1 }}
                          className="flex h-9 w-9 shrink-0 items-center justify-center bg-red-600/90 text-white transition-all duration-200 hover:bg-red-600"
                          aria-label="Stop generating"
                        >
                          <Square className="h-2.5 w-2.5 fill-current" />
                        </motion.button>
                      ) : (
                        <motion.button
                          key="send-btn"
                          type="submit"
                          disabled={!input.trim() || isBusy}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex h-9 w-9 shrink-0 items-center justify-center bg-charcoal text-cream transition-all duration-300 hover:bg-gold disabled:opacity-30"
                          aria-label="Send message"
                        >
                          <SendHorizontal className="h-3.5 w-3.5" />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
