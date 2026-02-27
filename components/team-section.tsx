import Image from "next/image"
import { Linkedin, Mail, ArrowUpRight } from "lucide-react"

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

export function TeamSection() {
  return (
    <section className="border-t border-border bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-20 flex flex-col items-start lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span
                className="text-xs tracking-[0.4em] text-gold uppercase"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Our Leadership
              </span>
            </div>
            <h2 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Meet the{" "}
              <span className="italic text-gold">Advisors</span>
            </h2>
            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Our senior team brings collective expertise from global finance,
              architecture, and ultra-luxury real estate. Each advisor is
              personally assigned to ensure an unmatched level of service.
            </p>
          </div>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 border border-charcoal/20 px-8 py-3 text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:border-gold hover:bg-gold hover:text-cream lg:mt-0"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Full Team
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Team Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article
              key={member.name}
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
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Social overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center bg-cream/90 text-charcoal backdrop-blur-sm transition-colors hover:bg-gold hover:text-cream"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center bg-cream/90 text-charcoal backdrop-blur-sm transition-colors hover:bg-gold hover:text-cream"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-lg font-medium tracking-tight text-foreground">
                  {member.name}
                </h3>
                <p
                  className="mt-1 text-xs tracking-wide text-gold"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {member.title}
                </p>
                <p
                  className="mt-4 text-xs leading-relaxed text-muted-foreground line-clamp-3"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {member.bio}
                </p>

                {/* Languages */}
                <div className="mt-4 border-t border-border pt-4">
                  <span
                    className="text-[9px] tracking-[0.2em] text-muted-foreground/50 uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Languages
                  </span>
                  <p
                    className="mt-1 text-[11px] text-muted-foreground"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {member.languages.join(" / ")}
                  </p>
                </div>

                {/* Certifications */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {member.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="border border-gold/15 px-2 py-0.5 text-[9px] tracking-[0.1em] text-gold/70"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
