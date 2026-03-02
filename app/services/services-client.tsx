"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Brain,
  Anchor,
  Shield,
  Clock,
  Briefcase,
  Scale,
  Paintbrush,
  Building2,
  Plane,
  Key,
  BarChart3,
  Gem,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AIConciergeLazy as AIConcierge } from "@/components/ai-concierge-lazy"
import { CinemaText, CinemaBlock } from "@/components/cinema-text"
import { LiveSync } from "@/components/live-sync"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useEliteFilter } from "@/hooks/use-elite-filter"

const ease = [0.22, 1, 0.36, 1] as const

const premiumServices = [
  {
    icon: Brain,
    title: "AI Portfolio Analysis",
    subtitle: "Proprietary Intelligence",
    description:
      "Machine-learning models trained on 15 years of Miami-Dade transaction data analyze your acquisition criteria, risk tolerance, and lifestyle preferences to surface opportunities invisible to traditional search. Real-time alerts when matching properties enter the market or approach your target pricing.",
    stats: [
      { label: "Data Points", value: "2.4M+" },
      { label: "Accuracy", value: "94.1%" },
    ],
  },
  {
    icon: Anchor,
    title: "Private Yacht Docking Management",
    subtitle: "Maritime Concierge",
    description:
      "End-to-end marina coordination for property owners with deep-water dockage. Slip procurement, seasonal rotation between Coconut Grove, Fisher Island, and Island Gardens marinas. Vessel maintenance scheduling, crew management, and charter coordination when your yacht is not in residence.",
    stats: [
      { label: "Marinas Managed", value: "12" },
      { label: "Max LOA", value: "250 ft" },
    ],
  },
  {
    icon: Clock,
    title: "24/7 White-Glove Concierge",
    subtitle: "Always Available",
    description:
      "A dedicated concierge team available across every time zone. From sourcing Hermès objets for your new penthouse to coordinating private school admissions, nothing is outside our scope. Response time guaranteed under two hours, 365 days per year.",
    stats: [
      { label: "Response Time", value: "< 2hr" },
      { label: "Availability", value: "365 Days" },
    ],
  },
]

const coreServices = [
  {
    icon: Briefcase,
    title: "Buyer Representation",
    description:
      "Strategic acquisition support from target identification through closing. Off-market sourcing, competitive analysis, negotiation, due diligence coordination, and post-purchase transition management.",
  },
  {
    icon: BarChart3,
    title: "Investment Advisory",
    description:
      "Pre-construction allocation, ROI modeling, 1031 exchange structuring, portfolio diversification across Miami's micro-markets, and quarterly performance reporting.",
  },
  {
    icon: Scale,
    title: "Legal & Tax Strategy",
    description:
      "Coordination with top-tier real estate attorneys and CPAs specializing in Florida property law, FIRPTA compliance, LLC structuring, homestead exemption, and SALT optimization.",
  },
  {
    icon: Paintbrush,
    title: "Interior Design Coordination",
    description:
      "Partnerships with Holly Hunt, Minotti, and Fendi Casa. Project management for full-residence fit-outs from concept through installation. Furniture procurement, art advisory, and smart home integration.",
  },
  {
    icon: Building2,
    title: "Property Management",
    description:
      "Full-service management for investment properties and seasonal residences. Tenant vetting, maintenance coordination, financial reporting, and concierge-level oversight for absentee owners.",
  },
  {
    icon: Plane,
    title: "Relocation Concierge",
    description:
      "Comprehensive relocation support for domestic and international clients. Visa guidance, school enrollment, healthcare navigation, banking introductions, social club memberships, and cultural orientation.",
  },
  {
    icon: Key,
    title: "Pre-Construction Access",
    description:
      "Priority allocation at founding pricing for the most anticipated developments. Direct developer relationships with OKO Group, Related, Terra, and Melo ensure our clients are first in line.",
  },
  {
    icon: Gem,
    title: "Lifestyle Curation",
    description:
      "Membership procurement for Soho Beach House, 1 Hotel South Beach, and private social clubs. Art collection advisory. Wine cellar design and procurement. Personal chef and private event coordination.",
  },
]

