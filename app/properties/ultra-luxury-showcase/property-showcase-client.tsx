"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Wifi,
  Shield,
  Thermometer,
  Gem,
  Layers,
  Sparkles,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AIConciergeLazy as AIConcierge } from "@/components/ai-concierge-lazy"
import { CinemaText, CinemaBlock } from "@/components/cinema-text"
import { LiveSync } from "@/components/live-sync"
import { ScrollReveal } from "@/components/scroll-reveal"

const ease = [0.22, 1, 0.36, 1] as const

const materialSpecs = [
  {
    name: "Statuario Marble",
    origin: "Carrara, Italy",
    application: "Primary flooring, master bath walls, kitchen island cladding",
    detail:
      "Quarried from the Apuan Alps. Each slab is hand-selected for vein continuity across the residence. Calacatta-grade whiteness with subtle grey veining. Honed finish in living areas, polished in wet zones.",
  },
  {
    name: "French White Oak",
    origin: "Burgundy region",
    application: "Engineered flooring, millwork, ceiling coffers",
    detail:
      "FSC-certified, quarter-sawn for dimensional stability. 7-inch plank width, wire-brushed and oil-finished. 20-year warranty against wear. Acoustic underlayment for sound dampening.",
  },
  {
    name: "Brushed Platinum Fixtures",
    origin: "Dornbracht, Germany",
    application: "All bathrooms, kitchen prep sink, bar",
    detail:
      "M Tara collection. PVD-coated brass for corrosion resistance. Integrated temperature memory. Wall-mounted in primary suite, deck-mounted elsewhere.",
  },
  {
    name: "Guardian SunGuard Glass",
    origin: "USA",
    application: "All exterior glazing",
    detail:
      "Hurricane-rated to 180 mph. Low-E coating, 99% UV rejection. Electrochromic option in primary suite for privacy. Acoustic laminate available.",
  },
]

const smartHomeSpecs = [
  {
    icon: Wifi,
    system: "Savant Pro",
    detail:
      "Full-residence automation. 34 zones. Lighting, climate, audio, shading, security unified. Voice, touch, and geofence activation. Apple HomeKit compatible.",
  },
  {
    icon: Shield,
    system: "Perimeter Security",
    detail:
      "Biometric entry, 4K surveillance with AI motion analysis. Private elevator with dual-factor authentication. Safe room integration.",
  },
  {
    icon: Thermometer,
    system: "Climate Intelligence",
    detail:
      "Daikin VRV with per-room humidity control. Learns preferences within 72 hours. Pre-conditions based on calendar and proximity.",
  },
]

const architecturalDna = [
  {
    trait: "Fluid Space",
    score: 94,
    description:
      "Thresholds are gradual transitions rather than hard boundaries. The residence breathes with diurnal rhythm. No principal room; the floor plate operates as a single spatial narrative.",
  },
  {
    trait: "Material Integrity",
    score: 98,
    description:
      "Every finish is traceable to source. No veneers where solid is specified. Provenance documentation accompanies the sale. 25-year material warranty on structural elements.",
  },
  {
    trait: "Technological Invisibility",
    score: 91,
    description:
      "Automation is present but unseen. No visible switches in primary living areas. Voice and proximity take precedence. Fail-safe manual override in every zone.",
  },
  {
    trait: "Environmental Responsiveness",
    score: 89,
    description:
      "Glazing orientation, overhangs, and landscaping calibrated for solar gain. Geothermal supplement. Rainwater harvesting for irrigation. LEED Gold target.",
  },
]

