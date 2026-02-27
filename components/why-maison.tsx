import Image from "next/image"
import { Shield, Star, Clock, Users, Award, Globe, TrendingUp, Handshake, ArrowUpRight } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Absolute Discretion",
    description:
      "Every transaction is handled with the highest level of confidentiality. NDA-protected processes, off-market access, and private viewings ensure your privacy is never compromised.",
    stat: "100%",
    statLabel: "NDA compliance rate",
  },
  {
    icon: Star,
    title: "Curated Excellence",
    description:
      "We personally vet every property to ensure it meets the extraordinary standards our clients deserve. Only 3% of submitted properties make it into the Maison portfolio.",
    stat: "3%",
    statLabel: "Acceptance rate",
  },
  {
    icon: Clock,
    title: "24/7 Concierge",
    description:
      "Your dedicated advisor is available around the clock across every time zone. From property inquiries to relocation logistics, seamless service at every step.",
    stat: "< 2hr",
    statLabel: "Avg. response time",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Access an exclusive network of ultra-high-net-worth buyers and sellers spanning six continents, 40+ countries, and partnerships with leading international brokerages.",
    stat: "40+",
    statLabel: "Countries served",
  },
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    description:
      "Data-driven insights from our in-house research team. Quarterly market reports, investment analytics, and neighborhood forecasts to inform every decision.",
    stat: "12",
    statLabel: "Reports published annually",
  },
  {
    icon: Handshake,
    title: "Full-Service Advisory",
    description:
      "Beyond the transaction: legal counsel, tax optimization, interior design coordination, property management, and relocation services under one roof.",
    stat: "8",
    statLabel: "Integrated service lines",
  },
]

const services = [
  {
    title: "Property Acquisition",
    description: "Buyer representation, market analysis, negotiation strategy, due diligence, and closing coordination for residential and investment properties.",
  },
  {
    title: "Sales & Marketing",
    description: "Bespoke marketing campaigns, professional staging, editorial photography, virtual tours, and targeted international exposure for seller clients.",
  },
  {
    title: "Investment Advisory",
    description: "Pre-construction opportunities, ROI modeling, portfolio diversification strategy, and 1031 exchange guidance for domestic and international investors.",
  },
  {
    title: "Relocation Concierge",
    description: "End-to-end relocation support including visa guidance, school enrollment, healthcare setup, banking introductions, and cultural orientation.",
  },
]

export function WhyMaison() {
  return (
    <section id="about" className="border-t border-border bg-secondary">
      {/* Values Grid */}
      <div className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Header */}
          <div className="mb-20 flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span
                className="text-xs tracking-[0.4em] text-gold uppercase"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Why Maison
              </span>
              <span className="h-px w-8 bg-gold" />
            </div>
            <h2 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              A Legacy of{" "}
              <span className="italic text-gold">Distinction</span>
            </h2>
            <p
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              For over fifteen years, we have redefined the meaning of luxury
              real estate in South Florida. Our approach combines deep local
              expertise with global reach, data-driven insights with
              white-glove service, setting the standard others aspire to
              follow.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {values.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="group bg-background p-8 transition-all duration-500 hover:bg-card lg:p-10"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center border border-gold/20 transition-all duration-500 group-hover:border-gold/50 group-hover:bg-gold/5">
                    <Icon className="h-5 w-5 text-gold/60 transition-colors duration-500 group-hover:text-gold" />
                  </div>
                  <h3 className="text-lg font-medium tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed text-muted-foreground"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {item.description}
                  </p>
                  <div className="mt-5 border-t border-border pt-4">
                    <span className="text-xl font-light text-gold">
                      {item.stat}
                    </span>
                    <span
                      className="ml-2 text-[10px] tracking-[0.1em] text-muted-foreground uppercase"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {item.statLabel}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
            {/* Left */}
            <div>
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span
                  className="text-xs tracking-[0.4em] text-gold uppercase"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Our Services
                </span>
              </div>
              <h3 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl">
                Comprehensive Real Estate{" "}
                <span className="italic text-gold">Solutions</span>
              </h3>
              <p
                className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                From initial consultation through closing and beyond, our
                integrated service model ensures every aspect of your real
                estate journey is managed with expertise and care. We serve
                as your single point of contact for all property needs.
              </p>

              {/* Image */}
              <div className="relative mt-10 aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/listing-5.jpg"
                  alt="Luxury Miami interior showcasing Maison service quality"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>

            {/* Right — Service Cards */}
            <div className="flex flex-col gap-px bg-border">
              {services.map((svc, i) => (
                <div
                  key={svc.title}
                  className="group flex items-start gap-6 bg-background p-8 transition-all duration-500 hover:bg-card"
                >
                  <span
                    className="mt-1 text-xs text-gold/40"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    0{i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-gold">
                        {svc.title}
                      </h4>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground/20 transition-all duration-300 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p
                      className="mt-3 text-sm leading-relaxed text-muted-foreground"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {svc.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* CTA */}
              <div className="bg-background p-8">
                <a
                  href="#schedule"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.15em] text-gold uppercase transition-all duration-300 hover:gap-3"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Discuss Your Needs
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
