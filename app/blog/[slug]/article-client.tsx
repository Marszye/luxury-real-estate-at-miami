"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, FileText } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AIConciergeLazy as AIConcierge } from "@/components/ai-concierge-lazy"
import { CinemaText, CinemaBlock } from "@/components/cinema-text"
import { LiveSync } from "@/components/live-sync"
import { ScrollReveal } from "@/components/scroll-reveal"

const ease = [0.22, 1, 0.36, 1] as const

type Article = {
  title: string
  category: string
  date: string
  readTime: string
  content: string[]
}

export function ArticleClient({
  article,
  slug,
}: {
  article: Article
  slug: string
}) {
  return (
    <main>
      <Navigation />

      {/* Article Header */}
      <section className="border-b border-border bg-background pt-36 pb-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <ScrollReveal>
            <Link
              href="/blog"
              scroll={false}
              className="mb-8 inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-gold"
            >
              <ArrowUpRight className="h-3 w-3 rotate-180" />
              Back to Blog
            </Link>

            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                {article.category}
              </span>
            </div>

            <CinemaText
              text={article.title}
              as="h1"
              className="font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              wordDelay={0.06}
            />

            <div className="mt-8 flex items-center gap-6 font-sans text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-gold/40" />
                {article.date}
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-gold/40" />
                {article.readTime}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <article className="prose prose-neutral max-w-none">
            {article.content.map((paragraph, i) => (
              <CinemaBlock key={i} delay={i * 0.15}>
                <CinemaText
                  text={paragraph}
                  className="mb-8 font-sans text-base leading-[1.9] text-muted-foreground"
                  wordDelay={0.012}
                />
              </CinemaBlock>
            ))}
          </article>

          <ScrollReveal delay={0.5}>
            <div className="mt-16 flex flex-col gap-4 border-t border-border pt-12 sm:flex-row">
              <Link
                href="/#schedule"
                className="inline-flex items-center gap-2 bg-gold px-8 py-4 font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
              >
                Request Intelligence Briefing
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/blog"
                scroll={false}
                className="inline-flex items-center gap-2 border border-charcoal/20 px-8 py-4 font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:border-gold hover:text-gold"
              >
                More Articles
              </Link>
            </div>
            <div className="mt-10">
              <LiveSync variant="light" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <AIConcierge />
    </main>
  )
}
