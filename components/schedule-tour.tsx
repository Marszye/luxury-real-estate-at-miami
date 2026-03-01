"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js"
import { motion } from "framer-motion"
import { CalendarIcon, ArrowUpRight, Loader2 } from "lucide-react"
import { useLeadContext } from "@/src/context/lead-context"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Image from "next/image"
import { toast } from "sonner"
import { ScrollReveal } from "@/components/scroll-reveal"
import { leadFormSchema, type LeadFormValues } from "@/lib/lead-schema"
import { computeIntentScore } from "@/lib/lead-constants"

const AREA_OPTIONS = [
  "Fisher Island",
  "Star Island",
  "Miami Beach",
  "Brickell",
  "Coconut Grove",
  "Coral Gables",
  "Sunny Isles",
  "Key Biscayne",
] as const

const BUDGET_RANGE_OPTIONS = [
  "Under $500K",
  "$500K - $1M",
  "$1M - $2M",
  "$2M - $5M",
  "$5M+",
] as const

function detectDeviceInfo(): {
  deviceInfo: string
  deviceTier: "High-end Apple" | "Standard"
  userAgent: string
} {
  if (typeof navigator === "undefined") {
    return {
      deviceInfo: "Unknown Device • Unknown Browser",
      deviceTier: "Standard",
      userAgent: "unknown",
    }
  }

  const ua = navigator.userAgent
  const isIphone = /iPhone/i.test(ua)
  const isIpad = /iPad/i.test(ua)
  const isMac = /Macintosh|Mac OS X/i.test(ua)
  const isAndroid = /Android/i.test(ua)
  const isWindows = /Windows NT/i.test(ua)
  const isApple = isIphone || isIpad || isMac

  const osLabel = isIphone
    ? "iPhone"
    : isIpad
      ? "iPad"
      : isMac
        ? "Mac Desktop"
        : isWindows
          ? "Windows Desktop"
          : isAndroid
            ? "Android Phone"
            : "Unknown Device"

  const browserLabel = /Edg\//i.test(ua)
    ? "Edge"
    : /OPR\//i.test(ua)
      ? "Opera"
      : /CriOS|Chrome\//i.test(ua)
        ? "Chrome"
        : /Firefox\//i.test(ua)
          ? "Firefox"
          : /Safari\//i.test(ua)
            ? "Safari"
            : "Unknown Browser"

  return {
    deviceInfo: `${osLabel} • ${browserLabel}`,
    deviceTier: isApple ? "High-end Apple" : "Standard",
    userAgent: ua,
  }
}

