"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight, MapPin } from "lucide-react"

const neighborhoods = [
  {
    name: "Fisher Island",
    image: "/images/listing-1.jpg",
    avgPrice: "$12.5M",
    pricePerSqft: "$2,100",
    listings: 14,
    description:
      "America's wealthiest ZIP code. An ultra-exclusive private island accessible only by ferry or yacht, home to billionaires and global elites seeking ultimate privacy.",
    highlights: ["Private beach club", "Championship golf", "Deep-water marina"],
  },
  {
    name: "Miami Beach",
    image: "/images/neighborhood-miami-beach.jpg",
    avgPrice: "$8.2M",
    pricePerSqft: "$1,650",
    listings: 28,
    description:
      "Where Art Deco heritage meets contemporary luxury. Oceanfront living with world-class dining, cultural venues, and the iconic Collins Avenue shopping district.",
    highlights: ["Oceanfront estates", "Art Basel district", "Fine dining corridor"],
  },
  {
    name: "Brickell",
    image: "/images/neighborhood-brickell.jpg",
    avgPrice: "$4.8M",
    pricePerSqft: "$1,200",
    listings: 42,
    description:
      "Miami's financial heart and the fastest-growing luxury condo market in the Southeast. Sky-high penthouses with panoramic Biscayne Bay and city skyline views.",
    highlights: ["Financial district", "Rooftop amenities", "Walking lifestyle"],
  },
  {
    name: "Coconut Grove",
    image: "/images/neighborhood-coconut-grove.jpg",
    avgPrice: "$6.5M",
    pricePerSqft: "$1,350",
    listings: 19,
    description:
      "Miami's original neighborhood. A lush, bohemian-chic enclave with bayfront estates, world-class sailing, and a vibrant village atmosphere unlike anywhere else in the city.",
    highlights: ["Bayfront living", "Historic charm", "Sailing culture"],
  },
  {
    name: "Coral Gables",
    image: "/images/neighborhood-coral-gables.jpg",
    avgPrice: "$5.9M",
    pricePerSqft: "$1,150",
    listings: 23,
    description:
      "The City Beautiful. Mediterranean Revival architecture, lush tree-lined boulevards, and the legendary Biltmore Hotel define this prestigious residential enclave.",
    highlights: ["Mediterranean estates", "Top-rated schools", "Biltmore area"],
  },
  {
    name: "Star Island",
    image: "/images/listing-3.jpg",
    avgPrice: "$45M",
    pricePerSqft: "$3,200",
    listings: 3,
    description:
      "The pinnacle of Miami luxury. A gated island community in Biscayne Bay with only 35 mansions, home to celebrities, tech moguls, and heads of state.",
    highlights: ["Ultra-exclusive gated", "360-degree water views", "3 listings only"],
  },
]

export function NeighborhoodGuide() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = neighborhoods[activeIdx]

  return (
    <section
      id="neighborhoods"
      className="border-t border-border bg-secondary py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span
                className="text-xs tracking-[0.4em] text-gold uppercase"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Neighborhood Guide
              </span>
            </div>
            <h2 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Explore Miami&apos;s{" "}
              <span className="italic text-gold">Finest</span>
            </h2>
            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Each neighborhood has its own character and appeal. Our local
              expertise helps you find not just a property, but a lifestyle that
              matches your vision.
            </p>
          </div>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 border border-charcoal/20 px-8 py-3 text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:border-gold hover:bg-gold hover:text-cream lg:mt-0"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Interactive Map
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Interactive Layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          {/* Left: Neighborhood List */}
          <div className="flex flex-col gap-px bg-border">
            {neighborhoods.map((nb, i) => (
              <button
                key={nb.name}
                onClick={() => setActiveIdx(i)}
                className={`group flex items-center justify-between px-6 py-5 text-left transition-all duration-300 ${
                  activeIdx === i
                    ? "bg-card border-l-2 border-l-gold"
                    : "bg-background border-l-2 border-l-transparent hover:bg-card"
                }`}
              >
                <div>
                  <span
                    className={`block text-lg tracking-tight transition-colors duration-300 ${
                      activeIdx === i
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {nb.name}
                  </span>
                  <span
                    className="mt-0.5 block text-xs text-muted-foreground"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    From {nb.avgPrice} &middot; {nb.listings} listings
                  </span>
                </div>
                <ArrowUpRight
                  className={`h-4 w-4 transition-all duration-300 ${
                    activeIdx === i
                      ? "text-gold translate-x-0.5 -translate-y-0.5"
                      : "text-muted-foreground/20"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right: Active Neighborhood Detail */}
          <div className="relative overflow-hidden bg-card">
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={active.image}
                alt={`${active.name} neighborhood, Miami`}
                fill
                className="object-cover transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-cream">
                  <MapPin className="h-4 w-4 text-gold" />
                  <span className="text-2xl font-light tracking-tight sm:text-3xl">
                    {active.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8">
              <p
                className="text-sm leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {active.description}
              </p>

              {/* Stats Row */}
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6">
                <div>
                  <span className="block text-xl font-light text-foreground lg:text-2xl">
                    {active.avgPrice}
                  </span>
                  <span
                    className="mt-0.5 block text-[10px] tracking-[0.15em] text-muted-foreground uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Avg. Price
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-light text-foreground lg:text-2xl">
                    {active.pricePerSqft}
                  </span>
                  <span
                    className="mt-0.5 block text-[10px] tracking-[0.15em] text-muted-foreground uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Per Sq Ft
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-light text-foreground lg:text-2xl">
                    {active.listings}
                  </span>
                  <span
                    className="mt-0.5 block text-[10px] tracking-[0.15em] text-muted-foreground uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Active Listings
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-6 flex flex-wrap gap-2">
                {active.highlights.map((h) => (
                  <span
                    key={h}
                    className="border border-gold/15 bg-gold/5 px-3 py-1.5 text-[11px] tracking-wide text-foreground"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#properties"
                className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.15em] text-gold uppercase transition-all duration-300 hover:gap-3"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                View {active.name} Properties
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
