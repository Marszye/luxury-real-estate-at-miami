"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  ArrowUpRight,
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  Wifi,
  Shield,
  Thermometer,
  Eye,
  ChevronRight,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AIConcierge } from "@/components/ai-concierge"
import { CinemaText, CinemaBlock } from "@/components/cinema-text"
import { LiveSync } from "@/components/live-sync"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useEliteFilter } from "@/hooks/use-elite-filter"

const ease = [0.22, 1, 0.36, 1] as const

const bespokeListings = [
  {
    id: "residenza-del-mare",
    title: "Residenza del Mare",
    subtitle: "A Dialogue Between Ocean and Architecture",
    address: "7000 Fisher Island Drive, Fisher Island",
    price: "$38,500,000",
    beds: 6,
    baths: 8,
    sqft: "11,400",
    tag: "Off-Market",
    image: "/images/listing-1.jpg",
    narrative: `Conceived by the late Pritzker laureate Fumihiko Maki and realized by a team of 
artisans drawn from three continents, Residenza del Mare exists at the precise intersection of 
structural ambition and emotional restraint. The residence opens with a 42-foot gallery corridor, 
its ceiling clad in hand-patinated bronze panels sourced from a single foundry in Brescia, Italy. 
Natural light enters through a series of vertical apertures that track the sun's arc, casting 
evolving geometric shadows across floors of Calacatta Monet marble, quarried exclusively from the 
Apuan Alps and selected slab-by-slab for vein continuity.

The primary living volume, measuring 68 feet in uninterrupted span, frames a 270-degree panorama 
of the Atlantic through floor-to-ceiling glazing by Schüco. The glass itself is a triple-layer 
composite with integrated photovoltaic micro-cells, generating supplemental energy while maintaining 
optical clarity that renders the boundary between interior and ocean functionally invisible.`,
    materials: [
      "Calacatta Monet marble (Apuan Alps, hand-selected slabs)",
      "Hand-patinated bronze ceiling panels (Brescia foundry)",
      "Schüco triple-layer photovoltaic glazing",
      "Venetian stucco lustro wall finishes",
      "Aged French white oak engineered flooring (Maison Gerard)",
      "Bespoke Dornbracht fixtures in brushed platinum",
    ],
    philosophy: `Maki's late-career philosophy of "fluid space" is fully realized here. 
Every threshold is a gradual transition rather than a hard boundary. The residence breathes with 
the diurnal rhythm of Biscayne Bay: morning light floods the eastern gallery while sunset ignites 
the western terrace sequence. There is no principal room. Instead, the entire floor plate 
operates as a single spatial narrative that the inhabitant moves through like a gallery visitor, 
discovering new perspectives with each passage.`,
    smartHome: [
      {
        icon: Wifi,
        label: "Crestron Home OS",
        detail:
          "Full-residence automation across 47 zones. Lighting, climate, audio, shading, and security unified under a single neural interface. Voice, touch, and geofence activation.",
      },
      {
        icon: Shield,
        label: "Fortified Perimeter",
        detail:
          "Biometric entry (fingerprint + facial recognition), 4K surveillance with AI motion analysis, private elevator with dual-factor authentication, and panic-room integration.",
      },
      {
        icon: Thermometer,
        label: "Climate Intelligence",
        detail:
          "Daikin VRV system with per-room humidity control. The system learns occupant preferences within 72 hours, pre-conditioning spaces based on calendar and proximity data.",
      },
      {
        icon: Eye,
        label: "Lutron Ketra Lighting",
        detail:
          "Circadian-tuned LED arrays reproduce the full spectrum of natural daylight. 'Gallery Mode' automatically adjusts color temperature and intensity to protect displayed artwork.",
      },
    ],
  },
  {
    id: "casa-vetro",
    title: "Casa Vetro",
    subtitle: "Transparency as an Act of Confidence",
    address: "1 Star Island Drive, Star Island",
    price: "$62,000,000",
    beds: 9,
    baths: 12,
    sqft: "18,200",
    tag: "Private Exclusive",
    image: "/images/listing-3.jpg",
    narrative: `Casa Vetro does not announce itself. Set behind a 300-year-old Banyan canopy on 
Star Island's western shore, the estate reveals itself gradually, through a sequence of 
landscaped courts designed by Raymond Jungles that transition from dense tropical planting into 
expansive water views with choreographed precision. The residence was commissioned by a European 
industrialist who required a home that could host 200 guests for a gala or accommodate a single 
occupant in complete solitude, with no compromise in either scenario.

The principal structure spans 18,200 square feet across two levels, with an additional 4,800 
square feet of covered outdoor living space. The ground floor operates on an open-plan axis that 
connects the formal dining pavilion (seating 24) to the bayside infinity terrace through a 
retractable glass wall system by Vitrocsa. When fully opened, 2,400 square feet of interior 
space merges seamlessly with the terrace, creating a single entertaining volume that faces due 
west toward the Biscayne Bay sunset corridor.`,
    materials: [
      "Vitrocsa minimal-frame retractable glass walls",
      "Pietra Cardosa limestone flooring (Portuguese quarry)",
      "American black walnut millwork (FSC certified)",
      "Hand-formed Moroccan zellige tile (guest pavilion)",
      "Gaggenau 400 Series integrated kitchen suite",
      "Waterworks custom-cast bronze hardware throughout",
    ],
    philosophy: `The architectural thesis is transparency, not as exhibitionism, but as 
an act of earned confidence. Every major room faces water. Every corridor terminates in a view. 
The structure's mass is deliberately suppressed through cantilevers, recessed mullions, and a 
roofline that appears to float above the upper volume. The effect is of a residence that has been 
placed in its landscape with surgical care, disturbing nothing, while commanding everything 
within its sightline. Jungles' landscape design reinforces this ethos: the gardens do not 
decorate the architecture but participate in it, forming living walls that shift with the seasons.`,
    smartHome: [
      {
        icon: Wifi,
        label: "Savant Pro Ecosystem",
        detail:
          "Enterprise-grade home automation with dedicated server rack. 62 independently controlled zones spanning main residence, guest house, pool pavilion, and boat dock.",
      },
      {
        icon: Shield,
        label: "Estate Security Suite",
        detail:
          "Perimeter laser grid, marine-rated dock surveillance, license-plate recognition at entry, and integrated safe room with independent ventilation and satellite communication.",
      },
      {
        icon: Thermometer,
        label: "Geothermal HVAC",
        detail:
          "Closed-loop ground-source heat pump system achieving 400% efficiency. Each wing maintains independent climate zones. Annual energy cost: approximately 60% below comparable estates.",
      },
      {
        icon: Eye,
        label: "Tunable Art Lighting",
        detail:
          "Museum-grade Erco track lighting on programmable circuits. UV-filtered, CRI 97+ fixtures protect collection-grade artwork while rendering true color across 14 gallery walls.",
      },
    ],
  },
  {
    id: "tower-eighty-eight",
    title: "Tower Eighty-Eight",
    subtitle: "The Vertical Estate, Redefined",
    address: "88 Brickell Key Boulevard, Penthouse",
    price: "$24,750,000",
    beds: 5,
    baths: 6,
    sqft: "7,800",
    tag: "Pre-Launch",
    image: "/images/listing-5.jpg",
    narrative: `At 88 stories, it will be the tallest residential structure south of Manhattan. 
Tower Eighty-Eight's penthouse occupies the entire upper triplex: three floors connected by a 
sculptural spiral staircase fabricated in milled stainless steel and backlit onyx. The residence 
begins at floor 86, where a private elevator lobby opens into a double-height reception hall 
oriented toward the Everglades to the west and the open Atlantic to the east. On a clear morning, 
the curvature of the Earth is perceptible from the primary suite's terrace.

The developer, a partnership between a Swiss family office and a Miami-based architecture firm, 
has engaged Piero Lissoni for interior concept and Antonio Citterio for kitchen and bath design. 
The result is a space that feels simultaneously monumental and intimate. Ceiling heights reach 
14 feet on the principal level, dropping to a more embracing 10 feet in the private quarters 
above, creating a psychological transition from public grandeur to personal refuge.`,
    materials: [
      "Milled stainless steel and backlit Iranian onyx staircase",
      "Italian terrazzo flooring with brass aggregate (custom pour)",
      "Brushed oak ceiling coffers with integrated acoustic dampening",
      "Boffi kitchen with fluted Verdi Alpi marble island",
      "Floor-to-ceiling Guardian SunGuard glass (hurricane-rated)",
      "Agape bathroom fixtures in matte black titanium PVD",
    ],
    philosophy: `Lissoni's concept rejects the penthouse cliché of relentless openness. Instead, 
the triplex is organized as a vertical journey. The lowest level is extroverted and social, 
designed for the gaze outward. The middle level introduces intimacy through lower ceilings, 
warmer materials, and strategic view framing. The uppermost level, housing only the primary suite 
and a private study, is an inward space of contemplation. The progression from spectacle to 
sanctuary mirrors the experience of ascending the building itself: the higher one goes, the 
quieter and more private the world becomes. It is, in Lissoni's words, "a tower that teaches 
you how to be still."`,
    smartHome: [
      {
        icon: Wifi,
        label: "Control4 OS 3 + Cisco Meraki",
        detail:
          "Enterprise networking with dedicated 10Gbps fiber uplink. Whole-residence Wi-Fi 7 mesh. Every surface that can be automated, is: blinds, glass opacity, fireplace, wine cellar temperature.",
      },
      {
        icon: Shield,
        label: "Triple-Layer Access",
        detail:
          "Building concierge vetting, private elevator biometric lock, and in-unit facial recognition. Optional integration with personal security teams via dedicated monitoring station on floor 86.",
      },
      {
        icon: Thermometer,
        label: "Precision Climate",
        detail:
          "Chilled-beam system with MERV-16 hospital-grade filtration. Humidity held at 45% +/- 2% to protect art and wood finishes. CO2-responsive fresh air intake.",
      },
      {
        icon: Eye,
        label: "Electrochromic Glazing",
        detail:
          "SageGlass dynamic tinting across all exterior walls. Transition from full transparency to 98% opacity in 90 seconds. Programmed to track solar position, eliminating the need for blinds entirely.",
      },
    ],
  },
]

