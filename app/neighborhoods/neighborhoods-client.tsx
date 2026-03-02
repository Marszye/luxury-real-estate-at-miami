"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  MapPin,
  TrendingUp,
  Building2,
  Gem,
  Shield,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AIConciergeLazy as AIConcierge } from "@/components/ai-concierge-lazy"
import { CinemaText, CinemaBlock } from "@/components/cinema-text"
import { LiveSync } from "@/components/live-sync"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useEliteFilter } from "@/hooks/use-elite-filter"

const ease = [0.22, 1, 0.36, 1] as const

const neighborhoods = [
  {
    id: "brickell",
    name: "Brickell",
    tagline: "The Financial Epicenter",
    image: "/images/neighborhood-brickell.jpg",
    avgPrice: "$4.8M",
    pricePerSqft: "$1,420",
    roi: "12.4%",
    inventory: "2.1 mo",
    listings: 42,
    architecturalDna:
      "Post-modern glass towers by Arquitectonica, SOM, and OMA define the skyline. Floor-to-ceiling curtain walls, cantilevered sky pools, and vertically integrated lifestyle amenities. The architectural language is vertical ambition.",
    lifestyleVibe:
      "Morning espresso at Brickell City Centre, afternoon meetings at the new Citadel HQ, evening cocktails 60 floors above Biscayne Bay. A walkable urban core where finance, fashion, and culture converge within a 10-minute radius.",
    roiInsight:
      "Citadel HQ relocation complete. Brightline terminal within 0.3mi. Institutional capital inflow from Northeast driving 18.4% YoY growth in the premium tier. Supply pipeline tightening through 2028.",
    highlights: ["Citadel HQ corridor", "Brightline connectivity", "Rooftop amenities", "Walking lifestyle"],
  },
  {
    id: "design-district",
    name: "Miami Design District",
    tagline: "Where Art Becomes Architecture",
    image: "/images/listing-4.jpg",
    avgPrice: "$6.2M",
    pricePerSqft: "$1,680",
    roi: "14.2%",
    inventory: "1.9 mo",
    listings: 18,
    architecturalDna:
      "Curated by Craig Robins and designed by OMA, Sou Fujimoto, and Aranda/Lasch. The district is a living gallery: geometric facades, public art installations, and boutique residences that blur the line between dwelling and museum.",
    lifestyleVibe:
      "Browse ICA Miami before lunch at Swan. Walk to Louis Vuitton, Dior, and Chrome Hearts. Evening openings at primary galleries. The district attracts those who collect both art and real estate as expressions of identity.",
    roiInsight:
      "High-Aesthetic Value Peak. Art Basel spillover demand accelerating. Youngest median buyer age in Miami-Dade. Pre-construction momentum driving 14.2% projected growth. Luxury retail density creates a self-reinforcing value loop.",
    highlights: ["ICA Miami adjacent", "Primary gallery corridor", "Luxury retail", "Art Basel epicenter"],
  },
  {
    id: "star-island",
    name: "Star Island",
    tagline: "The Ultimate Trophy Address",
    image: "/images/listing-3.jpg",
    avgPrice: "$45M",
    pricePerSqft: "$3,200",
    roi: "9.7%",
    inventory: "4.2 mo",
    listings: 3,
    architecturalDna:
      "Mediterranean Revival estates by Maurice Fatio share the island with contemporary masterworks by Kobi Karp and Chad Oppenheim. Lots range from 30,000 to 75,000 SF. No two properties share a design language, each is a private compound.",
    lifestyleVibe:
      "Arrive by private ferry. Dedicated security at the single gated entry point. 360-degree Biscayne Bay views from every lot. Neighbors include tech founders, entertainers, and sovereign wealth principals. Privacy is the ultimate currency.",
    roiInsight:
      "Zero new supply pipeline through 2028. Only 35 properties exist on the island. Median buyer net worth exceeds $120M. Ferry-only access preserves exclusivity. Trophy asset scarcity drives consistent appreciation.",
    highlights: ["35 estates total", "Ferry-only access", "360° water views", "Sovereign-level privacy"],
  },
  {
    id: "fisher-island",
    name: "Fisher Island",
    tagline: "America's Wealthiest ZIP Code",
    image: "/images/listing-1.jpg",
    avgPrice: "$12.5M",
    pricePerSqft: "$2,100",
    roi: "9.0%",
    inventory: "4.5 mo",
    listings: 14,
    architecturalDna:
      "A curated collection of mid-rise condominiums and single-family estates on a 216-acre private island. Architecture ranges from Vanderbilt-era Mediterranean to contemporary glass residences. Deep-water marina accommodates superyachts to 250ft.",
    lifestyleVibe:
      "Private beach club, championship golf course, and a resident population that values discretion above all. Accessible only by private ferry or helicopter. Average household income exceeds $2.5M annually.",
    roiInsight:
      "Consistently the highest-income ZIP code in the United States. Limited turnover creates extreme scarcity. International buyer demand remains robust. Homestead exemption protects primary residence equity.",
    highlights: ["Private beach club", "Championship golf", "Deep-water marina", "Helicopter access"],
  },
  {
    id: "coconut-grove",
    name: "Coconut Grove",
    tagline: "Bayfront Heritage",
    image: "/images/neighborhood-coconut-grove.jpg",
    avgPrice: "$6.5M",
    pricePerSqft: "$1,350",
    roi: "10.0%",
    inventory: "3.1 mo",
    listings: 19,
    architecturalDna:
      "Banyan-canopied streets lined with Mediterranean estates, mid-century modern gems, and contemporary new builds. The Grove Harbour development by Terra introduces a new waterfront vernacular. Mature landscapes create a sense of established permanence.",
    lifestyleVibe:
      "Miami's original neighborhood. World-class sailing from the Coconut Grove Sailing Club. Vizcaya Museum at the doorstep. Farm-to-table dining at Leku. A village atmosphere where old Miami charm meets contemporary sophistication.",
    roiInsight:
      "Established luxury with upside. New development by Terra and Related Group adding modern inventory. Proximity to UM and Brickell creates dual demand drivers. Family-oriented buyer profile supports long-term holds.",
    highlights: ["Bayfront living", "Vizcaya adjacent", "Sailing culture", "Village atmosphere"],
  },
  {
    id: "edgewater",
    name: "Edgewater & Wynwood",
    tagline: "The Creative Frontier",
    image: "/images/listing-2.jpg",
    avgPrice: "$3.2M",
    pricePerSqft: "$980",
    roi: "15.0%",
    inventory: "1.8 mo",
    listings: 56,
    architecturalDna:
      "Eight pre-construction towers breaking ground redefine the waterfront. Developers include OKO Group, Related, and Melo. Architecture by Bjarke Ingels, Rem Koolhaas, and Carlos Ott. The corridor is the laboratory for Miami's next architectural chapter.",
    lifestyleVibe:
      "Gallery hopping in Wynwood meets waterfront living in Edgewater. The youngest median buyer age in the county. Tech startup energy, contemporary art galleries, and craft cocktail culture define the social fabric.",
    roiInsight:
      "Highest projected ROI in Miami-Dade at 15%. Pre-construction pricing offers asymmetric upside. Art Basel spillover and tech sector relocation are primary demand catalysts. Value-add opportunity with institutional backing.",
    highlights: ["Pre-construction upside", "Art Basel spillover", "Tech corridor", "Waterfront premium"],
  },
]

