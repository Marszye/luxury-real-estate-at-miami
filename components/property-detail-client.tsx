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
  Layers,
  Compass,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AIConciergeLazy as AIConcierge } from "@/components/ai-concierge-lazy"
import { CinemaText, CinemaBlock } from "@/components/cinema-text"
import { LiveSync } from "@/components/live-sync"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useEliteFilter } from "@/hooks/use-elite-filter"
import { sanitizeForDisplay } from "@/lib/queries"
import type { ROIData, MaterialSpec, ArchitecturalDNA } from "@/lib/queries"

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
  luxuryDescription?: string
  roiData?: ROIData
  materialSpecs?: MaterialSpec[]
  architecturalDNA?: ArchitecturalDNA
}

const defaultMaterials = [
  { name: "Statuario Marble", origin: "Carrara, Italy", detail: "Hand-selected slabs with continuous veining across primary living areas. Honed finish in living spaces, polished in wet rooms." },
  { name: "French White Oak", origin: "Burgundy, France", detail: "FSC-certified, quarter-sawn engineered flooring. 7-inch plank width, wire-brushed and oil-finished with acoustic underlayment." },
  { name: "Brushed Platinum Fixtures", origin: "Dornbracht, Germany", detail: "MEM and Tara collections. PVD-coated brass for lifetime corrosion resistance. Integrated temperature memory." },
  { name: "Guardian Glass", origin: "Luxembourg", detail: "Triple-pane low-E glass with argon fill. UV rejection exceeding 99%. Acoustic STC rating of 42." },
]

const defaultSmartHome = [
  "Savant Pro integrated across all zones with voice, touch, and geofence activation",
  "Lutron Ketra biodynamic lighting with circadian rhythm programming",
  "Sonos Architectural in-ceiling and in-wall speakers, 7.2.4 Dolby Atmos in media room",
  "Verkada enterprise-grade security with facial recognition and 365-day cloud retention",
]

const defaultInvestmentThesis =
  "Miami's luxury real estate market continues to outperform traditional asset classes with 14.2% annualized returns for waterfront properties. Zero state income tax, homestead exemption, and sustained international demand create a structurally favorable environment for capital preservation and appreciation."

