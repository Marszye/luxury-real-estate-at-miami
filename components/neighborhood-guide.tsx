"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, MapPin } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const neighborhoods = [
  {
    name: "Fisher Island",
    slug: "fisher-island",
    image: "/images/listing-1.jpg",
    avgPrice: "$12.5M",
    pricePerSqft: "$2,100",
    listings: 14,
    description:
      "America's wealthiest ZIP code. An ultra-exclusive private island accessible only by ferry or yacht, home to billionaires and global elites seeking ultimate privacy.",
    highlights: ["Private beach club", "Championship golf", "Deep-water marina"],
    mapX: 72,
    mapY: 68,
  },
  {
    name: "Miami Beach",
    slug: "miami-beach",
    image: "/images/neighborhood-miami-beach.jpg",
    avgPrice: "$8.2M",
    pricePerSqft: "$1,650",
    listings: 28,
    description:
      "Where Art Deco heritage meets contemporary luxury. Oceanfront living with world-class dining, cultural venues, and the iconic Collins Avenue shopping district.",
    highlights: ["Oceanfront estates", "Art Basel district", "Fine dining corridor"],
    mapX: 78,
    mapY: 30,
  },
  {
    name: "Brickell",
    slug: "brickell",
    image: "/images/neighborhood-brickell.jpg",
    avgPrice: "$4.8M",
    pricePerSqft: "$1,200",
    listings: 42,
    description:
      "Miami's financial heart and the fastest-growing luxury condo market in the Southeast. Sky-high penthouses with panoramic Biscayne Bay and city skyline views.",
    highlights: ["Financial district", "Rooftop amenities", "Walking lifestyle"],
    mapX: 48,
    mapY: 52,
  },
  {
    name: "Coconut Grove",
    slug: "coconut-grove",
    image: "/images/neighborhood-coconut-grove.jpg",
    avgPrice: "$6.5M",
    pricePerSqft: "$1,350",
    listings: 19,
    description:
      "Miami's original neighborhood. A lush, bohemian-chic enclave with bayfront estates, world-class sailing, and a vibrant village atmosphere unlike anywhere else in the city.",
    highlights: ["Bayfront living", "Historic charm", "Sailing culture"],
    mapX: 38,
    mapY: 72,
  },
  {
    name: "Coral Gables",
    slug: "coral-gables",
    image: "/images/neighborhood-coral-gables.jpg",
    avgPrice: "$5.9M",
    pricePerSqft: "$1,150",
    listings: 23,
    description:
      "The City Beautiful. Mediterranean Revival architecture, lush tree-lined boulevards, and the legendary Biltmore Hotel define this prestigious residential enclave.",
    highlights: ["Mediterranean estates", "Top-rated schools", "Biltmore area"],
    mapX: 25,
    mapY: 62,
  },
  {
    name: "Star Island",
    slug: "star-island",
    image: "/images/listing-3.jpg",
    avgPrice: "$45M",
    pricePerSqft: "$3,200",
    listings: 3,
    description:
      "The pinnacle of Miami luxury. A gated island community in Biscayne Bay with only 35 mansions, home to celebrities, tech moguls, and heads of state.",
    highlights: ["Ultra-exclusive gated", "360-degree water views", "3 listings only"],
    mapX: 62,
    mapY: 42,
  },
]

const ease = [0.22, 1, 0.36, 1] as const

