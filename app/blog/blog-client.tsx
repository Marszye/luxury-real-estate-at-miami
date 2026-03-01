"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, FileText } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AIConcierge } from "@/components/ai-concierge"
import { CinemaText, CinemaBlock } from "@/components/cinema-text"
import { LiveSync } from "@/components/live-sync"
import { ScrollReveal } from "@/components/scroll-reveal"

const ease = [0.22, 1, 0.36, 1] as const

const articles = [
  {
    slug: "tax-benefits-tech-migration-miami",
    category: "Tax Strategy",
    title: "Tax Benefits for Tech Migration in Miami",
    excerpt:
      "Florida's zero state income tax has created a historic wealth migration corridor from California and New York. Tech executives relocating to Miami can eliminate up to 13.3% in state income tax while preserving their equity compensation structures. This analysis covers the SALT cap implications, residency requirements, and how to structure your move for maximum tax efficiency.",
    date: "February 2026",
    readTime: "14 min read",
  },
  {
    slug: "rise-ultra-luxury-ai-ready-homes",
    category: "Market Intelligence",
    title: "The Rise of Ultra-Luxury AI-Ready Homes",
    excerpt:
      "The next generation of trophy residences is being built with AI-first infrastructure. From smart home systems that learn occupant preferences to integrated security that anticipates threats, we examine how Miami's most ambitious developments are redefining what luxury means. Properties with Savant, Control4, and custom AI integrations are commanding premiums of 18% to 32% over comparable conventional homes.",
    date: "January 2026",
    readTime: "12 min read",
  },
  {
    slug: "capital-preservation-miami-real-estate",
    category: "Investment Analysis",
    title: "Capital Preservation: Why Miami Real Estate Outperforms Traditional Asset Classes",
    excerpt:
      "In a macro environment of persistent inflation and geopolitical uncertainty, dollar-denominated hard assets in tax-advantaged jurisdictions have outperformed equities and bonds. Miami's unique combination of zero state tax, international buyer demand, and supply constraints has created a 14.2% annualized return profile for waterfront properties. We break down the data and the structural drivers.",
    date: "December 2025",
    readTime: "10 min read",
  },
]

export function BlogClient() {
  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="relative flex min-h-[50svh] flex-col items-center justify-center overflow-hidden bg-charcoal px-6 pt-36 pb-20 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04),transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mb-8 inline-flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold" />
            <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
              Investment Insights
            </span>
            <span className="h-px w-8 bg-gold" />
          </motion.div>

          <CinemaText
            text="Investment Blog"
            as="h1"
            className="font-serif text-5xl font-light tracking-tight text-cream sm:text-6xl lg:text-7xl"
            delay={0.4}
            wordDelay={0.12}
          />

          <CinemaText
            text="Strategic analysis for the globally mobile investor. Tax optimization, market intelligence, and the future of luxury living."
            as="p"
            className="mx-auto mt-8 max-w-2xl font-sans text-base leading-relaxed text-cream/60"
            delay={0.7}
            wordDelay={0.02}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2, ease }}
            className="mt-10 flex justify-center"
          >
            <LiveSync variant="dark" />
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="border-t border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-3">
            {articles.map((article, i) => (
              <CinemaBlock key={article.slug} delay={i * 0.15}>
                <Link
                  href={`/blog/${article.slug}`}
                  scroll={false}
                  className="group block"
                >
                  <article className="h-full border border-border bg-card p-8 transition-all duration-500 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/[0.03]">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="border border-gold/20 bg-gold/5 px-3 py-1 font-sans text-[10px] tracking-[0.15em] text-gold uppercase">
                        {article.category}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 transition-all duration-300 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    <h2 className="font-serif text-xl font-medium leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-gold">
                      {article.title}
                    </h2>

                    <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground line-clamp-4">
                      {article.excerpt}
                    </p>

                    <div className="mt-6 flex items-center gap-4 border-t border-border pt-5 font-sans">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-gold/40" />
                        <span className="text-[11px] text-muted-foreground">
                          {article.date}
                        </span>
                      </div>
                      <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/30" />
                      <div className="flex items-center gap-1.5">
                        <FileText className="h-3 w-3 text-gold/40" />
                        <span className="text-[11px] text-muted-foreground">
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </CinemaBlock>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-16 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
              <Link
                href="/#schedule"
                scroll={false}
                className="inline-flex items-center gap-2 bg-gold px-10 py-4 font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
              >
                Request Intelligence Briefing
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/market-intelligence"
                scroll={false}
                className="inline-flex items-center gap-2 border border-charcoal/20 px-10 py-4 font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:border-gold hover:bg-gold hover:text-cream"
              >
                Market Intelligence
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <AIConcierge />
    </main>
  )
}