export function ServicesClient() {
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
              Bespoke Services
            </span>
            <span className="h-px w-8 bg-gold" />
          </motion.div>

          <CinemaText
            text="Beyond the Transaction"
            as="h1"
            className="font-serif text-5xl font-light tracking-tight text-cream sm:text-7xl lg:text-[5.5rem]"
            delay={0.4}
            wordDelay={0.12}
          />
          <CinemaText
            text="A fully integrated service ecosystem for ultra-high-net-worth clients. Every detail managed. Every expectation exceeded."
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

      {/* Premium Services */}
      <section className="border-t border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="mb-20 text-center">
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                  Signature Services
                </span>
                <span className="h-px w-8 bg-gold" />
              </div>
              <h2 className="font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Institutional-Grade{" "}
                <span className="italic text-gold">Expertise</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-geist text-base leading-relaxed text-muted-foreground">
                Our three signature offerings represent capabilities
                unavailable through any traditional brokerage.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-3">
            {premiumServices.map((svc, i) => {
              const Icon = svc.icon
              return (
                <CinemaBlock key={svc.title} delay={i * 0.12}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.4, ease }}
                    className="group h-full border border-border/50 bg-card p-8 transition-all duration-500 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/[0.04]"
                  >
                    <div className="mb-6 flex h-14 w-14 items-center justify-center border border-gold/20 transition-all duration-500 group-hover:border-gold/50 group-hover:bg-gold/5">
                      <Icon className="h-6 w-6 text-gold/60 transition-colors duration-500 group-hover:text-gold" />
                    </div>
                    <span className="mb-2 block font-sans text-[10px] tracking-[0.2em] text-gold/60 uppercase">
                      {svc.subtitle}
                    </span>
                    <h3 className="font-serif text-xl font-medium tracking-tight text-foreground">
                      {svc.title}
                    </h3>
                    <p className="mt-4 font-geist text-sm leading-relaxed text-muted-foreground">
                      {svc.description}
                    </p>
                    <div className="mt-6 flex items-center gap-6 border-t border-border pt-5">
                      {svc.stats.map((stat) => (
                        <div key={stat.label}>
                          <span className="block font-serif text-xl font-light text-gold">
                            {stat.value}
                          </span>
                          <span className="mt-0.5 block font-geist text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </CinemaBlock>
              )
            })}
          </div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="border-t border-border bg-secondary py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="mb-20">
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                  Full-Service Advisory
                </span>
              </div>
              <h2 className="font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl">
                Comprehensive{" "}
                <span className="italic text-gold">Solutions</span>
              </h2>
              <p className="mt-6 max-w-2xl font-geist text-base leading-relaxed text-muted-foreground">
                Eight integrated service lines under one roof. Your single
                point of contact for every aspect of luxury real estate
                ownership.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {coreServices.map((svc, i) => {
              const Icon = svc.icon
              return (
                <CinemaBlock key={svc.title} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3, ease }}
                    className="group h-full bg-background p-6 transition-all duration-500 hover:bg-card lg:p-8"
                  >
                    <div className="mb-5 flex h-10 w-10 items-center justify-center border border-gold/20 transition-all duration-500 group-hover:border-gold/40 group-hover:bg-gold/5">
                      <Icon className="h-4 w-4 text-gold/50 transition-colors duration-500 group-hover:text-gold" />
                    </div>
                    <h3 className="font-serif text-base font-medium tracking-tight text-foreground">
                      {svc.title}
                    </h3>
                    <p className="mt-3 font-geist text-xs leading-relaxed text-muted-foreground">
                      {svc.description}
                    </p>
                  </motion.div>
                </CinemaBlock>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-charcoal py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <ScrollReveal>
            <CinemaText
              text="The Relationship Begins with a Conversation"
              as="h2"
              className="font-serif text-3xl font-light tracking-tight text-cream sm:text-4xl lg:text-5xl"
              wordDelay={0.06}
            />
            <p className="mx-auto mt-8 max-w-2xl font-geist text-base leading-relaxed text-cream/50">
              Whether you require a single service or the full ecosystem,
              our advisory team will tailor an engagement that aligns
              with your objectives, timeline, and investment philosophy.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/#schedule"
                className="inline-flex items-center gap-2 bg-gold px-10 py-4 font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
              >
                Schedule Consultation
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/neighborhoods"
                className="inline-flex items-center gap-2 border border-cream/20 px-10 py-4 font-sans text-xs tracking-[0.2em] text-cream uppercase transition-all duration-500 hover:border-gold hover:text-gold"
              >
                Explore Neighborhoods
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {isEliteApple && (
              <p className="mx-auto mt-6 font-geist text-[10px] tracking-[0.12em] text-cream/30 uppercase">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" />
                Elite Device Detected. Priority service tier unlocked.
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
