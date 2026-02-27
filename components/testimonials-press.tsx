"use client"

import { useState } from "react"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "Maison understood exactly what we were looking for before we could even articulate it. They secured our Fisher Island penthouse off-market, saving us months and negotiating a price that exceeded our expectations. Their discretion throughout the process was impeccable.",
    name: "Alexander & Catherine Rothberg",
    title: "CEO, Rothberg Capital Partners",
    location: "Fisher Island",
    transactionValue: "$28.5M",
    rating: 5,
  },
  {
    quote:
      "As an international buyer relocating from London, I needed a team that understood cross-border transactions, tax implications, and the nuances of the Miami luxury market. Maison delivered on every front. From legal counsel to interior design coordination, the experience was seamless.",
    name: "Sir James Harrington",
    title: "Managing Director, Harrington Group",
    location: "Star Island",
    transactionValue: "$42M",
    rating: 5,
  },
  {
    quote:
      "We have purchased properties in Monaco, Dubai, and Singapore, and the Maison experience rivals the best in the world. Their market intelligence gave us confidence, and their relationship-driven approach made us feel like their only client. We have since referred three families.",
    name: "Maria Elena Vasquez-Torres",
    title: "Principal, Vasquez Family Office",
    location: "Brickell",
    transactionValue: "$16.2M",
    rating: 5,
  },
  {
    quote:
      "The pre-construction advisory from Maison was invaluable. They identified a development opportunity in Edgewater 18 months before the general market, securing our position at founding pricing. The projected appreciation has already exceeded initial estimates by 40%.",
    name: "David & Sarah Chen",
    title: "Co-Founders, Meridian Ventures",
    location: "Edgewater",
    transactionValue: "$9.8M",
    rating: 5,
  },
]

const pressLogos = [
  { name: "The Wall Street Journal", abbr: "WSJ" },
  { name: "Financial Times", abbr: "FT" },
  { name: "Robb Report", abbr: "ROBB" },
  { name: "Mansion Global", abbr: "MG" },
  { name: "Bloomberg", abbr: "BLOOM" },
  { name: "Forbes", abbr: "FORBES" },
]

const awards = [
  {
    year: "2025",
    title: "Best Luxury Brokerage",
    org: "International Property Awards",
  },
  {
    year: "2025",
    title: "Top 1% Worldwide",
    org: "Christie's International Real Estate",
  },
  {
    year: "2024",
    title: "Excellence in Client Service",
    org: "Luxury Portfolio International",
  },
  {
    year: "2024",
    title: "Most Innovative Firm",
    org: "Inman Luxury Connect",
  },
]

export function TestimonialsAndPress() {
  const [activeIdx, setActiveIdx] = useState(0)

  const next = () =>
    setActiveIdx((prev) => (prev + 1) % testimonials.length)
  const prev = () =>
    setActiveIdx(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )

  const active = testimonials[activeIdx]

  return (
    <section className="border-t border-border bg-background">
      {/* Testimonials */}
      <div className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Header */}
          <div className="mb-16 flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span
                className="text-xs tracking-[0.4em] text-gold uppercase"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Client Voices
              </span>
              <span className="h-px w-8 bg-gold" />
            </div>
            <h2 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Trusted by the{" "}
              <span className="italic text-gold">Extraordinary</span>
            </h2>
          </div>

          {/* Testimonial Card */}
          <div className="relative mx-auto max-w-4xl">
            <Quote className="mx-auto mb-8 h-10 w-10 text-gold/20" />

            <blockquote className="text-center">
              <p className="text-xl font-light leading-relaxed tracking-wide text-foreground sm:text-2xl lg:text-[1.65rem] lg:leading-relaxed">
                &ldquo;{active.quote}&rdquo;
              </p>
            </blockquote>

            {/* Rating */}
            <div className="mt-8 flex items-center justify-center gap-1">
              {Array.from({ length: active.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-gold text-gold"
                />
              ))}
            </div>

            {/* Attribution */}
            <div className="mt-6 flex flex-col items-center gap-1">
              <span className="text-lg font-medium tracking-wide text-foreground">
                {active.name}
              </span>
              <span
                className="text-sm text-muted-foreground"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {active.title}
              </span>
              <div
                className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground/60"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                <span>{active.location}</span>
                <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/30" />
                <span>{active.transactionValue} Transaction</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center border border-charcoal/15 text-charcoal/40 transition-all duration-300 hover:border-gold hover:text-gold"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`h-1.5 transition-all duration-500 ${
                      activeIdx === i
                        ? "w-8 bg-gold"
                        : "w-1.5 rounded-full bg-charcoal/15"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center border border-charcoal/15 text-charcoal/40 transition-all duration-300 hover:border-gold hover:text-gold"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Press & Awards */}
      <div id="press" className="border-t border-border bg-secondary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Featured In */}
          <div className="mb-12">
            <p
              className="mb-8 text-center text-[11px] tracking-[0.3em] text-muted-foreground/60 uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              As Featured In
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
              {pressLogos.map((logo) => (
                <span
                  key={logo.name}
                  className="text-lg font-medium tracking-[0.15em] text-muted-foreground/30 transition-colors duration-300 hover:text-muted-foreground/60 sm:text-xl"
                >
                  {logo.abbr}
                </span>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="border-t border-border pt-12">
            <p
              className="mb-8 text-center text-[11px] tracking-[0.3em] text-muted-foreground/60 uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Awards & Recognition
            </p>
            <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
              {awards.map((award) => (
                <div
                  key={award.title}
                  className="bg-background p-6 text-center transition-all duration-300 hover:bg-card"
                >
                  <span
                    className="block text-[11px] tracking-[0.2em] text-gold uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {award.year}
                  </span>
                  <span className="mt-2 block text-base font-medium tracking-tight text-foreground">
                    {award.title}
                  </span>
                  <span
                    className="mt-1 block text-[11px] text-muted-foreground"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {award.org}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