export function NeighborhoodsClient() {
  const { isEliteApple } = useEliteFilter()

  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="relative flex min-h-[60svh] flex-col items-center justify-center overflow-hidden bg-charcoal px-6 pt-36 pb-20 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06),transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mb-8 inline-flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold" />
            <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
              Neighborhood Intelligence
            </span>
            <span className="h-px w-8 bg-gold" />
          </motion.div>

          <CinemaText
            text="Miami's Finest Addresses"
            as="h1"
            className="font-serif text-5xl font-light tracking-tight text-cream sm:text-7xl lg:text-[5.5rem]"
            delay={0.4}
            wordDelay={0.12}
          />
          <CinemaText
            text="Proprietary intelligence on every micro-market. Architectural DNA, lifestyle profiles, and ROI projections for the discerning investor."
            as="p"
            className="mx-auto mt-8 max-w-3xl font-geist text-base leading-relaxed text-cream/60 sm:text-lg"
            delay={0.8}
            wordDelay={0.02}
          />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease }}
            className="mt-10 flex justify-center"
          >
            <LiveSync variant="dark" />
          </motion.div>
        </div>
      </section>

      {/* Neighborhood Deep-Dives */}
      {neighborhoods.map((nb, idx) => (
        <section
          key={nb.id}
          id={nb.id}
          className={`border-t border-border py-24 lg:py-32 ${
            idx % 2 === 0 ? "bg-background" : "bg-charcoal"
          }`}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className={`grid gap-12 lg:grid-cols-2 ${idx % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>
              {/* Image */}
              <ScrollReveal direction={idx % 2 === 0 ? "left" : "right"}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={nb.image}
                    alt={`${nb.name} neighborhood, Miami`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gold" />
                    <span className="font-serif text-2xl font-light tracking-tight text-cream">
                      {nb.name}
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Content */}
              <ScrollReveal
                direction={idx % 2 === 0 ? "right" : "left"}
                delay={0.15}
              >
                <div className="mb-6 inline-flex items-center gap-3">
                  <span className="h-px w-8 bg-gold" />
                  <span className={`font-sans text-xs tracking-[0.4em] text-gold uppercase`}>
                    {nb.tagline}
                  </span>
                </div>
                <h2 className={`font-serif text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl ${
                  idx % 2 === 0 ? "text-foreground" : "text-cream"
                }`}>
                  {nb.name}
                </h2>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { label: "Avg. Price", value: nb.avgPrice, icon: Building2 },
                    { label: "Per SF", value: nb.pricePerSqft, icon: Gem },
                    { label: "Projected ROI", value: nb.roi, icon: TrendingUp },
                    { label: "Inventory", value: nb.inventory, icon: Shield },
                  ].map((stat) => {
                    const Icon = stat.icon
                    return (
                      <div key={stat.label}>
                        <Icon className="mb-2 h-4 w-4 text-gold/50" />
                        <span className={`block font-serif text-xl font-light ${
                          idx % 2 === 0 ? "text-foreground" : "text-cream"
                        }`}>
                          {stat.value}
                        </span>
                        <span className={`mt-0.5 block font-geist text-[10px] tracking-[0.15em] uppercase ${
                          idx % 2 === 0 ? "text-muted-foreground" : "text-cream/40"
                        }`}>
                          {stat.label}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Architectural DNA */}
                <div className={`mt-8 border-t pt-8 ${
                  idx % 2 === 0 ? "border-border" : "border-cream/10"
                }`}>
                  <h3 className={`mb-3 font-serif text-sm font-medium tracking-wide ${
                    idx % 2 === 0 ? "text-gold" : "text-gold"
                  }`}>
                    Architectural DNA
                  </h3>
                  <p className={`font-geist text-sm leading-relaxed ${
                    idx % 2 === 0 ? "text-muted-foreground" : "text-cream/60"
                  }`}>
                    {nb.architecturalDna}
                  </p>
                </div>

                {/* Lifestyle */}
                <div className="mt-6">
                  <h3 className="mb-3 font-serif text-sm font-medium tracking-wide text-gold">
                    Lifestyle Profile
                  </h3>
                  <p className={`font-geist text-sm leading-relaxed ${
                    idx % 2 === 0 ? "text-muted-foreground" : "text-cream/60"
                  }`}>
                    {nb.lifestyleVibe}
                  </p>
                </div>

                {/* ROI Insight */}
                <div className={`mt-6 border p-5 ${
                  idx % 2 === 0
                    ? "border-gold/15 bg-gold/5"
                    : "border-gold/20 bg-gold/5"
                }`}>
                  <span className="mb-2 block font-sans text-[9px] tracking-[0.2em] text-gold/60 uppercase">
                    Investment Thesis
                  </span>
                  <p className={`font-geist text-sm leading-relaxed ${
                    idx % 2 === 0 ? "text-foreground" : "text-cream/80"
                  }`}>
                    {nb.roiInsight}
                  </p>
                </div>

                {/* Highlights */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {nb.highlights.map((h) => (
                    <span
                      key={h}
                      className={`border px-3 py-1.5 font-geist text-[11px] tracking-wide ${
                        idx % 2 === 0
                          ? "border-gold/15 bg-gold/5 text-foreground"
                          : "border-gold/20 bg-gold/5 text-cream/80"
                      }`}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <Link
                  href="/#properties"
                  className="mt-8 inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] text-gold uppercase transition-all duration-300 hover:gap-3"
                >
                  View {nb.name} Properties
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="border-t border-border bg-charcoal py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <ScrollReveal>
            <CinemaText
              text="Every Neighborhood Tells a Different Story"
              as="h2"
              className="font-serif text-3xl font-light tracking-tight text-cream sm:text-4xl lg:text-5xl"
              wordDelay={0.06}
            />
            <p className="mx-auto mt-8 max-w-2xl font-geist text-base leading-relaxed text-cream/50">
              Our advisors have lived, invested, and built relationships
              across every micro-market in Miami-Dade. Whether you seek
              trophy asset scarcity or pre-construction upside, the
              conversation starts here.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/#schedule"
                className="inline-flex items-center gap-2 bg-gold px-10 py-4 font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
              >
                Schedule Neighborhood Tour
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/market-intelligence"
                className="inline-flex items-center gap-2 border border-cream/20 px-10 py-4 font-sans text-xs tracking-[0.2em] text-cream uppercase transition-all duration-500 hover:border-gold hover:text-gold"
              >
                Market Intelligence
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {isEliteApple && (
              <p className="mx-auto mt-6 font-geist text-[10px] tracking-[0.12em] text-cream/30 uppercase">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" />
                Elite Device Detected. Personalized recommendations available.
              </p>
            )}
            <div className="mt-8 flex justify-center">
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
