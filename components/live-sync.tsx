"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

function getMiamiTime() {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
}

function getMiamiDate() {
  return new Date().toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function getMarketStatus(): { label: string; open: boolean } {
  const now = new Date()
  const miamiNow = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" })
  )
  const hour = miamiNow.getHours()
  const day = miamiNow.getDay()

  if (day === 0) return { label: "By Appointment", open: false }
  if (day === 6) {
    if (hour >= 10 && hour < 17) return { label: "Weekend Hours", open: true }
    return { label: "Closed", open: false }
  }
  if (hour >= 9 && hour < 19) return { label: "Market Active", open: true }
  if (hour >= 19 && hour < 21) return { label: "After Hours", open: false }
  return { label: "Closed", open: false }
}

interface LiveSyncProps {
  variant?: "light" | "dark"
  className?: string
  compact?: boolean
}

export function LiveSync({
  variant = "dark",
  className = "",
  compact = false,
}: LiveSyncProps) {
  const [time, setTime] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [status, setStatus] = useState<{ label: string; open: boolean }>({
    label: "",
    open: false,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(getMiamiTime())
    setDate(getMiamiDate())
    setStatus(getMarketStatus())

    const interval = setInterval(() => {
      setTime(getMiamiTime())
      setDate(getMiamiDate())
      setStatus(getMarketStatus())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  const isLight = variant === "light"
  const textPrimary = isLight ? "text-charcoal" : "text-cream"
  const textSecondary = isLight ? "text-charcoal/50" : "text-cream/50"
  const borderColor = isLight ? "border-charcoal/10" : "border-cream/10"
  const bgColor = isLight ? "bg-charcoal/5" : "bg-cream/5"

  if (compact) {
    return (
      <div className={`flex items-center gap-3 font-sans ${className}`}>
        <div className="relative flex items-center gap-1.5">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`h-1.5 w-1.5 rounded-full ${
              status.open ? "bg-emerald-400" : "bg-amber-400"
            }`}
          />
          <span className={`text-[10px] tracking-[0.15em] uppercase ${textSecondary}`}>
            {status.label}
          </span>
        </div>
        <span className={`text-[10px] ${textSecondary}`}>{time} EST</span>
      </div>
    )
  }

  return (
    <div
      className={`inline-flex items-center gap-4 border ${borderColor} ${bgColor} backdrop-blur-xl px-5 py-3 font-sans ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`h-2 w-2 rounded-full ${
              status.open ? "bg-emerald-400" : "bg-amber-400"
            }`}
          />
          {status.open && (
            <motion.div
              animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 h-2 w-2 rounded-full bg-emerald-400"
            />
          )}
        </div>
        <span
          className={`text-[10px] tracking-[0.2em] uppercase ${
            status.open ? "text-emerald-400" : "text-amber-400"
          }`}
        >
          {status.label}
        </span>
      </div>

      <span className={`h-3 w-px ${borderColor}`} />

      <div className="flex flex-col">
        <span className={`text-[10px] tracking-wide ${textSecondary}`}>
          Miami, FL
        </span>
        <span className={`text-xs tabular-nums tracking-wide ${textPrimary}`}>
          {time}
        </span>
      </div>

      <span className={`hidden h-3 w-px sm:block ${borderColor}`} />

      <span className={`hidden text-[10px] tracking-wide sm:block ${textSecondary}`}>
        {date}
      </span>
    </div>
  )
}
