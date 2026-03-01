"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

function scrollToHash(): boolean {
  if (typeof window === "undefined") return false
  const hash = window.location.hash
  if (!hash || hash.length < 2) return false
  const id = hash.slice(1)
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" })
    return true
  }
  return false
}

/**
 * Scrolls to the element with id matching the URL hash after navigation.
 * Ensures /#schedule and other hash links work from sub-pages like /market-intelligence.
 */
export function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === "undefined") return
    const hash = window.location.hash
    if (!hash || hash.length < 2) return

    let cancelled = false
    const attempt = () => {
      if (cancelled) return
      if (scrollToHash()) return
      setTimeout(attempt, 100)
    }
    const t0 = setTimeout(attempt, 80)
    return () => {
      cancelled = true
      clearTimeout(t0)
    }
  }, [pathname])

  useEffect(() => {
    const handleHashChange = () => scrollToHash()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  return null
}