export function PropertyDetailClient({ listing }: { listing: StaticListing }) {
  const { isEliteApple } = useEliteFilter()

  const hasSanityMaterials = listing.materialSpecs && listing.materialSpecs.length > 0
  const materials = hasSanityMaterials
    ? listing.materialSpecs!.map((m) => ({
        name: m.material,
        origin: m.origin || "",
        detail: m.application || "",
      }))
    : defaultMaterials

  const hasROI = listing.roiData && (
    listing.roiData.annualReturn ||
    listing.roiData.appreciationRate ||
    listing.roiData.rentalYield ||
    listing.roiData.projectedGrowth
  )

  const investmentText = hasROI
    ? buildROIText(listing.roiData!)
    : defaultInvestmentThesis

  const hasArchDNA = listing.architecturalDNA && (
    listing.architecturalDNA.style ||
    listing.architecturalDNA.architect ||
    listing.architecturalDNA.designPhilosophy
  )

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

            {/* Luxury description — cinema text stream */}
            {listing.luxuryDescription && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-6 max-w-2xl"
              >
                <CinemaText
                  text={sanitizeForDisplay(listing.luxuryDescription)}
                  className="font-sans text-sm leading-relaxed text-cream/60 italic"
                  wordDelay={0.02}
                />
              </motion.div>
            )}

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

      {/* Architectural DNA */}
      {hasArchDNA && (
        <section className="border-t border-border bg-charcoal py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <ScrollReveal>
              <div className="mb-12">
                <div className="mb-6 inline-flex items-center gap-3">
                  <span className="h-px w-8 bg-gold" />
                  <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                    Architectural DNA
                  </span>
                  <span className="h-px w-8 bg-gold" />
                </div>
                <h2 className="font-serif text-4xl font-light tracking-tight text-cream sm:text-5xl">
                  Design{" "}
                  <span className="italic text-gold">Philosophy</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid gap-8 lg:grid-cols-2">
              <CinemaBlock delay={0}>
                <div className="space-y-6">
                  {listing.architecturalDNA!.style && (
                    <div className="flex items-start gap-4">
                      <Compass className="mt-0.5 h-5 w-5 shrink-0 text-gold/60" />
                      <div>
                        <span className="block font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
                          Style
                        </span>
                        <p className="mt-1 font-serif text-xl font-light text-cream">
                          {listing.architecturalDNA!.style}
                        </p>
                      </div>
                    </div>
                  )}
                  {listing.architecturalDNA!.architect && (
                    <div className="flex items-start gap-4">
                      <Layers className="mt-0.5 h-5 w-5 shrink-0 text-gold/60" />
                      <div>
                        <span className="block font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
                          Architect
                        </span>
                        <p className="mt-1 font-serif text-lg font-light text-cream">
                          {listing.architecturalDNA!.architect}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CinemaBlock>

              {listing.architecturalDNA!.designPhilosophy && (
                <CinemaBlock delay={0.15}>
                  <div className="border border-cream/10 bg-charcoal-light p-8">
                    <CinemaText
                      text={sanitizeForDisplay(listing.architecturalDNA!.designPhilosophy)}
                      className="font-geist text-sm leading-relaxed text-cream/60"
                      wordDelay={0.02}
                    />
                  </div>
                </CinemaBlock>
              )}
            </div>

            {listing.architecturalDNA!.signature_elements &&
              listing.architecturalDNA!.signature_elements.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-3">
                  {listing.architecturalDNA!.signature_elements.map((el, i) => (
                    <CinemaBlock key={i} delay={0.2 + i * 0.05}>
                      <span className="border border-gold/20 bg-gold/5 px-4 py-2 font-sans text-[11px] tracking-[0.1em] text-gold/80">
                        {el}
                      </span>
                    </CinemaBlock>
                  ))}
                </div>
              )}
          </div>
        </section>
      )}

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
            {materials.map((mat, i) => (
              <CinemaBlock key={mat.name} delay={i * 0.1}>
                <div className="group h-full border border-border/50 bg-card p-8 transition-all duration-500 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/[0.04]">
                  <div className="mb-4 flex items-center gap-2">
                    <Gem className="h-4 w-4 text-gold/60" />
                    <h3 className="font-serif text-xl font-medium text-foreground">
                      {mat.name}
                    </h3>
                  </div>
                  {mat.origin && (
                    <span className="block font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
                      {mat.origin}
                    </span>
                  )}
                  {mat.detail && (
                    <p className="mt-4 font-geist text-sm leading-relaxed text-muted-foreground">
                      {sanitizeForDisplay(mat.detail)}
                    </p>
                  )}
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
            {defaultSmartHome.map((tech, i) => {
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

      {/* ROI & Investment */}
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

            {/* ROI metrics from Sanity */}
            {hasROI && (
              <div className="mx-auto mt-8 grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
                {listing.roiData!.annualReturn != null && (
                  <CinemaBlock delay={0} className="bg-card p-6">
                    <span className="block font-serif text-2xl font-light text-gold">
                      {listing.roiData!.annualReturn}%
                    </span>
                    <span className="mt-1 block font-sans text-[11px] tracking-wide text-muted-foreground">
                      Annual Return
                    </span>
                  </CinemaBlock>
                )}
                {listing.roiData!.appreciationRate != null && (
                  <CinemaBlock delay={0.05} className="bg-card p-6">
                    <span className="block font-serif text-2xl font-light text-gold">
                      {listing.roiData!.appreciationRate}%
                    </span>
                    <span className="mt-1 block font-sans text-[11px] tracking-wide text-muted-foreground">
                      Appreciation Rate
                    </span>
                  </CinemaBlock>
                )}
                {listing.roiData!.rentalYield != null && (
                  <CinemaBlock delay={0.1} className="bg-card p-6">
                    <span className="block font-serif text-2xl font-light text-gold">
                      {listing.roiData!.rentalYield}%
                    </span>
                    <span className="mt-1 block font-sans text-[11px] tracking-wide text-muted-foreground">
                      Rental Yield
                    </span>
                  </CinemaBlock>
                )}
                {listing.roiData!.projectedGrowth && (
                  <CinemaBlock delay={0.15} className="bg-card p-6">
                    <span className="block font-serif text-lg font-light text-gold">
                      {listing.roiData!.projectedGrowth}
                    </span>
                    <span className="mt-1 block font-sans text-[11px] tracking-wide text-muted-foreground">
                      Projected Growth
                    </span>
                  </CinemaBlock>
                )}
              </div>
            )}

            <div className="mx-auto mt-8 border border-gold/15 bg-gold/5 p-8">
              <TrendingUp className="mx-auto mb-4 h-6 w-6 text-gold/60" />
              <CinemaText
                text={sanitizeForDisplay(investmentText)}
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

function buildROIText(roi: ROIData): string {
  const parts: string[] = []
  if (roi.annualReturn) {
    parts.push(
      `This property delivers a projected ${roi.annualReturn}% annual return on investment.`,
    )
  }
  if (roi.appreciationRate) {
    parts.push(
      `Historical appreciation data indicates a ${roi.appreciationRate}% year-over-year growth trajectory.`,
    )
  }
  if (roi.rentalYield) {
    parts.push(
      `Rental yield analysis projects ${roi.rentalYield}% net returns for discerning investors.`,
    )
  }
  if (roi.projectedGrowth) {
    parts.push(roi.projectedGrowth)
  }
  if (parts.length === 0) {
    return "Investment analysis is being prepared by our advisory team. Contact us for a comprehensive financial overview."
  }
  return parts.join(" ")
}
