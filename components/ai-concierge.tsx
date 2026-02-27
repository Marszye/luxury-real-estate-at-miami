"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, X, Minus, Bot } from "lucide-react"

const initialMessages: { role: "user" | "assistant"; content: string }[] = [
  {
    role: "assistant" as const,
    content:
      "Welcome to Maison. I'm your personal property concierge. How may I assist you in finding your perfect Miami residence?",
  },
]

const quickActions = [
  "Waterfront homes under $20M",
  "Penthouse with ocean views",
  "New developments in Brickell",
  "Schedule a private viewing",
]

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

  const handleSend = (text?: string) => {
    const message = text || input
    if (!message.trim()) return

    setMessages((prev) => [...prev, { role: "user" as const, content: message }])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you explore that. We currently have several exceptional properties matching your criteria. Would you like me to arrange a private viewing with one of our senior advisors?",
        "Excellent choice. Our Brickell portfolio includes three pre-launch developments with panoramic bay views starting from $4.8M. Shall I send you the exclusive brochure?",
        "That's a wonderful selection. I can connect you with our dedicated concierge team for a personalized tour at your convenience. What dates work best for you?",
        "We have several stunning options available. Our Star Island estate and the new Fisher Island penthouse are generating significant interest. I can schedule a VIP preview for you this week.",
      ]
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant" as const,
          content: responses[Math.floor(Math.random() * responses.length)],
        },
      ])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(true)
          setIsMinimized(false)
        }}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-500 ${
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
        className={`fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden border border-gold/15 bg-cream shadow-2xl shadow-charcoal/15 transition-all duration-500 ease-out ${
          isOpen
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-6"
        } ${
          isMinimized
            ? "h-[68px] w-[340px]"
            : "h-[540px] w-[380px] max-h-[80vh]"
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
                    className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-charcoal text-cream"
                        : "border border-gold/10 bg-secondary text-foreground"
                    }`}
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {msg.content}
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
                  placeholder="Ask about any property..."
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