export function CollectionClient() {
  const [expanded, setExpanded] = useState<string | null>(
    bespokeListings[0].id
  )
  const { isEliteApple, contentVariant } = useEliteFilter()

  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="relative flex min-h-[60svh] flex-col items-center justify-center overflow-hidden bg-charcoal px-6 pt-36 pb-20 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04),transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mb-8 inline-flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold" />
            <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
              Bespoke Portfolio
            </span>
            <span className="h-px w-8 bg-gold" />
          </motion.div>

          <CinemaText
            text="The Collection"
            as="h1"
            className="font-serif text-5xl font-light tracking-tight text-cream sm:text-7xl lg:text-[5.5rem]"
            delay={0.4}
            wordDelay={0.15}
          />

          <CinemaText
            text="Three residences, each selected for architectural distinction, material integrity, and the capacity to appreciate across generations. These are not listings. They are propositions."
            as="p"
            className="mx-auto mt-8 max-w-3xl font-sans text-base leading-relaxed text-cream/60 sm:text-lg"
            delay={0.8}
            wordDelay={0.018}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6, ease }}
            className="mt-10 flex justify-center"
          >
            <LiveSync variant="dark" />
          </motion.div>
        </div>
      </section>

      {/* Bespoke Listings */}
      {bespokeListings.map((listing, idx) => {
        const isOpen = expanded === listing.id

        return (
          <section
            key={listing.id}
            id={listing.id}
            className={`border-t border-border ${
              idx % 2 === 0 ? "bg-background" : "bg-charcoal"
            } py-24 lg:py-32`}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              {/* Property Header */}
              <ScrollReveal>
                <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="mb-4 inline-flex items-center gap-3">
                      <span className="h-px w-8 bg-gold" />
                      <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
                        Residence {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2
                      className={`font-serif text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl ${
                        idx % 2 === 0 ? "text-foreground" : "text-cream"
                      }`}
                    >
                      {listing.title}
                    </h2>
                    <p
                      className={`mt-2 font-serif text-xl italic ${
                        idx % 2 === 0 ? "text-gold" : "text-gold"
                      }`}
                    >
                      {listing.subtitle}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-gold/60" />
                      <span
                        className={`font-sans text-sm ${
                          idx % 2 === 0
                            ? "text-muted-foreground"
                            : "text-cream/50"
                        }`}
                      >
                        {listing.address}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-4 lg:items-end">
                    <span className="border border-gold/20 bg-gold/5 px-3 py-1 font-sans text-[10px] tracking-[0.15em] text-gold uppercase">
                      {listing.tag}
                    </span>
                    <span
                      className={`font-serif text-4xl font-light ${
                        idx % 2 === 0 ? "text-foreground" : "text-cream"
                      }`}
                    >
                      {listing.price}
                    </span>
                    <div className="flex items-center gap-5">
                      {[
                        {
                          icon: BedDouble,
                          value: listing.beds,
                          label: "Beds",
                        },
                        { icon: Bath, value: listing.baths, label: "Baths" },
                        {
                          icon: Maximize,
                          value: listing.sqft,
                          label: "SF",
                        },
                      ].map((stat) => {
                        const Icon = stat.icon
                        return (
                          <div
                            key={stat.label}
                            className="flex items-center gap-1.5"
                          >
                            <Icon className="h-3.5 w-3.5 text-gold/60" />
                            <span
                              className={`font-sans text-xs ${
                                idx % 2 === 0
                                  ? "text-muted-foreground"
                                  : "text-cream/50"
                              }`}
                            >
                              {stat.value} {stat.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Image */}
              <CinemaBlock delay={0.2}>
                <div className="relative aspect-[21/9] overflow-hidden bg-secondary">
                  <Image
                    src={listing.image}
                    alt={`${listing.title} — ${listing.subtitle}`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                </div>
              </CinemaBlock>

              {/* Narrative */}
              <div className="mt-12 grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <CinemaBlock delay={0.3}>
                    <div>
                      <h3
                        className={`mb-6 font-serif text-2xl font-light ${
                          idx % 2 === 0 ? "text-foreground" : "text-cream"
                        }`}
                      >
                        The Narrative
                      </h3>
                      {listing.narrative
                        .split("\n\n")
                        .filter((p) => p.trim())
                        .map((paragraph, pi) => (
                          <CinemaText
                            key={pi}
                            text={paragraph.trim()}
                            className={`mb-6 font-sans text-sm leading-[1.85] ${
                              idx % 2 === 0
                                ? "text-muted-foreground"
                                : "text-cream/60"
                            }`}
                            delay={0.4 + pi * 0.2}
                            wordDelay={0.008}
                          />
                        ))}
                    </div>
                  </CinemaBlock>
                </div>

                <div className="lg:col-span-5">
                  <CinemaBlock delay={0.5}>
                    <div
                      className={`border p-8 ${
                        idx % 2 === 0
                          ? "border-border bg-card"
                          : "border-cream/10 bg-charcoal-light"
                      }`}
                    >
                      <h4
                        className={`mb-5 font-sans text-[10px] tracking-[0.3em] uppercase ${
                          idx % 2 === 0 ? "text-gold" : "text-gold"
                        }`}
                      >
                        Material Provenance
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {listing.materials.map((mat) => (
                          <li
                            key={mat}
                            className={`flex items-start gap-2 font-sans text-xs leading-relaxed ${
                              idx % 2 === 0
                                ? "text-muted-foreground"
                                : "text-cream/50"
                            }`}
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/40" />
                            {mat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CinemaBlock>
                </div>
              </div>

              {/* Architectural Philosophy (Expandable) */}
              <div className="mt-12">
                <button
                  onClick={() =>
                    setExpanded(isOpen ? null : listing.id)
                  }
                  className={`group flex w-full items-center justify-between border-t py-6 ${
                    idx % 2 === 0
                      ? "border-border"
                      : "border-cream/10"
                  }`}
                >
                  <span
                    className={`font-serif text-xl font-light ${
                      idx % 2 === 0 ? "text-foreground" : "text-cream"
                    }`}
                  >
                    Architectural Philosophy
                  </span>
                  <ChevronRight
                    className={`h-5 w-5 transition-transform duration-500 ${
                      isOpen ? "rotate-90" : ""
                    } ${idx % 2 === 0 ? "text-gold" : "text-gold"}`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8">
                        {listing.philosophy
                          .split("\n")
                          .filter((p) => p.trim())
                          .map((paragraph, pi) => (
                            <CinemaText
                              key={pi}
                              text={paragraph.trim()}
                              className={`mb-4 max-w-3xl font-sans text-sm leading-[1.85] ${
                                idx % 2 === 0
                                  ? "text-muted-foreground"
                                  : "text-cream/60"
                              }`}
                              wordDelay={0.01}
                            />
                          ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Smart Home Integration */}
              <ScrollReveal delay={0.2}>
                <div className="mt-8">
                  <h3
                    className={`mb-8 font-serif text-2xl font-light ${
                      idx % 2 === 0 ? "text-foreground" : "text-cream"
                    }`}
                  >
                    Integrated Intelligence
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {listing.smartHome.map((tech, ti) => {
                      const Icon = tech.icon
                      return (
                        <CinemaBlock key={tech.label} delay={ti * 0.1}>
                          <div
                            className={`group h-full border p-6 transition-all duration-500 ${
                              idx % 2 === 0
                                ? "border-border bg-card hover:border-gold/20 hover:shadow-lg hover:shadow-gold/[0.03]"
                                : "border-cream/10 bg-charcoal-light hover:border-gold/20"
                            }`}
                          >
                            <Icon className="mb-4 h-5 w-5 text-gold/50 transition-colors duration-500 group-hover:text-gold" />
                            <h4
                              className={`font-sans text-sm font-medium tracking-wide ${
                                idx % 2 === 0
                                  ? "text-foreground"
                                  : "text-cream"
                              }`}
                            >
                              {tech.label}
                            </h4>
                            <p
                              className={`mt-2 font-sans text-xs leading-relaxed ${
                                idx % 2 === 0
                                  ? "text-muted-foreground"
                                  : "text-cream/50"
                              }`}
                            >
                              {tech.detail}
                            </p>
                          </div>
                        </CinemaBlock>
                      )
                    })}
                  </div>
                </div>
              </ScrollReveal>

              {/* Property CTA */}
              <ScrollReveal delay={0.3}>
                <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/#schedule"
                    className="inline-flex items-center gap-2 bg-gold px-8 py-4 font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
                  >
                    Request Private Viewing
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/"
                    className={`inline-flex items-center gap-2 border px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase transition-all duration-500 ${
                      idx % 2 === 0
                        ? "border-charcoal/20 text-charcoal hover:border-gold hover:text-gold"
                        : "border-cream/20 text-cream hover:border-gold hover:text-gold"
                    }`}
                  >
                    View Full Portfolio
                  </Link>
                  {isEliteApple && (
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-4 font-sans text-[10px] tracking-[0.15em] uppercase ${
                        idx % 2 === 0
                          ? "text-muted-foreground/50"
                          : "text-cream/30"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Priority Access Available
                    </span>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </section>
        )
      })}

      {/* Final CTA */}
      <section className="border-t border-border bg-charcoal py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <ScrollReveal>
            <CinemaText
              text="Every Acquisition Begins with a Conversation"
              as="h2"
              className="font-serif text-3xl font-light tracking-tight text-cream sm:text-4xl lg:text-5xl"
              wordDelay={0.06}
            />
            <p className="mx-auto mt-8 max-w-2xl font-sans text-base leading-relaxed text-cream/50">
              Our advisors maintain relationships with a select network of
              owners, developers, and family offices. Many of the finest
              residences in Miami never reach the public market. If you are
              exploring a strategic acquisition, we should speak.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/#schedule"
                className="inline-flex items-center gap-2 bg-gold px-10 py-4 font-sans text-xs tracking-[0.2em] text-charcoal uppercase transition-all duration-500 hover:bg-gold-light"
              >
                Schedule Private Consultation
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
