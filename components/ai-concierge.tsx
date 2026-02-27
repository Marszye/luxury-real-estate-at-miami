"use client"

import { useState, useRef, useEffect } from "react"
import type { Components } from "react-markdown"
import ReactMarkdown from "react-markdown"
import { Send, Sparkles, X, Minus, Bot } from "lucide-react"

const initialMessages: { role: "user" | "assistant"; content: string }[] = [
  {
    role: "assistant" as const,
    content:
      "Good day. I'm your Senior Property Concierge at Maison. We've been curating exceptional Miami residences for discerning clients since 2011. Whether you're seeking a waterfront estate, a penthouse with panoramic vistas, or an investment-grade property, I'm here to guide you through our exclusive portfolio.\n\nHow may I assist you today?",
  },
]

const quickActions = [
  "Waterfront estates $10M–$25M",
  "Penthouses with bay-to-ocean views",
  "New developments in Brickell & Edgewater",
  "Schedule an exclusive private viewing",
]

const markdownComponents: Components = {
  p: ({ children }) => (
    <p className="mb-3 last:mb-0 text-sm leading-relaxed text-foreground/90">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-foreground/85">{children}</em>
  ),
  a: ({ href, children }) => (
    <a
      href={href ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-4 space-y-2.5 list-none pl-0" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 space-y-2.5 list-none pl-0" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="border border-gold/20 bg-background/95 rounded-md px-4 py-3 text-sm leading-relaxed shadow-sm hover:border-gold/30 transition-colors [&:not(:last-child)]:mb-2.5">
      {children}
    </li>
  ),
  h1: ({ children }) => (
    <h1 className="text-base font-semibold mt-4 mb-2 first:mt-0 text-foreground tracking-tight">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-sm font-semibold mt-4 mb-2 first:mt-0 text-foreground tracking-tight">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-sm font-medium mt-3 mb-1.5 text-foreground/95">{children}</h3>
  ),
  hr: () => (
    <hr className="my-5 border-0 border-t border-gold/20" />
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-gold/40 pl-4 py-2 my-3 italic text-foreground/85 bg-background/50 rounded-r-sm">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = className != null
    return isBlock ? (
      <code className="block rounded bg-muted px-2 py-1.5 text-xs overflow-x-auto">
        {children}
      </code>
    ) : (
      <code className="rounded bg-muted/80 px-1.5 py-0.5 text-xs font-mono">
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <pre className="rounded-md bg-muted p-3 my-2 overflow-x-auto text-xs">
      {children}
    </pre>
  ),
}

export function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async (text?: string) => {
    const message = text || input
    if (!message.trim()) return

    setMessages((prev) => [...prev, { role: "user" as const, content: message }])
    setInput("")
    setIsTyping(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages,
            { role: "user" as const, content: message },
          ],
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response")
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant" as const,
          content: data.message || "I apologize, but I'm unable to generate a response at this moment. Please try again, or I'd be delighted to connect you directly with one of our senior advisors.",
        },
      ])
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "I apologize for the inconvenience."
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant" as const,
          content: `I regret that I've encountered a technical difficulty: ${errorMessage} Please feel free to try again, or allow me to connect you with one of our senior property advisors who can assist you immediately.`,
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(true)
          setIsMinimized(false)
        }}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 transition-all duration-500 ${
          isOpen
            ? "pointer-events-none scale-90 opacity-0"
            : "pointer-events-auto scale-100 opacity-100"
        }`}
        aria-label="Open AI Property Concierge"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 animate-ping rounded-full bg-gold/20" />
        
        <div className="relative flex items-center gap-3 bg-charcoal pl-5 pr-6 py-3.5 shadow-2xl shadow-charcoal/20 border border-gold/10">
          <div className="relative">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span
            className="text-xs tracking-[0.15em] text-cream uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Your AI Assistant is Online
          </span>
        </div>
      </button>

      {/* Chat Widget */}
      <div
        className={`fixed inset-x-4 bottom-4 sm:bottom-6 sm:right-6 sm:left-auto z-50 flex flex-col overflow-hidden border border-gold/15 bg-cream shadow-2xl shadow-charcoal/15 transition-all duration-500 ease-out ${
          isOpen
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-6"
        } ${
          isMinimized
            ? "h-[68px] w-full sm:w-[340px]"
            : "h-[540px] w-full sm:w-[380px] max-h-[80vh]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gold/10 bg-charcoal px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center border border-gold/30 bg-charcoal-light">
              <Bot className="h-4 w-4 text-gold" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-charcoal bg-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium tracking-wide text-cream">
                Property Concierge
              </p>
              <p
                className="flex items-center gap-1.5 text-[10px] tracking-wider text-cream/50 uppercase"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                AI-Powered
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
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3.5 text-sm leading-relaxed max-w-none rounded-sm ${
                      msg.role === "user"
                        ? "bg-charcoal text-cream shadow-sm"
                        : "border border-gold/10 bg-secondary text-foreground shadow-sm"
                    }`}
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {msg.role === "user" ? (
                      <span className="text-cream/95">{msg.content}</span>
                    ) : (
                      <ReactMarkdown components={markdownComponents}>
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 border border-gold/10 bg-secondary px-4 py-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold/40 animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gold/40 animate-bounce [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gold/40 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 px-5 pb-3">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleSend(action)}
                    className="border border-gold/15 bg-secondary/50 px-3 py-1.5 text-[11px] tracking-wide text-muted-foreground transition-all duration-300 hover:border-gold/30 hover:text-foreground"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-gold/10 bg-cream p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex items-center gap-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Share your property preferences or questions..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="flex h-9 w-9 items-center justify-center bg-charcoal text-cream transition-all duration-300 hover:bg-gold disabled:opacity-30"
                  aria-label="Send message"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  )
}
