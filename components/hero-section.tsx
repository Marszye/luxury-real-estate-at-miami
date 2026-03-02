"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown, Search, ChevronDown, Loader2 } from "lucide-react"
import { useSiteSettings } from "@/components/site-settings-provider"
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholders"

const ease = [0.22, 1, 0.36, 1]

const stats = [
  { value: "$4.2B+", label: "Portfolio Value" },
  { value: "180+", label: "Luxury Residences" },
  { value: "15", label: "Years of Excellence" },
  { value: "98%", label: "Client Satisfaction" },
]

const locationOpts = [
  "All Miami Neighborhoods", "Fisher Island", "Brickell",
  "Star Island", "Coconut Grove", "Edgewater", "Sunny Isles",
]
const typeOpts = ["All Residences", "Penthouse", "Estate", "Condo", "Waterfront"]
const priceOpts = [
  { label: "$2M - $50M+", value: "" },
  { label: "Under $10M", value: "under-10m" },
  { label: "$10M - $20M", value: "10m-20m" },
  { label: "$20M+", value: "20m-50m" },
]

const DEFAULT_HERO_SUBTITLE =
  "Curated waterfront residences and architectural masterpieces in Miami's most coveted addresses. Trusted by discerning buyers across 40+ countries since 2011."

export function HeroSection() {
  const { heroTitle, heroSubtitle, heroBgImageUrl } = useSiteSettings()
  const [searching, setSearching] = useState(false)
  const [locOpen, setLocOpen] = useState(false)
  const [typeOpen, setTypeOpen] = useState(false)
  const [priceOpen, setPriceOpen] = useState(false)
  const [loc, setLoc] = useState(locationOpts[0])
  const [type, setType] = useState(typeOpts[0])
  const [price, setPrice] = useState(priceOpts[0])

  const lines = (heroTitle || "").split("\n").map((l) => l.trim()).filter(Boolean)
  const line1 = lines[0] ?? heroTitle ?? ""
  const line2 = lines[1]

  const doSearch = () => {
    setSearching(true)
    setTimeout(() => {
      setSearching(false)
      document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" })
    }, 800)
  }

  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroBgImageUrl || "/images/hero-miami.jpg"}
            alt="Luxury Miami waterfront"
            fill
            className="object-cover"
            priority
            fetchPriority="high"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={IMAGE_BLUR_DATA_URL}
          />
          <div className="absolute inset-0 bg-charcoal/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/70" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-36 pb-16 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease }} className="mb-8">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">Exclusive Miami Properties</span>
              <span className="h-px w-8 bg-gold" />
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease }} className="mb-8 text-center">
            <span className="block font-serif text-5xl font-light leading-[1.1] tracking-tight text-cream sm:text-7xl lg:text-[6.5rem] text-balance">{line1}</span>
            {line2 && <span className="mt-2 block font-serif text-5xl leading-[1.1] tracking-tight text-cream sm:text-7xl lg:text-[6.5rem] italic">{line2}</span>}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease }} className="mx-auto max-w-2xl text-center font-sans text-base leading-relaxed text-cream/70 sm:text-lg">
            {(heroSubtitle || DEFAULT_HERO_SUBTITLE).trim()}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, ease }} className="mt-12 w-full max-w-3xl">
            <div className="flex flex-col gap-0 border border-cream/15 bg-cream/5 backdrop-blur-xl sm:flex-row sm:items-center">
              {/* Location */}
              <div className="relative flex-1 border-b border-cream/10 sm:border-b-0 sm:border-r cursor-pointer" onClick={() => { setLocOpen(!locOpen); setTypeOpen(false); setPriceOpen(false) }}>
                <div className="px-5 py-4">
                  <label className="mb-1 block font-sans text-[9px] tracking-[0.2em] text-cream/40 uppercase">Location</label>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm text-cream/70">{loc}</span>
                    <ChevronDown className={`h-3.5 w-3.5 text-cream/30 transition-transform ${locOpen ? "rotate-180" : ""}`} />
                  </div>
                </div>
                <AnimatePresence>
                  {locOpen && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute left-0 right-0 top-full z-20 border border-cream/10 bg-charcoal/95 backdrop-blur-xl">
                      {locationOpts.map((o) => (
                        <button key={o} onClick={(e) => { e.stopPropagation(); setLoc(o); setLocOpen(false) }} className={`block w-full px-5 py-2.5 text-left font-sans text-xs transition-colors ${loc === o ? "bg-gold/10 text-gold" : "text-cream/60 hover:bg-cream/5 hover:text-cream"}`}>{o}</button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Type */}
              <div className="relative flex-1 border-b border-cream/10 sm:border-b-0 sm:border-r cursor-pointer" onClick={() => { setTypeOpen(!typeOpen); setLocOpen(false); setPriceOpen(false) }}>
                <div className="px-5 py-4">
                  <label className="mb-1 block font-sans text-[9px] tracking-[0.2em] text-cream/40 uppercase">Property Type</label>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm text-cream/70">{type}</span>
                    <ChevronDown className={`h-3.5 w-3.5 text-cream/30 transition-transform ${typeOpen ? "rotate-180" : ""}`} />
                  </div>
                </div>
                <AnimatePresence>
                  {typeOpen && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute left-0 right-0 top-full z-20 border border-cream/10 bg-charcoal/95 backdrop-blur-xl">
                      {typeOpts.map((o) => (
                        <button key={o} onClick={(e) => { e.stopPropagation(); setType(o); setTypeOpen(false) }} className={`block w-full px-5 py-2.5 text-left font-sans text-xs transition-colors ${type === o ? "bg-gold/10 text-gold" : "text-cream/60 hover:bg-cream/5 hover:text-cream"}`}>{o}</button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Price */}
              <div className="relative flex-1 border-b border-cream/10 sm:border-b-0 sm:border-r cursor-pointer" onClick={() => { setPriceOpen(!priceOpen); setLocOpen(false); setTypeOpen(false) }}>
                <div className="px-5 py-4">
                  <label className="mb-1 block font-sans text-[9px] tracking-[0.2em] text-cream/40 uppercase">Price Range</label>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm text-cream/70">{price.label}</span>
                    <ChevronDown className={`h-3.5 w-3.5 text-cream/30 transition-transform ${priceOpen ? "rotate-180" : ""}`} />
                  </div>
                </div>
                <AnimatePresence>
                  {priceOpen && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute left-0 right-0 top-full z-20 border border-cream/10 bg-charcoal/95 backdrop-blur-xl">
                      {priceOpts.map((o) => (
                        <button key={o.label} onClick={(e) => { e.stopPropagation(); setPrice(o); setPriceOpen(false) }} className={`block w-full px-5 py-2.5 text-left font-sans text-xs transition-colors ${price.label === o.label ? "bg-gold/10 text-gold" : "text-cream/60 hover:bg-cream/5 hover:text-cream"}`}>{o.label}</button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={doSearch} disabled={searching}>
                <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center justify-center gap-2 bg-gold px-8 py-4 font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-colors duration-500 hover:bg-gold-light sm:py-[52px]">
                  {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  <span className="sm:hidden">{searching ? "Processing" : "Search"}</span>
                </motion.span>
              </button>
            </div>

            <AnimatePresence>
              {searching && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 flex items-center justify-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-gold" />
                  <span className="font-sans text-[11px] tracking-[0.2em] text-gold uppercase">Processing</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4 flex flex-wrap items-center gap-3 justify-center">
              <span className="font-sans text-[11px] text-cream/30">Popular:</span>
              {["Waterfront", "Penthouse", "New Construction", "Under $10M", "Fisher Island"].map((tag) => (
                <motion.button key={tag} onClick={doSearch} whileHover={{ scale: 1.02, borderColor: "rgba(212,175,55,0.3)" }} className="border border-cream/10 px-3 py-1 font-sans text-[11px] tracking-wide text-cream/50 transition-colors duration-300 hover:text-cream/80">{tag}</motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2, ease }} className="mt-auto pt-10 animate-bounce">
            <ArrowDown className="h-4 w-4 text-cream/50" />
          </motion.div>
        </div>
      </section>

      <section className="border-b border-gold/10 bg-charcoal">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-cream/10 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease }} className="flex flex-col items-center gap-1 px-4 py-5 sm:px-6 sm:py-7">
              <span className="font-serif text-xl font-light tracking-wide text-gold sm:text-2xl lg:text-3xl">{stat.value}</span>
              <span className="font-sans text-[10px] tracking-[0.2em] text-cream/50 uppercase sm:text-xs">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
