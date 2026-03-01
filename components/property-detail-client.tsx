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
  Gem,
  Shield,
  TrendingUp,
  Thermometer,
  Wifi,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AIConcierge } from "@/components/ai-concierge"
import { CinemaText, CinemaBlock } from "@/components/cinema-text"
import { LiveSync } from "@/components/live-sync"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useEliteFilter } from "@/hooks/use-elite-filter"

const ease = [0.22, 1, 0.36, 1] as const

export interface StaticListing {
  slug: string
  title: string
  address: string
  neighborhood: string
  price: string
  beds: number
  baths: number
  sqft: string
  style: string
  image: string
  tag: string
}

const materialDetails: Record<string, { materials: { name: string; origin: string; detail: string }[]; smartHome: string[]; investmentThesis: string }> = {
  default: {
    materials: [
      { name: "Statuario Marble", origin: "Carrara, Italy", detail: "Hand-selected slabs with continuous veining across primary living areas. Honed finish in living spaces, polished in wet rooms." },
      { name: "French White Oak", origin: "Burgundy, France", detail: "FSC-certified, quarter-sawn engineered flooring. 7-inch plank width, wire-brushed and oil-finished with acoustic underlayment." },
      { name: "Brushed Platinum Fixtures", origin: "Dornbracht, Germany", detail: "MEM and Tara collections. PVD-coated brass for lifetime corrosion resistance. Integrated temperature memory." },
      { name: "Guardian Glass", origin: "Luxembourg", detail: "Triple-pane low-E glass with argon fill. UV rejection exceeding 99%. Acoustic STC rating of 42." },
    ],
    smartHome: [
      "Savant Pro integrated across all zones with voice, touch, and geofence activation",
      "Lutron Ketra biodynamic lighting with circadian rhythm programming",
      "Sonos Architectural in-ceiling and in-wall speakers, 7.2.4 Dolby Atmos in media room",
      "Verkada enterprise-grade security with facial recognition and 365-day cloud retention",
    ],
    investmentThesis: "Miami's luxury real estate market continues to outperform traditional asset classes with 14.2% annualized returns for waterfront properties. Zero state income tax, homestead exemption, and sustained international demand create a structurally favorable environment for capital preservation and appreciation.",
  },
}

export function PropertyDetailClient({ listing }: { listing: StaticListing }) {
  const { isEliteApple } = useEliteFilter()
  const specs = materialDetails.default

  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="relative flex min-h-[70svh] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-48 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <span className="mb-4 inline-block border border-cream/30 bg-cream/10 px-4 py-1.5 font-sans text-[10px] tracking-[0.2em] text-cream uppercase backdrop-blur-sm">
              {listing.tag}
            </span>
            <h1 className="font-serif text-4xl font-light tracking-tight text-cream sm:text-6xl lg:text-7xl">
              {listing.title}
            </h1>
            <div className="mt-4 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" />
              <span className="font-sans text-sm tracking-wide text-cream/70">
                {listing.address}
              </span>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-6 font-sans text-sm text-cream/60">
              <span className="flex items-center gap-1.5">
                <BedDouble className="h-4 w-4 text-gold/60" />
                {listing.beds} Bedrooms
              </span>
              <span className="flex items-center gap-1.5">
                <Bath className="h-4 w-4 text-gold/60" />
                {listing.baths} Bathrooms
              </span>
              <span className="flex items-center gap-1.5">
                <Maximize className="h-4 w-4 text-gold/60" />
                {listing.sqft} SF
              </span>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <span className="font-serif text-4xl font-light text-gold">
                {listing.price}
              </span>
              <Link
                href="/#schedule"
                className="inline-flex items-center gap-2 bg-gold px-8 py-4 font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
              >
                Request Private Viewing
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <LiveSync variant="dark" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Material Specifications */}
      <section className="border-t border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="mb-16">
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
            </div>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-2">
            {specs.materials.map((mat, i) => (
              <CinemaBlock key={mat.name} delay={i * 0.1}>
                <div className="group h-full border border-border/50 bg-card p-8 transition-all duration-500 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/[0.04]">
                  <div className="mb-4 flex items-center gap-2">
                    <Gem className="h-4 w-4 text-gold/60" />
                    <h3 className="font-serif text-xl font-medium text-foreground">
                      {mat.name}
                    </h3>
                  </div>
                  <span className="block font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
                    {mat.origin}
                  </span>
                  <p className="mt-4 font-geist text-sm leading-relaxed text-muted-foreground">
                    {mat.detail}
                  </p>
                </div>
              </CinemaBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Home */}
      <section className="border-t border-border bg-charcoal py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                  Integrated Intelligence
                </span>
                <span className="h-px w-8 bg-gold" />
              </div>
              <h2 className="font-serif text-4xl font-light tracking-tight text-cream sm:text-5xl">
                Smart Home <span className="italic text-gold">Ecosystem</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {specs.smartHome.map((tech, i) => {
              const icons = [Wifi, Thermometer, Shield, Shield]
              const Icon = icons[i % icons.length]
              return (
                <CinemaBlock key={i} delay={i * 0.1}>
                  <div className="flex items-start gap-4 border border-cream/10 bg-charcoal-light p-6 transition-all duration-500 hover:border-gold/20">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold/50" />
                    <p className="font-geist text-sm leading-relaxed text-cream/60">
                      {tech}
                    </p>
                  </div>
                </CinemaBlock>
              )
            })}
          </div>
        </div>
      </section>

      {/* Investment Thesis */}
      <section className="border-t border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <ScrollReveal>
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                Investment Perspective
              </span>
              <span className="h-px w-8 bg-gold" />
            </div>
            <h2 className="font-serif text-3xl font-light tracking-tight text-foreground sm:text-4xl">
              AI-Generated <span className="italic text-gold">Insights</span>
            </h2>
            <div className="mx-auto mt-8 border border-gold/15 bg-gold/5 p-8">
              <TrendingUp className="mx-auto mb-4 h-6 w-6 text-gold/60" />
              <CinemaText
                text={specs.investmentThesis}
                className="font-geist text-base leading-relaxed text-foreground/80"
                wordDelay={0.015}
              />
            </div>
            {isEliteApple && (
              <p className="mx-auto mt-6 font-geist text-[10px] tracking-[0.12em] text-muted-foreground/40 uppercase">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" />
                Elite Device Detected. Full investment deck available on request.
              </p>
            )}
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
