"use client"

import Image from "next/image"
import Link from "next/link"
import { Linkedin, Mail, ArrowUpRight } from "lucide-react"
import { ScrollReveal, StaggerContainer, staggerChild } from "@/components/scroll-reveal"
import { motion } from "framer-motion"
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholders"

const team = [
  {
    name: "Isabella Montoya-Reyes",
    title: "Founder & Principal Broker",
    image: "/images/team-1.jpg",
    bio: "Former VP at Sotheby's International Realty with 20+ years in ultra-luxury transactions. Licensed in Florida and New York. Over $2.1B in career sales volume.",
    specialties: ["Waterfront Estates", "Off-Market Transactions", "Celebrity & UHNW Clients"],
    languages: ["English", "Spanish", "Portuguese"],
    certifications: ["CRS", "CLHMS", "GRI"],
  },
  {
    name: "Michael J. Van Der Berg",
    title: "Managing Director, Sales",
    image: "/images/team-2.jpg",
    bio: "Former Deutsche Bank private wealth advisor turned luxury real estate strategist. Specializes in investment-grade properties and cross-border tax optimization for international buyers.",
    specialties: ["Investment Properties", "New Developments", "International Buyers"],
    languages: ["English", "Dutch", "German"],
    certifications: ["CCIM", "CLHMS"],
  },
  {
    name: "Sofia Delgado-Hart",
    title: "Director, Client Relations",
    image: "/images/team-3.jpg",
    bio: "Architect-turned-advisor with an eye for design excellence. Leads our relocation concierge and interior coordination services. Previously with Zaha Hadid Architects in London.",
    specialties: ["Architecture Advisory", "Relocation Services", "Interior Coordination"],
    languages: ["English", "Spanish", "Italian"],
    certifications: ["AIA", "LEED AP"],
  },
  {
    name: "Richard Harwell III",
    title: "Head of Market Research",
    image: "/images/team-4.jpg",
    bio: "PhD in Urban Economics from Columbia. 15 years of data-driven real estate research. Publishes Maison's quarterly market outlook and advises institutional investors on Miami market dynamics.",
    specialties: ["Market Analytics", "Investment Advisory", "Economic Forecasting"],
    languages: ["English", "French"],
    certifications: ["CFA", "MAI"],
  },
]

export function TeamSection({ companyName }: { companyName?: string }) {
  const brandName = companyName || "Maison"

  return (
    <section className="border-t border-border bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-20 flex flex-col items-start lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                  Our Leadership
                </span>
              </div>
              <h2 className="font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Meet the{" "}
                <span className="italic text-gold">Advisors</span>
              </h2>
              <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-muted-foreground">
                Our senior team brings collective expertise from global finance,
                architecture, and ultra-luxury real estate. Each advisor is
                personally assigned to ensure an unmatched level of service.
              </p>
            </div>
            <Link
              href="/#about"
              className="mt-8 inline-flex items-center gap-2 border border-charcoal/20 px-8 py-3 font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:border-gold hover:bg-gold hover:text-cream lg:mt-0"
            >
              Full Team
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Team Grid */}
        <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <motion.article
              key={member.name}
              variants={staggerChild}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-background transition-all duration-500 hover:shadow-lg hover:shadow-gold/[0.03]"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.title}`}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  placeholder="blur"
                  blurDataURL={IMAGE_BLUR_DATA_URL}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Social overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center bg-cream/90 text-charcoal backdrop-blur-sm transition-colors hover:bg-gold hover:text-cream"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="mailto:concierge@maison.com"
                    className="flex h-9 w-9 items-center justify-center bg-cream/90 text-charcoal backdrop-blur-sm transition-colors hover:bg-gold hover:text-cream"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-serif text-lg font-medium tracking-tight text-foreground">
                  {member.name}
                </h3>
                <p className="mt-1 font-sans text-xs tracking-wide text-gold">
                  {member.title}
                </p>
                <p className="mt-4 font-sans text-xs leading-relaxed text-muted-foreground line-clamp-3">
                  {member.bio.replaceAll("Maison", brandName)}
                </p>

                {/* Languages */}
                <div className="mt-4 border-t border-border pt-4">
                  <span className="font-sans text-[9px] tracking-[0.2em] text-muted-foreground/50 uppercase">
                    Languages
                  </span>
                  <p className="mt-1 font-sans text-[11px] text-muted-foreground">
                    {member.languages.join(" / ")}
                  </p>
                </div>

                {/* Certifications */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {member.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="font-sans border border-gold/15 px-2 py-0.5 text-[9px] tracking-[0.1em] text-gold/70"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
