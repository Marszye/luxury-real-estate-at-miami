"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  TrendingUp,
  Globe2,
  BarChart3,
  ArrowUpRight,
  Building2,
  Plane,
  Shield,
  Gem,
  Anchor,
  Palmtree,
  Wine,
  Activity,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AIConciergeLazy as AIConcierge } from "@/components/ai-concierge-lazy"
import { CinemaText, CinemaBlock } from "@/components/cinema-text"
import { LiveSync } from "@/components/live-sync"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useEliteFilter, eliteContent } from "@/hooks/use-elite-filter"

const ease = [0.22, 1, 0.36, 1] as const

const miami2026Forecast = [
  { district: "Brickell", roi: "12.4%", psf: "$1,420", inventory: "2.1 mo", trend: "12.4% Projected Growth" },
  { district: "Miami Design District", roi: "14.2%", psf: "$1,680", inventory: "1.9 mo", trend: "High-Aesthetic Value Peak" },
  { district: "Wynwood", roi: "15%", psf: "$980", inventory: "1.8 mo", trend: "Creative corridor expansion" },
  { district: "Edgewater", roi: "11%", psf: "$1,120", inventory: "2.4 mo", trend: "Waterfront premium" },
  { district: "Fisher Island", roi: "9%", psf: "$2,950", inventory: "4.2 mo", trend: "Trophy asset scarcity" },
  { district: "Miami Beach", roi: "13%", psf: "$1,380", inventory: "2.6 mo", trend: "International buyer flow" },
]

const roiForecasts = [
  {
    corridor: "Brickell Financial District",
    currentPsf: "$1,280",
    projectedPsf: "$1,590",
    yoyGrowth: "+18.4%",
    capRate: "4.1%",
    horizon: "24-month",
    drivers: [
      "Citadel HQ relocation complete",
      "New Brightline terminal within 0.3mi",
      "Institutional capital inflow from Northeast",
    ],
    riskTier: "Core Plus",
  },
  {
    corridor: "Fisher Island & Star Island",
    currentPsf: "$2,840",
    projectedPsf: "$3,320",
    yoyGrowth: "+12.7%",
    capRate: "2.8%",
    horizon: "36-month",
    drivers: [
      "Zero new supply pipeline through 2028",
      "Median buyer net worth exceeds $120M",
      "Ferry-only access preserves exclusivity",
    ],
    riskTier: "Trophy",
  },
  {
    corridor: "Edgewater & Wynwood",
    currentPsf: "$890",
    projectedPsf: "$1,180",
    yoyGrowth: "+24.1%",
    capRate: "5.3%",
    horizon: "18-month",
    drivers: [
      "Eight pre-construction towers breaking ground",
      "Art Basel spillover demand accelerating",
      "Youngest median buyer age in Miami-Dade",
    ],
    riskTier: "Value-Add",
  },
]

const migrationData = [
  {
    origin: "New York Tri-State",
    capitalFlow: "$4.8B",
    netMigrants: "14,200",
    avgBudget: "$3.2M",
    primaryDriver: "Tax arbitrage",
    taxSaving: "Up to 13.3% state income elimination",
  },
  {
    origin: "San Francisco Bay Area",
    capitalFlow: "$2.1B",
    netMigrants: "6,800",
    avgBudget: "$4.7M",
    primaryDriver: "Tech sector relocation",
    taxSaving: "Eliminating CA 13.3% + SALT optimization",
  },
  {
    origin: "London & Western Europe",
    capitalFlow: "$3.6B",
    netMigrants: "4,100",
    avgBudget: "$6.4M",
    primaryDriver: "Dollar-denominated asset diversification",
    taxSaving: "Favorable treaty + EB-5 pathway",
  },
  {
    origin: "Latin America (BR, AR, CO)",
    capitalFlow: "$5.2B",
    netMigrants: "9,400",
    avgBudget: "$2.8M",
    primaryDriver: "Political stability & capital preservation",
    taxSaving: "LLC structuring + NRA exemptions",
  },
]