export function NeighborhoodGuide() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [hoveredPin, setHoveredPin] = useState<number | null>(null)
  const active = neighborhoods[activeIdx]

  return (
    <section
      id="neighborhoods"
      className="border-t border-border bg-secondary py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal>
          <div className="mb-16 flex flex-col items-start lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="text-xs tracking-[0.4em] text-gold uppercase font-sans">
                  Neighborhood Guide
                </span>
              </div>
              <h2 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance font-serif">
                Explore Miami&apos;s{" "}
                <span className="italic text-gold">Finest</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground font-sans">
                Each neighborhood has its own character and appeal. Our local
                expertise helps you find not just a property, but a lifestyle that
                matches your vision.
              </p>
            </div>
            <Link
              href="/neighborhoods"
              className="mt-8 inline-flex items-center gap-2 border border-charcoal/20 px-8 py-3 text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:border-gold hover:bg-gold hover:text-cream lg:mt-0 font-sans"
            >
              View All Neighborhoods
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          {/* Left: Interactive Map */}
          <div className="flex flex-col gap-6">
            {/* SVG Map */}
            <div className="relative aspect-square overflow-hidden border border-border bg-card">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03),transparent_60%)]" />
              {/* Stylized map grid */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
                {/* Water areas */}
                <rect x="55" y="0" width="45" height="100" fill="rgba(212,175,55,0.03)" />
                <path d="M55,0 Q70,25 60,50 Q50,75 55,100 L100,100 L100,0 Z" fill="rgba(212,175,55,0.05)" stroke="rgba(212,175,55,0.08)" strokeWidth="0.3" />
                {/* Grid lines */}
                {[20, 40, 60, 80].map((v) => (
                  <g key={v}>
                    <line x1={v} y1="0" x2={v} y2="100" stroke="rgba(0,0,0,0.04)" strokeWidth="0.2" />
                    <line x1="0" y1={v} x2="100" y2={v} stroke="rgba(0,0,0,0.04)" strokeWidth="0.2" />
                  </g>
                ))}
                {/* Label */}
                <text x="82" y="50" fill="rgba(212,175,55,0.15)" fontSize="3" fontFamily="serif" textAnchor="middle" transform="rotate(90, 82, 50)">
                  BISCAYNE BAY
                </text>
              </svg>

              {/* Pins */}
              {neighborhoods.map((nb, i) => (
                <motion.button
                  key={nb.name}
                  className="absolute z-10"
                  style={{ left: `${nb.mapX}%`, top: `${nb.mapY}%`, transform: "translate(-50%, -50%)" }}
                  onClick={() => setActiveIdx(i)}
                  onMouseEnter={() => setHoveredPin(i)}
                  onMouseLeave={() => setHoveredPin(null)}
                  whileHover={{ scale: 1.3 }}
                >
                  <div className={`relative flex h-5 w-5 items-center justify-center transition-all duration-300 ${
                    activeIdx === i ? "scale-125" : ""
                  }`}>
                    {activeIdx === i && (
                      <motion.div
                        layoutId="active-pin-ring"
                        className="absolute h-8 w-8 rounded-full border border-gold/40"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <div className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                      activeIdx === i
                        ? "border-gold bg-gold shadow-[0_0_12px_rgba(212,175,55,0.5)]"
                        : "border-gold/60 bg-gold/30"
                    }`} />
                  </div>

                  {/* Hover Tooltip */}
                  <AnimatePresence>
                    {hoveredPin === i && activeIdx !== i && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 whitespace-nowrap border border-gold/20 bg-pearl px-3 py-1.5 shadow-lg"
                      >
                        <span className="font-sans text-[10px] tracking-wide text-charcoal">
                          {nb.name}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>

            {/* Neighborhood List */}
            <div className="flex flex-col gap-px bg-border">
              {neighborhoods.map((nb, i) => (
                <button
                  key={nb.name}
                  onClick={() => setActiveIdx(i)}
                  className={`group flex items-center justify-between px-5 py-3.5 text-left transition-all duration-300 ${
                    activeIdx === i
                      ? "bg-card border-l-2 border-l-gold"
                      : "bg-background border-l-2 border-l-transparent hover:bg-card"
                  }`}
                >
                  <div>
                    <span className={`block text-sm tracking-tight transition-colors duration-300 font-serif ${
                      activeIdx === i ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {nb.name}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-muted-foreground font-sans">
                      From {nb.avgPrice}
                    </span>
                  </div>
                  <ArrowUpRight className={`h-3.5 w-3.5 transition-all duration-300 ${
                    activeIdx === i ? "text-gold translate-x-0.5 -translate-y-0.5" : "text-muted-foreground/20"
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Active Neighborhood Detail */}
          <div className="relative overflow-hidden bg-card">
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
                  <span className="text-2xl font-light tracking-tight sm:text-3xl font-serif">
                    {active.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <p className="text-sm leading-relaxed text-muted-foreground font-sans">
                {active.description}
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6">
                <div>
                  <span className="block text-xl font-light text-foreground lg:text-2xl">
                    {active.avgPrice}
                  </span>
                  <span className="mt-0.5 block text-[10px] tracking-[0.15em] text-muted-foreground uppercase font-sans">
                    Avg. Price
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-light text-foreground lg:text-2xl">
                    {active.pricePerSqft}
                  </span>
                  <span className="mt-0.5 block text-[10px] tracking-[0.15em] text-muted-foreground uppercase font-sans">
                    Per Sq Ft
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-light text-foreground lg:text-2xl">
                    {active.listings}
                  </span>
                  <span className="mt-0.5 block text-[10px] tracking-[0.15em] text-muted-foreground uppercase font-sans">
                    Active Listings
                  </span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {active.highlights.map((h) => (
                  <span
                    key={h}
                    className="border border-gold/15 bg-gold/5 px-3 py-1.5 text-[11px] tracking-wide text-foreground font-sans"
                  >
                    {h}
                  </span>
                ))}
              </div>
              <Link
                href={`/neighborhoods#${active.slug}`}
                className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.15em] text-gold uppercase transition-all duration-300 hover:gap-3 font-sans"
              >
                View {active.name} Details
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
