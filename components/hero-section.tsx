"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowDown, Search, ChevronDown } from "lucide-react"

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const stats = [
    { value: "$4.2B+", label: "Portfolio Value" },
    { value: "180+", label: "Luxury Residences" },
    { value: "15", label: "Years of Excellence" },
    { value: "98%", label: "Client Satisfaction" },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-miami.jpg"
            alt="Luxury Miami waterfront penthouse with ocean views"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-36 pb-16 lg:px-10">
          {/* Tagline */}
          <div
            className={`mb-8 transition-all duration-1000 delay-300 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span
                className="text-xs tracking-[0.4em] text-gold uppercase"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Exclusive Miami Properties
              </span>
              <span className="h-px w-8 bg-gold" />
            </div>
          </div>

          {/* Headline */}
          <h1
            className={`mb-8 text-center transition-all duration-1000 delay-500 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block text-5xl font-light leading-[1.1] tracking-tight text-cream sm:text-7xl lg:text-[6.5rem] text-balance">
              Where Elegance
            </span>
            <span className="mt-2 block text-5xl leading-[1.1] tracking-tight text-cream sm:text-7xl lg:text-[6.5rem] italic">
              Meets the Sea
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`mx-auto max-w-2xl text-center text-base leading-relaxed text-cream/70 transition-all duration-1000 delay-700 sm:text-lg ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Curated waterfront residences and architectural masterpieces in
            Miami&apos;s most coveted addresses. Trusted by discerning buyers
            across 40+ countries since 2011.
          </p>

          {/* Property Search Bar */}
          <div
            className={`mt-12 w-full max-w-3xl transition-all duration-1000 delay-900 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex flex-col gap-0 border border-cream/15 bg-cream/5 backdrop-blur-xl sm:flex-row sm:items-center">
              {/* Location */}
              <div className="flex-1 border-b border-cream/10 px-5 py-4 sm:border-b-0 sm:border-r">
                <label
                  className="mb-1 block text-[9px] tracking-[0.2em] text-cream/40 uppercase"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Location
                </label>
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm text-cream/70"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    All Miami Neighborhoods
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-cream/30" />
                </div>
              </div>

              {/* Property Type */}
              <div className="flex-1 border-b border-cream/10 px-5 py-4 sm:border-b-0 sm:border-r">
                <label
                  className="mb-1 block text-[9px] tracking-[0.2em] text-cream/40 uppercase"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Property Type
                </label>
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm text-cream/70"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    All Residences
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-cream/30" />
                </div>
              </div>

              {/* Price Range */}
              <div className="flex-1 border-b border-cream/10 px-5 py-4 sm:border-b-0 sm:border-r">
                <label
                  className="mb-1 block text-[9px] tracking-[0.2em] text-cream/40 uppercase"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Price Range
                </label>
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm text-cream/70"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    $2M - $50M+
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-cream/30" />
                </div>
              </div>

              {/* Search Button */}
              <button
                className="flex items-center justify-center gap-2 bg-gold px-8 py-4 text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light sm:py-[52px]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                <Search className="h-4 w-4" />
                <span className="sm:hidden">Search</span>
              </button>
            </div>

            {/* Quick Search Tags */}
            <div className="mt-4 flex flex-wrap items-center gap-3 justify-center">
              <span
                className="text-[11px] text-cream/30"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Popular:
              </span>
              {[
                "Waterfront",
                "Penthouse",
                "New Construction",
                "Under $10M",
                "Fisher Island",
              ].map((tag) => (
                <button
                  key={tag}
                  className="border border-cream/10 px-3 py-1 text-[11px] tracking-wide text-cream/50 transition-all duration-300 hover:border-gold/30 hover:text-cream/80"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-auto pt-10 animate-bounce">
            <ArrowDown className="h-4 w-4 text-cream/50" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-gold/10 bg-charcoal">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-cream/10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 px-4 py-5 sm:px-6 sm:py-7"
            >
              <span className="text-xl font-light tracking-wide text-gold sm:text-2xl lg:text-3xl">
                {stat.value}
              </span>
              <span
                className="text-[10px] tracking-[0.2em] text-cream/50 uppercase sm:text-xs"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