const lifestyleMetrics = [
  {
    icon: Gem,
    metric: "97.4",
    label: "Art & Culture Score",
    detail:
      "Miami ranked #2 globally for contemporary art market activity, trailing only New York. Art Basel Miami Beach alone transacted $4.1B in 2025.",
  },
  {
    icon: Anchor,
    metric: "94.1",
    label: "Waterfront Access Index",
    detail:
      "87% of our portfolio sits within 500 meters of navigable waterfront. Average yacht dockage value appreciated 22% in the past fiscal year.",
  },
  {
    icon: Palmtree,
    metric: "91.8",
    label: "Climate & Wellness Score",
    detail:
      "248 sunshine days annually. Miami-Dade hosts 14 world-class wellness facilities, 8 USGA-rated championship courses, and 23 Michelin-recognized dining rooms.",
  },
  {
    icon: Wine,
    metric: "96.2",
    label: "Culinary & Nightlife Index",
    detail:
      "From Mandolin Aegean to Fiola, the city's culinary scene now rivals any global capital. Private membership clubs have grown 340% since 2020.",
  },
  {
    icon: Shield,
    metric: "89.5",
    label: "Privacy & Security Rating",
    detail:
      "Gated island communities, private elevators, and discreet concierge services define the Miami ultra-luxury standard. Homestead exemption protects primary residence equity.",
  },
  {
    icon: Activity,
    metric: "95.7",
    label: "Infrastructure Velocity",
    detail:
      "Brightline expansion, autonomous transit corridors, and the $5B Miami Freedom Park development are redefining urban connectivity and long-term property value trajectories.",
  },
]

export function MarketIntelligenceClient() {
  const { contentVariant, isEliteApple } = useEliteFilter()

  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="relative flex min-h-[70svh] flex-col items-center justify-center overflow-hidden bg-charcoal px-6 pt-36 pb-24 lg:px-10">
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
              Proprietary Research
            </span>
            <span className="h-px w-8 bg-gold" />
          </motion.div>

          <CinemaText
            text="Market Intelligence"
            as="h1"
            className="font-serif text-5xl font-light tracking-tight text-cream sm:text-7xl lg:text-[5.5rem]"
            delay={0.4}
            wordDelay={0.12}
          />

          <CinemaText
            text={eliteContent.roiHeadline[contentVariant]}
            as="p"
            className="mx-auto mt-8 max-w-3xl font-sans text-base leading-relaxed text-cream/60 sm:text-lg"
            delay={0.8}
            wordDelay={0.02}
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4, ease }}
            className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center"
          >