export function PropertyShowcaseClient() {
  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="relative flex min-h-[70svh] flex-col overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image
            src="/images/listing-1.jpg"
            alt="Ultra-Luxury Showcase Residence"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/40" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-24 pt-36 lg:px-10">
          <CinemaText
            text="Ultra-Luxury Showcase"
            as="h1"
            className="font-serif text-5xl font-light tracking-tight text-cream sm:text-6xl lg:text-7xl"
            delay={0.3}
            wordDelay={0.1}
          />
          <CinemaText
            text="Statuario Marble. Savant Smart Home. Architectural DNA."
            as="p"
            className="mt-4 font-sans text-base tracking-wide text-cream/70 sm:text-lg"
            delay={0.6}
            wordDelay={0.04}
          />
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold/60" />
              <span className="font-sans text-sm text-cream/60">
                7000 Fisher Island Drive, Miami
              </span>
            </div>
            <div className="flex items-center gap-6 font-sans text-sm text-cream/60">
              <span className="flex items-center gap-1.5">
                <BedDouble className="h-3.5 w-3.5 text-gold/60" />
                6 Beds
              </span>
              <span className="flex items-center gap-1.5">
                <Bath className="h-3.5 w-3.5 text-gold/60" />
                8 Baths
              </span>
              <span className="flex items-center gap-1.5">
                <Maximize className="h-3.5 w-3.5 text-gold/60" />
                11,400 SF
              </span>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <Link
              href="/#schedule"
              className="inline-flex items-center gap-2 bg-gold px-8 py-4 font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
            >
              Request Private Viewing
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <LiveSync variant="dark" />
          </div>
        </div>
      </section>

      {/* Material Specifications */}
      <section className="border-t border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="mb-20">
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                  Material Specifications
                </span>
              </div>
              <h2 className="font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl">
                Provenance &{" "}
                <span className="italic text-gold">Integrity</span>
              </h2>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground">
                Every finish is traceable to source. Documentation accompanies
                the sale. No compromises on material selection.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-2">
            {materialSpecs.map((mat, i) => (
              <CinemaBlock key={mat.name} delay={i * 0.1}>
                <div className="group h-full border border-border bg-card p-8 transition-all duration-500 hover:border-gold/20">
                  <div className="mb-4 flex items-center gap-2">
                    <Gem className="h-4 w-4 text-gold/60" />
                    <h3 className="font-serif text-xl font-medium text-foreground">
                      {mat.name}
                    </h3>
                  </div>
                  <span className="block font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
                    {mat.origin}
                  </span>
                  <p className="mt-2 font-sans text-sm font-medium text-muted-foreground">
                    {mat.application}
                  </p>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
                    {mat.detail}
                  </p>
                </div>
              </CinemaBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Home Savant */}
      <section className="border-t border-border bg-charcoal py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="mb-20 text-center">
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                  Integrated Intelligence
                </span>
                <span className="h-px w-8 bg-gold" />
              </div>
              <h2 className="font-serif text-4xl font-light tracking-tight text-cream sm:text-5xl">
                Smart Home <span className="italic text-gold">Savant</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-cream/50">
                Enterprise-grade automation. Invisible until needed. Voice, touch,
                and geofence activation across 34 zones.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-3">
            {smartHomeSpecs.map((tech, i) => {
              const Icon = tech.icon
              return (
                <CinemaBlock key={tech.system} delay={i * 0.12}>
                  <div className="group h-full border border-cream/10 bg-charcoal-light p-8 transition-all duration-500 hover:border-gold/20">
                    <Icon className="mb-6 h-6 w-6 text-gold/50 transition-colors duration-500 group-hover:text-gold" />
                    <h3 className="font-serif text-lg font-medium text-cream">
                      {tech.system}
                    </h3>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-cream/50">
                      {tech.detail}
                    </p>
                  </div>
                </CinemaBlock>
              )
            })}
          </div>
        </div>
      </section>

      {/* Architectural DNA Analysis */}
      <section className="border-t border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="mb-20">
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                  Proprietary Analysis
                </span>
              </div>
              <h2 className="font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl">
                Architectural <span className="italic text-gold">DNA</span>
              </h2>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground">
                A four-dimensional framework measuring the intangible qualities
                that define exceptional residential architecture. Scored on a
                100-point scale by our design advisory team.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-2">
            {architecturalDna.map((dna, i) => (
              <CinemaBlock key={dna.trait} delay={i * 0.1}>
                <div className="group border border-border bg-card p-8 transition-all duration-500 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/[0.03]">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-gold/60" />
                      <h3 className="font-serif text-xl font-medium text-foreground">
                        {dna.trait}
                      </h3>
                    </div>
                    <span className="font-serif text-3xl font-light text-gold">
                      {dna.score}
                    </span>
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {dna.description}
                  </p>
                </div>
              </CinemaBlock>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-16 border border-gold/20 bg-gold/5 p-10 text-center">
              <Sparkles className="mx-auto mb-4 h-8 w-8 text-gold/60" />
              <span className="block font-sans text-[10px] tracking-[0.3em] text-gold/60 uppercase">
                Composite DNA Score
              </span>
              <span className="mt-3 block font-serif text-6xl font-light text-gold">
                93
              </span>
              <span className="mt-2 block font-sans text-xs tracking-wide text-muted-foreground">
                Exceeds 95th percentile in our proprietary luxury database
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-charcoal py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <ScrollReveal>
            <CinemaText
              text="Every Acquisition Begins with a Conversation"
              as="h2"
              className="font-serif text-3xl font-light tracking-tight text-cream sm:text-4xl"
              wordDelay={0.06}
            />
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/#schedule"
                className="inline-flex items-center gap-2 bg-gold px-10 py-4 font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
              >
                Schedule Private Viewing
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/collection"
                className="inline-flex items-center gap-2 border border-cream/20 px-10 py-4 font-sans text-xs tracking-[0.2em] text-cream uppercase transition-all duration-500 hover:border-gold hover:text-gold"
              >
                View The Collection
              </Link>
            </div>
            <div className="mt-10 flex justify-center">
              <LiveSync variant="dark" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <AIConcierge />
    </main>
  )
}
