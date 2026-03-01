import Link from "next/link"
import { TrendingUp, BarChart3, DollarSign, Building2, ArrowUpRight, Calendar } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const reports = [
  {
    category: "Quarterly Report",
    title: "Miami Luxury Market Outlook Q1 2026",
    summary:
      "Waterfront properties in Miami-Dade County saw a 12.3% year-over-year price increase, driven by continued international demand and limited inventory in prime neighborhoods.",
    date: "January 2026",
    readTime: "8 min read",
  },
  {
    category: "Investment Analysis",
    title: "South Florida Pre-Construction Opportunity Index",
    summary:
      "Analysis of 24 upcoming developments across Brickell, Edgewater, and Miami Beach reveals projected ROI between 18-32% for early-stage buyers entering at current pre-launch pricing.",
    date: "December 2025",
    readTime: "12 min read",
  },
  {
    category: "Neighborhood Report",
    title: "Fisher Island: The $50M+ Micro-Market Defined",
    summary:
      "Fisher Island remains America's wealthiest ZIP code with a median sale price of $6.9M. Our exclusive analysis covers inventory trends, buyer demographics, and price forecasts through 2027.",
    date: "November 2025",
    readTime: "10 min read",
  },
]

const marketData = [
  {
    icon: TrendingUp,
    metric: "+12.3%",
    label: "Avg. Price Growth YoY",
    sublabel: "Miami-Dade luxury segment",
  },
  {
    icon: DollarSign,
    metric: "$1,450",
    label: "Avg. Price Per Sq Ft",
    sublabel: "Waterfront properties",
  },
  {
    icon: Building2,
    metric: "4.2 mo",
    label: "Months of Inventory",
    sublabel: "Properties above $5M",
  },
  {
    icon: BarChart3,
    metric: "67%",
    label: "International Buyers",
    sublabel: "Of total luxury transactions",
  },
]

export function MarketInsights() {
  return (
    <section id="insights" className="border-t border-border bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-20 flex flex-col items-start lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="text-xs tracking-[0.4em] text-gold uppercase font-sans">
                  Market Intelligence
                </span>
              </div>
              <h2 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance font-serif">
                Insights &{" "}
                <span className="italic text-gold">Research</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground font-sans">
                Data-driven market intelligence from our dedicated research team.
                Stay informed with quarterly reports, investment analysis, and
                neighborhood deep-dives that shape confident decisions.
              </p>
            </div>
            <Link
              href="/market-intelligence"
              className="mt-8 inline-flex items-center gap-2 border border-charcoal/20 px-8 py-3 text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:border-gold hover:bg-gold hover:text-cream lg:mt-0 font-sans"
            >
              View All Reports
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Market Data Cards */}
        <div className="mb-16 grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
          {marketData.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="group bg-card p-6 transition-all duration-500 hover:bg-secondary lg:p-8"
              >
                <Icon className="mb-4 h-5 w-5 text-gold/60 transition-colors duration-500 group-hover:text-gold" />
                <span className="block text-3xl font-light tracking-tight text-foreground lg:text-4xl">
                  {item.metric}
                </span>
                <span className="mt-2 block text-xs tracking-wide text-foreground font-sans">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-[11px] text-muted-foreground font-sans">
                  {item.sublabel}
                </span>
              </div>
            )
          })}
        </div>

        {/* Reports Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {reports.map((report) => (
            <article
              key={report.title}
              className="group cursor-pointer border border-border bg-card p-8 transition-all duration-500 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/[0.03]"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="border border-gold/20 bg-gold/5 px-3 py-1 text-[10px] tracking-[0.15em] text-gold uppercase font-sans">
                  {report.category}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 transition-all duration-300 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              <h3 className="text-xl font-medium leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-gold font-serif">
                {report.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-3 font-sans">
                {report.summary}
              </p>

              <div className="mt-6 flex items-center gap-4 border-t border-border pt-5 font-sans">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3 text-gold/40" />
                  <span className="text-[11px] text-muted-foreground">
                    {report.date}
                  </span>
                </div>
                <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/30" />
                <span className="text-[11px] text-muted-foreground">
                  {report.readTime}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-10 text-center text-[11px] text-muted-foreground/50 font-sans">
          Market data sourced from Miami Association of Realtors, Q4 2025. Past
          performance is not indicative of future results.
        </p>
      </div>
    </section>
  )
}