<Link
                href="/market-intelligence#roi-forecast"
                className="inline-flex items-center gap-2 bg-gold px-8 py-4 font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
              >
              Explore Forecasts
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <LiveSync variant="dark" />
          </motion.div>
        </div>
      </section>

      {/* ROI Forecast Section */}
      <section
        id="roi-forecast"
        className="border-t border-border bg-background py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="mb-20">
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                  ROI Forecast
                </span>
              </div>
              <h2 className="font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Corridor Performance{" "}
                <span className="italic text-gold">Projections</span>
              </h2>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground">
                Proprietary modeling across 12 micro-markets, incorporating
                pre-construction pipeline analysis, migration capital flows, and
                institutional allocation patterns. Updated quarterly by our
                in-house research desk.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-3">
            {roiForecasts.map((item, i) => (
              <CinemaBlock key={item.corridor} delay={i * 0.15}>
                <article className="group h-full border border-border bg-card p-8 transition-all duration-500 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/[0.03]">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="border border-gold/20 bg-gold/5 px-3 py-1 font-sans text-[10px] tracking-[0.15em] text-gold uppercase">
                      {item.riskTier}
                    </span>
                    <span className="font-sans text-[10px] tracking-wide text-muted-foreground">
                      {item.horizon} outlook
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium tracking-tight text-foreground">
                    {item.corridor}
                  </h3>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div>
                      <span className="block font-sans text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
                        Current PSF
                      </span>
                      <span className="mt-1 block font-serif text-2xl font-light text-foreground">
                        {item.currentPsf}
                      </span>
                    </div>
                    <div>
                      <span className="block font-sans text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
                        Projected PSF
                      </span>
                      <span className="mt-1 block font-serif text-2xl font-light text-gold">
                        {item.projectedPsf}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                      <span className="font-sans text-sm font-medium text-emerald-600">
                        {item.yoyGrowth}
                      </span>
                    </div>
                    <div>
                      <span className="font-sans text-[10px] text-muted-foreground">
                        Cap Rate:{" "}
                      </span>
                      <span className="font-sans text-sm text-foreground">
                        {item.capRate}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-border pt-6">
                    <span className="mb-3 block font-sans text-[9px] tracking-[0.2em] text-gold/60 uppercase">
                      Key Drivers
                    </span>
                    <ul className="flex flex-col gap-2">
                      {item.drivers.map((driver) => (
                        <li
                          key={driver}
                          className="flex items-start gap-2 font-sans text-xs leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/40" />
                          {driver}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </CinemaBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Miami Real Estate 2026 Forecast */}
      <section
        id="miami-2026-forecast"
        className="border-t border-border bg-charcoal py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                  Content Generator
                </span>
                <span className="h-px w-8 bg-gold" />
              </div>
              <CinemaText
                text="Miami Real Estate 2026 Forecast"
                as="h2"
                className="font-serif text-4xl font-light tracking-tight text-cream sm:text-5xl lg:text-6xl"
                wordDelay={0.08}
              />
              <CinemaText
                text="Proprietary district-level projections for the coming fiscal year. Brickell: 12.4% Projected Growth. Miami Design District: High-Aesthetic Value Peak. Wynwood follows at 15% on creative corridor expansion and pre-construction momentum."
                as="p"
                className="mx-auto mt-8 max-w-3xl font-sans text-base leading-relaxed text-cream/60"
                delay={0.3}
                wordDelay={0.015}
              />
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {miami2026Forecast.map((item, i) => (
              <CinemaBlock key={item.district} delay={i * 0.08}>
                <div className="group border border-cream/10 bg-charcoal-light p-6 transition-all duration-500 hover:border-gold/30">
                  <div className="flex items-start justify-between">
                    <h3 className="font-serif text-xl font-medium text-cream">
                      {item.district}
                    </h3>
                    <span className="font-serif text-2xl font-light text-gold">
                      {item.roi}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 font-sans text-xs text-cream/50">
                    <div>
                      <span className="block text-[10px] tracking-[0.15em] text-cream/30 uppercase">
                        PSF
                      </span>
                      <span className="text-cream/80">{item.psf}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] tracking-[0.15em] text-cream/30 uppercase">
                        Inventory
                      </span>
                      <span className="text-cream/80">{item.inventory}</span>
                    </div>
                  </div>
                  <p className="mt-4 font-sans text-[11px] tracking-wide text-cream/40">
                    {item.trend}
                  </p>
                </div>
              </CinemaBlock>
            ))}
          </div>
        </div>
      </section>

      {/* AI Migration Trends Section */}
      <section
        id="migration-trends"
        className="border-t border-border bg-charcoal py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="mb-20 flex flex-col items-start lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-6 inline-flex items-center gap-3">
                  <span className="h-px w-8 bg-gold" />
                  <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                    AI Migration Trends
                  </span>
                </div>
                <h2 className="font-serif text-4xl font-light tracking-tight text-cream sm:text-5xl lg:text-6xl">
                  Global Capital{" "}
                  <span className="italic text-gold">Migration</span>
                </h2>
                <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-cream/50">
                  Real-time analysis of wealth migration corridors into
                  Miami-Dade. Our AI models track IRS migration data,
                  EB-5 filings, and cross-border transaction patterns
                  to identify where capital is moving before it arrives.
                </p>
              </div>
              <Link
                href="/#schedule"
                className="mt-8 inline-flex items-center gap-2 border border-cream/20 px-8 py-3 font-sans text-xs tracking-[0.2em] text-cream uppercase transition-all duration-500 hover:border-gold hover:bg-gold hover:text-charcoal lg:mt-0"
              >
                {eliteContent.migrationCta[contentVariant]}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Migration Summary Bar */}
          <div className="mb-12 grid grid-cols-2 gap-px bg-cream/10 lg:grid-cols-4">
            {[
              {
                icon: Globe2,
                metric: "$15.7B",
                label: "Annual Capital Inflow",
                sub: "Miami-Dade luxury segment",
              },
              {
                icon: Plane,
                metric: "34,500+",
                label: "Net HNW Migrants",
                sub: "2025 fiscal year",
              },
              {
                icon: Building2,
                metric: "67%",
                label: "International Buyer Share",
                sub: "Of transactions above $5M",
              },
              {
                icon: BarChart3,
                metric: "#1",
                label: "U.S. Wealth Magnet",
                sub: "Henley Global Citizens Report",
              },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="group bg-charcoal-light p-6 transition-all duration-500 hover:bg-charcoal lg:p-8"
                >
                  <Icon className="mb-4 h-5 w-5 text-gold/50 transition-colors duration-500 group-hover:text-gold" />
                  <span className="block font-serif text-3xl font-light tracking-tight text-cream lg:text-4xl">
                    {stat.metric}
                  </span>
                  <span className="mt-2 block font-sans text-xs tracking-wide text-cream">
                    {stat.label}
                  </span>
                  <span className="mt-0.5 block font-sans text-[11px] text-cream/40">
                    {stat.sub}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Migration Corridor Cards */}
          <div className="grid gap-6 lg:grid-cols-2">
            {migrationData.map((item, i) => (
              <CinemaBlock key={item.origin} delay={i * 0.12}>
                <div className="group border border-cream/10 bg-charcoal-light p-8 transition-all duration-500 hover:border-gold/20">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-serif text-lg font-medium text-cream">
                      {item.origin}
                    </h3>
                    <Plane className="h-4 w-4 text-gold/40 transition-colors duration-300 group-hover:text-gold" />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="block font-sans text-[9px] tracking-[0.15em] text-cream/40 uppercase">
                        Capital Flow
                      </span>
                      <span className="mt-1 block font-serif text-xl font-light text-gold">
                        {item.capitalFlow}
                      </span>
                    </div>
                    <div>
                      <span className="block font-sans text-[9px] tracking-[0.15em] text-cream/40 uppercase">
                        Net Migrants
                      </span>
                      <span className="mt-1 block font-serif text-xl font-light text-cream">
                        {item.netMigrants}
                      </span>
                    </div>
                    <div>
                      <span className="block font-sans text-[9px] tracking-[0.15em] text-cream/40 uppercase">
                        Avg. Budget
                      </span>
                      <span className="mt-1 block font-serif text-xl font-light text-cream">
                        {item.avgBudget}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-cream/8 pt-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                      <div>
                        <span className="font-sans text-[9px] tracking-[0.15em] text-cream/30 uppercase">
                          Primary Driver
                        </span>
                        <span className="ml-2 font-sans text-xs text-cream/60">
                          {item.primaryDriver}
                        </span>
                      </div>
                      <div>
                        <span className="font-sans text-[9px] tracking-[0.15em] text-cream/30 uppercase">
                          Tax Advantage
                        </span>
                        <span className="ml-2 font-sans text-xs text-cream/60">
                          {item.taxSaving}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CinemaBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Lifestyle Index Section */}
      <section
        id="lifestyle-index"
        className="border-t border-border bg-background py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="mb-20 text-center">
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                  {eliteContent.lifestyleLabel[contentVariant]}
                </span>
                <span className="h-px w-8 bg-gold" />
              </div>
              <h2 className="font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Luxury Lifestyle{" "}
                <span className="italic text-gold">Index</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground">
                A proprietary composite measuring the intangibles that define
                Miami as the preeminent destination for the globally mobile
                elite. Scored on a 100-point scale across six lifestyle
                dimensions.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lifestyleMetrics.map((item, i) => {
              const Icon = item.icon
              return (
                <CinemaBlock key={item.label} delay={i * 0.1}>
                  <div className="group h-full border border-border bg-card p-8 transition-all duration-500 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/[0.03]">
                    <div className="mb-6 flex items-center justify-between">
                      <Icon className="h-5 w-5 text-gold/50 transition-colors duration-500 group-hover:text-gold" />
                      <span className="font-serif text-3xl font-light text-gold">
                        {item.metric}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-medium tracking-tight text-foreground">
                      {item.label}
                    </h3>

                    <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </CinemaBlock>
              )
            })}
          </div>

          {/* Composite Score */}
          <ScrollReveal delay={0.3}>
            <div className="mt-16 border border-gold/20 bg-gold/5 p-10 text-center">
              <span className="block font-sans text-[10px] tracking-[0.3em] text-gold/60 uppercase">
                Miami Composite Lifestyle Score
              </span>
              <span className="mt-3 block font-serif text-6xl font-light text-gold lg:text-7xl">
                94.1
              </span>
              <span className="mt-2 block font-sans text-xs tracking-wide text-muted-foreground">
                Ranked #1 among U.S. metropolitan areas for luxury livability
              </span>
              {isEliteApple && (
                <p className="mx-auto mt-4 max-w-lg font-sans text-xs leading-relaxed text-muted-foreground/60">
                  Personalized portfolio recommendations are available for
                  clients viewing from verified high-tier devices. Speak with
                  your advisor for tailored lifestyle matching.
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Architectural Insights */}
      <section
        id="architectural-insights"
        className="border-t border-border bg-background py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="mb-20 text-center">
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                  Architectural Insights
                </span>
                <span className="h-px w-8 bg-gold" />
              </div>
              <h2 className="font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Design &{" "}
                <span className="italic text-gold">Living</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground">
                Thought leadership on the psychology of luxury living and the
                future of sustainable high-rise design.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-2">
            <CinemaBlock delay={0}>
              <Link
                href="/blog"
                className="group block h-full border border-border bg-card p-8 transition-all duration-500 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/[0.03]"
              >
                <span className="mb-4 block font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
                  Psychology
                </span>
                <h3 className="font-serif text-2xl font-light tracking-tight text-foreground transition-colors duration-300 group-hover:text-gold">
                  The Psychology of Luxury Living
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
                  How spatial design, natural light, and material selection
                  influence wellbeing and perceived value in ultra-high-net-worth
                  residences. Neuroscience-backed principles for creating spaces
                  that elevate the human experience.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] text-gold uppercase transition-all duration-300 group-hover:gap-3">
                  Read Article
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </CinemaBlock>
            <CinemaBlock delay={0.1}>
              <Link
                href="/blog"
                className="group block h-full border border-border bg-card p-8 transition-all duration-500 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/[0.03]"
              >
                <span className="mb-4 block font-sans text-[10px] tracking-[0.2em] text-gold uppercase">
                  Sustainability
                </span>
                <h3 className="font-serif text-2xl font-light tracking-tight text-foreground transition-colors duration-300 group-hover:text-gold">
                  Sustainability in High-Rise Penthouses
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
                  The next generation of Miami penthouses integrates LEED
                  Platinum standards, renewable energy integration, and
                  biophilic design. How trophy properties are evolving to meet
                  ESG expectations without compromising luxury.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] text-gold uppercase transition-all duration-300 group-hover:gap-3">
                  Read Article
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </CinemaBlock>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-charcoal py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <ScrollReveal>
            <CinemaText
              text="Position Your Capital Where Momentum Converges"
              as="h2"
              className="font-serif text-3xl font-light tracking-tight text-cream sm:text-4xl lg:text-5xl"
              wordDelay={0.06}
            />
            <p className="mx-auto mt-8 max-w-2xl font-sans text-base leading-relaxed text-cream/50">
              Our research desk delivers institutional-grade intelligence to a
              private network of qualified buyers. Request access to our full
              quarterly forecast, complete with corridor-level projections and
              deal-specific recommendations.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/#schedule"
                className="inline-flex items-center gap-2 bg-gold px-10 py-4 font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
              >
                Request Intelligence Briefing
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-cream/20 px-10 py-4 font-sans text-xs tracking-[0.2em] text-cream uppercase transition-all duration-500 hover:border-gold hover:text-gold"
              >
                Return to Portfolio
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