export function ScheduleTour() {
  const leadCtx = useLeadContext()
  const startedAtRef = useRef<number>(Date.now())
  const [date, setDate] = useState<Date>()
  const [submitted, setSubmitted] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState<{
    deviceInfo: string
    deviceTier: "High-end Apple" | "Standard"
    userAgent: string
  } | null>(null)
  const [sendAuth, setSendAuth] = useState<{
    nonce: string
    signature: string
  } | null>(null)

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      preferredDate: "",
      propertyInterest: "",
      budgetRange: "",
      message: "",
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form

  const messageValue = watch("message") ?? ""
  const intentScore = useMemo(() => computeIntentScore(messageValue), [messageValue])

  const loadSendAuth = async () => {
    try {
      const res = await fetch("/api/send-token", { cache: "no-store" })
      if (!res.ok) return null
      const data = await res.json()
      if (!data?.nonce || !data?.signature) return null
      const token = { nonce: String(data.nonce), signature: String(data.signature) }
      setSendAuth(token)
      return token
    } catch {
      return null
    }
  }

  useEffect(() => {
    setDeviceInfo(detectDeviceInfo())
    void loadSendAuth()
  }, [])

  const onSubmit = async (values: LeadFormValues) => {
    const firstName = values.firstName.trim()
    const lastName = values.lastName.trim()
    const email = values.email.trim()
    const phone = values.phone?.trim() ?? ""
    const propertyInterest = values.propertyInterest?.trim() ?? ""
    const budgetRange = values.budgetRange?.trim() ?? ""
    const name = `${firstName} ${lastName}`.trim()
    const preferredDate = values.preferredDate?.trim() || "Not specified"
    const sessionDurationSeconds = Math.max(
      1,
      Math.round((Date.now() - startedAtRef.current) / 1000)
    )

    const message = [
      "New private tour request from the website.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      `Preferred date: ${preferredDate}`,
      `Property interest: ${propertyInterest || "—"}`,
      `Budget range: ${budgetRange || "—"}`,
      `Device profile: ${deviceInfo?.deviceInfo ?? "Unknown Device • Unknown Browser"}`,
      `Device tier: ${deviceInfo?.deviceTier ?? "Standard"}`,
      `Session duration: ${sessionDurationSeconds}s`,
      `Intent score: ${intentScore}`,
    ]
      .filter(Boolean)
      .join("\n")

    const optimisticTimer = window.setTimeout(() => {
      setSubmitted(true)
    }, 100)

    try {
      const token = sendAuth ?? (await loadSendAuth())
      if (!token) {
        throw new Error("Submission token unavailable. Please refresh and try again.")
      }

      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-send-nonce": token.nonce,
          "x-send-signature": token.signature,
        },
        body: JSON.stringify({
          lead_id: leadCtx?.sessionId ?? undefined,
          name,
          firstName,
          lastName,
          email,
          phone,
          message,
          propertyInterest: propertyInterest || undefined,
          budgetRange: budgetRange || undefined,
          preferredDate,
          sessionDurationSeconds,
          intentScore,
          device_info: deviceInfo?.deviceInfo ?? "Unknown Device • Unknown Browser",
          device_tier: deviceInfo?.deviceTier ?? "Standard",
          referrer_url:
            (typeof window !== "undefined" ? window.location.href : "") ||
            (typeof document !== "undefined" ? document.referrer : "") ||
            undefined,
          user_agent: deviceInfo?.userAgent ?? "unknown",
          client_intelligence: leadCtx?.clientIntelligence ?? undefined,
          behavioral_profile: leadCtx?.behavioralProfile ?? undefined,
          lead_image_url: leadCtx?.uploadedLeadImage?.imageUrl ?? undefined,
          image_analysis_summary:
            leadCtx?.uploadedLeadImage?.analysisSummary ?? undefined,
          chat_history: leadCtx?.chatMessages ?? undefined,
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data?.success) {
        const msg = data?.detail
          ? `${data.error} (${data.detail})`
          : data?.error || "We were unable to process your request at this time."
        throw new Error(msg)
      }

      window.clearTimeout(optimisticTimer)
      setSubmitted(true)
      reset()
      setDate(undefined)
      setValue("preferredDate", "")
      void loadSendAuth()

      toast.success("Request received", {
        description: "Your private inquiry has been routed to a senior advisor.",
        duration: 4500,
      })

      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      window.clearTimeout(optimisticTimer)
      setSubmitted(false)
      const errMessage =
        err instanceof Error ? err.message : "We encountered an issue processing your request. Please try again or contact us directly."
      toast.error("Submission could not be completed", {
        description: errMessage,
        duration: 5500,
      })
    }
  }

  return (
    <section id="schedule" className="relative overflow-hidden bg-charcoal py-24 lg:py-32">
      <div className="absolute inset-0 opacity-15">
        <Image
          src="/images/listing-3.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <ScrollReveal direction="left">
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                By Appointment Only
              </span>
            </div>

            <h2 className="font-serif text-4xl font-light leading-[1.15] tracking-tight text-cream sm:text-5xl lg:text-6xl text-balance">
              Schedule a{" "}
              <span className="italic text-gold">Private</span> Tour
            </h2>

            <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-cream/50">
              Our system has detected your investment preferences. Please
              schedule an encrypted consultation to access our off-market
              portfolio.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-cream/10 pt-8">
              {[
                { value: "24h", desc: "Response Time" },
                { value: "Private", desc: "Viewings Only" },
                { value: "NDA", desc: "Available" },
                { value: "VIP", desc: "Transportation" },
              ].map((item) => (
                <div key={item.desc}>
                  <span className="font-serif text-xl font-light text-gold">
                    {item.value}
                  </span>
                  <p className="mt-1 font-sans text-[11px] tracking-[0.15em] text-cream/40 uppercase">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right Form */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="border border-cream/10 bg-cream/5 p-8 backdrop-blur-sm lg:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center border border-gold/30">
                    <ArrowUpRight className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-serif text-2xl font-light text-cream">
                    Thank You
                  </h3>
                  <p className="max-w-xs font-sans text-sm text-cream/50">
                    A senior advisor will contact you within 24 hours to confirm
                    your private viewing.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="mb-8">
                    <h3 className="font-serif text-2xl font-light tracking-tight text-cream">
                      Request Your Viewing
                    </h3>
                    <p className="mt-2 font-sans text-xs tracking-wide text-cream/40">
                      All inquiries are treated with strict confidentiality.
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-sans text-[10px] tracking-[0.2em] text-cream/50 uppercase">
                        First Name
                      </label>
                      <input
                        type="text"
                        {...register("firstName")}
                        className="w-full border-b border-cream/15 bg-transparent py-3 font-sans text-sm text-cream outline-none transition-colors placeholder:text-cream/20 focus:border-gold"
                        placeholder="Enter first name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-300">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block font-sans text-[10px] tracking-[0.2em] text-cream/50 uppercase">
                        Last Name
                      </label>
                      <input
                        type="text"
                        {...register("lastName")}
                        className="w-full border-b border-cream/15 bg-transparent py-3 font-sans text-sm text-cream outline-none transition-colors placeholder:text-cream/20 focus:border-gold"
                        placeholder="Enter last name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-red-300">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-sans text-[10px] tracking-[0.2em] text-cream/50 uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full border-b border-cream/15 bg-transparent py-3 font-sans text-sm text-cream outline-none transition-colors placeholder:text-cream/20 focus:border-gold"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block font-sans text-[10px] tracking-[0.2em] text-cream/50 uppercase">
                      Phone
                    </label>
                    <input
                      type="tel"
                      {...register("phone", {
                        onChange: (event) => {
                          const raw = String(event.target.value ?? "")
                          const formatted = new AsYouType().input(raw)
                          setValue("phone", formatted, {
                            shouldValidate: true,
                            shouldDirty: true,
                          })
                        },
                          onBlur: (event) => {
                            const raw = String(event.target.value ?? "").trim()
                            if (!raw) return
                            const parsed = parsePhoneNumberFromString(raw)
                            if (parsed?.isValid()) {
                              setValue("phone", parsed.formatInternational(), {
                                shouldValidate: true,
                                shouldDirty: true,
                              })
                            }
                          },
                      })}
                      className="w-full border-b border-cream/15 bg-transparent py-3 font-sans text-sm text-cream outline-none transition-colors placeholder:text-cream/20 focus:border-gold"
                      placeholder="+1 (305) 000-0000"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-300">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block font-sans text-[10px] tracking-[0.2em] text-cream/50 uppercase">
                      Preferred Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between border-b border-cream/15 bg-transparent py-3 font-sans text-sm text-left transition-colors hover:border-gold focus:border-gold outline-none"
                        >
                          <span className={date ? "text-cream" : "text-cream/20"}>
                            {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                          </span>
                          <CalendarIcon className="h-4 w-4 text-gold/50" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-pearl border-gold/15" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(nextDate) => {
                            setDate(nextDate)
                            setValue(
                              "preferredDate",
                              nextDate ? format(nextDate, "MMMM d, yyyy") : "",
                              { shouldDirty: true }
                            )
                          }}
                          disabled={(d) => d < new Date()}
                          className="bg-pearl"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="mb-2 block font-sans text-[10px] tracking-[0.2em] text-cream/50 uppercase">
                      Areas of Interest
                    </label>
                    <select
                      {...register("propertyInterest")}
                      className="w-full appearance-none border-b border-cream/15 bg-transparent py-3 font-sans text-sm text-cream outline-none transition-colors focus:border-gold"
                    >
                      <option value="" disabled className="text-charcoal">
                        Select a neighborhood
                      </option>
                      {AREA_OPTIONS.map((a) => (
                        <option key={a} value={a} className="text-charcoal">
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block font-sans text-[10px] tracking-[0.2em] text-cream/50 uppercase">
                      Budget Range
                    </label>
                    <select
                      {...register("budgetRange")}
                      className="w-full appearance-none border-b border-cream/15 bg-transparent py-3 font-sans text-sm text-cream outline-none transition-colors focus:border-gold"
                    >
                      <option value="" className="text-charcoal">
                        Select your budget range
                      </option>
                      {BUDGET_RANGE_OPTIONS.map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          className="text-charcoal"
                        >
                          {opt}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1.5 font-sans text-[10px] tracking-wide text-cream/35">
                      Helps us align properties with your acquisition target.
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block font-sans text-[10px] tracking-[0.2em] text-cream/50 uppercase">
                      Message
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className="w-full border border-cream/15 bg-transparent px-3 py-3 font-sans text-sm text-cream outline-none transition-colors placeholder:text-cream/20 focus:border-gold"
                      placeholder="Tell us your ideal property, budget, timeline, or investment goals..."
                    />
                    <p className="mt-1.5 font-sans text-[10px] tracking-wide text-cream/35">
                      Intent score: <span className="text-gold">{intentScore}/100</span>
                    </p>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 flex w-full items-center justify-center gap-2 border border-[#f3d483]/40 bg-gradient-to-r from-[#b18a2f] via-[#e5c86d] to-[#ad8428] px-8 py-4 font-sans text-xs tracking-[0.25em] text-charcoal uppercase shadow-[0_10px_25px_rgba(212,175,55,0.22)] transition-all duration-500 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <motion.span
                        className="flex items-center gap-2"
                        animate={{ scale: [0.98, 1.02, 0.98], opacity: [0.85, 1, 0.85] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader2 className="h-4 w-4 shrink-0" />
                        </motion.span>
                        Processing
                      </motion.span>
                    ) : (
                      "Request Private Tour"
                    )}
                  </motion.button>

                  <p className="text-center font-sans text-[10px] tracking-wide text-cream/30">
                    Your information is protected and never shared with third parties.
                  </p>
                  <p className="mt-3 flex items-center justify-center gap-2 font-sans text-[9px] tracking-[0.12em] text-emerald-400/80 uppercase">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
                    Secure AES-256 Bit Encrypted Connection Active
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
