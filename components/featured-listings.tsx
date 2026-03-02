"use client"

import { useState, useMemo, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Bath, BedDouble, Maximize, MapPin, ArrowUpRight, Loader2 } from "lucide-react"
import { ScrollReveal, StaggerContainer, staggerChild } from "@/components/scroll-reveal"
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholders"
import type { Property, SanityImageRef } from "@/lib/queries"
import { buildSanityImageUrl } from "@/sanity/lib/image"

const staticListings = [
  {
    id: 1,
    slug: "oceanfront-penthouse-fisher-island",
    title: "The Oceanfront Penthouse",
    address: "Fisher Island, Miami Beach",
    neighborhood: "Fisher Island",
    price: "$28,500,000",
    priceNum: 28500000,
    beds: 5,
    baths: 7,
    sqft: "8,200",
    style: "Penthouse",
    image: "/images/listing-1.jpg",
    tag: "New Listing",
  },
  {
    id: 2,
    slug: "biscayne-bay-residence",
    title: "Biscayne Bay Residence",
    address: "Edgewater, Miami",
    neighborhood: "Edgewater",
    price: "$12,900,000",
    priceNum: 12900000,
    beds: 4,
    baths: 5,
    sqft: "5,400",
    style: "Waterfront",
    image: "/images/listing-2.jpg",
    tag: "Featured",
  },
  {
    id: 3,
    slug: "villa-paradiso-star-island",
    title: "Villa Paradiso",
    address: "Star Island, Miami Beach",
    neighborhood: "Star Island",
    price: "$45,000,000",
    priceNum: 45000000,
    beds: 8,
    baths: 10,
    sqft: "14,600",
    style: "Estate",
    image: "/images/listing-3.jpg",
    tag: "Exclusive",
  },
  {
    id: 4,
    slug: "aria-tower-brickell",
    title: "Aria Tower Residence",
    address: "Brickell, Miami",
    neighborhood: "Brickell",
    price: "$8,750,000",
    priceNum: 8750000,
    beds: 3,
    baths: 4,
    sqft: "3,800",
    style: "Condo",
    image: "/images/listing-4.jpg",
    tag: "Pre-Launch",
  },
  {
    id: 5,
    slug: "grand-suite-sunny-isles",
    title: "The Grand Suite",
    address: "Sunny Isles, Miami",
    neighborhood: "Sunny Isles",
    price: "$16,200,000",
    priceNum: 16200000,
    beds: 5,
    baths: 6,
    sqft: "6,100",
    style: "Penthouse",
    image: "/images/listing-5.jpg",
    tag: "Penthouse",
  },
  {
    id: 6,
    slug: "sky-terrace-coconut-grove",
    title: "Sky Terrace Estate",
    address: "Coconut Grove, Miami",
    neighborhood: "Coconut Grove",
    price: "$19,800,000",
    priceNum: 19800000,
    beds: 6,
    baths: 7,
    sqft: "9,300",
    style: "Estate",
    image: "/images/listing-6.jpg",
    tag: "Rare Find",
  },
]

function formatPrice(price?: number): string {
  if (!price) return "Price on Request"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price)
}

function formatSqFt(sqft?: number): string {
  if (!sqft) return "N/A"
  return sqft.toLocaleString("en-US")
}

function getSanityImageUrl(image?: SanityImageRef): string | null {
  if (!image?.asset) return null
  if (image.asset.url) return image.asset.url
  return buildSanityImageUrl(image, { width: 1200, quality: 85 })
}

function getStatusTag(status?: string): string {
  const map: Record<string, string> = {
    active: "Active",
    "under-contract": "Under Contract",
    sold: "Sold",
    "pre-launch": "Pre-Launch",
    "coming-soon": "Coming Soon",
  }
  return map[status || ""] || "Featured"
}

interface NormalizedListing {
  id: string
  slug: string
  title: string
  address: string
  neighborhood: string
  price: string
  priceNum: number
  beds: number
  baths: number
  sqft: string
  style: string
  image: string
  tag: string
  blurData?: string
}

function normalizeSanityProperty(p: Property): NormalizedListing {
  const imageUrl = getSanityImageUrl(p.mainImage)
  return {
    id: p._id,
    slug: p.slug,
    title: p.title,
    address: p.location || "Miami, FL",
    neighborhood: p.location?.split(",")[0]?.trim() || "Miami",
    price: formatPrice(p.price),
    priceNum: p.price || 0,
    beds: p.bedrooms || 0,
    baths: p.bathrooms || 0,
    sqft: formatSqFt(p.sqFt),
    style: p.propertyType || "Luxury",
    image: imageUrl || "/images/listing-1.jpg",
    tag: getStatusTag(p.status),
    blurData: p.mainImage?.asset?.metadata?.lqip,
  }
}

export { staticListings as listings }

interface FeaturedListingsProps {
  sanityProperties?: Property[]
  filterLocation?: string
  filterPrice?: string
  filterStyle?: string
}

export function FeaturedListings({
  sanityProperties,
  filterLocation,
  filterPrice,
  filterStyle,
}: FeaturedListingsProps = {}) {
  const [isFiltering, setIsFiltering] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    location: filterLocation || "",
    price: filterPrice || "",
    style: filterStyle || "",
  })

  const allListings: NormalizedListing[] = useMemo(() => {
    if (sanityProperties && sanityProperties.length > 0) {
      return sanityProperties.map(normalizeSanityProperty)
    }
    return staticListings.map((l) => ({
      ...l,
      id: String(l.id),
    }))
  }, [sanityProperties])

  const neighborhoods = useMemo(() => {
    const set = new Set(allListings.map((l) => l.neighborhood))
    return Array.from(set).slice(0, 6)
  }, [allListings])

  const filteredListings = useMemo(() => {
    let results = [...allListings]
    if (activeFilters.location) {
      results = results.filter(
        (l) =>
          l.neighborhood
            .toLowerCase()
            .includes(activeFilters.location.toLowerCase()) ||
          l.address
            .toLowerCase()
            .includes(activeFilters.location.toLowerCase()),
      )
    }
    if (activeFilters.price) {
      const priceMap: Record<string, [number, number]> = {
        "under-10m": [0, 10_000_000],
        "10m-20m": [10_000_000, 20_000_000],
        "20m-50m": [20_000_000, 50_000_000],
        "50m+": [50_000_000, Infinity],
      }
      const range = priceMap[activeFilters.price]
      if (range) {
        results = results.filter(
          (l) => l.priceNum >= range[0] && l.priceNum < range[1],
        )
      }
    }
    if (activeFilters.style) {
      results = results.filter(
        (l) => l.style.toLowerCase() === activeFilters.style.toLowerCase(),
      )
    }
    return results
  }, [activeFilters, allListings])

  const handleFilter = useCallback((key: string, value: string) => {
    setIsFiltering(true)
    setTimeout(() => {
      setActiveFilters((prev) => ({
        ...prev,
        [key]: prev[key as keyof typeof prev] === value ? "" : value,
      }))
      setIsFiltering(false)
    }, 600)
  }, [])

  const hasActiveFilter =
    activeFilters.location || activeFilters.price || activeFilters.style

  return (
    <section id="properties" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">
              Portfolio
            </span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Featured Listings
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-sans text-base leading-relaxed text-muted-foreground">
            Each property in our collection has been personally selected for its
            extraordinary character, location, and investment potential.
          </p>
        </ScrollReveal>

        {/* Filter Bar */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-3">
          <span className="font-sans text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
            Filter:
          </span>
          {neighborhoods.map((loc) => (
            <button
              key={loc}
              onClick={() => handleFilter("location", loc)}
              className={`border px-4 py-2 font-sans text-[11px] tracking-wide transition-all duration-300 ${
                activeFilters.location === loc
                  ? "border-gold bg-gold text-charcoal"
                  : "border-charcoal/10 text-muted-foreground hover:border-gold/30 hover:text-foreground"
              }`}
            >
              {loc}
            </button>
          ))}
          <span className="mx-1 h-4 w-px bg-border" />
          {[
            { key: "under-10m", label: "Under $10M" },
            { key: "10m-20m", label: "$10M-$20M" },
            { key: "20m-50m", label: "$20M+" },
          ].map((range) => (
            <button
              key={range.key}
              onClick={() => handleFilter("price", range.key)}
              className={`border px-4 py-2 font-sans text-[11px] tracking-wide transition-all duration-300 ${
                activeFilters.price === range.key
                  ? "border-gold bg-gold text-charcoal"
                  : "border-charcoal/10 text-muted-foreground hover:border-gold/30 hover:text-foreground"
              }`}
            >
              {range.label}
            </button>
          ))}
          {hasActiveFilter && (
            <button
              onClick={() => {
                setIsFiltering(true)
                setTimeout(() => {
                  setActiveFilters({ location: "", price: "", style: "" })
                  setIsFiltering(false)
                }, 400)
              }}
              className="border border-charcoal/10 px-4 py-2 font-sans text-[11px] tracking-wide text-muted-foreground transition-all duration-300 hover:border-gold/30 hover:text-foreground"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Processing Animation */}
        <AnimatePresence>
          {isFiltering && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8 flex items-center justify-center gap-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="h-4 w-4 text-gold" />
              </motion.div>
              <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase">
                Processing
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Listings Grid */}
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <motion.article
                key={listing.id}
                variants={staggerChild}
                layout
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                <Link href={`/properties/${listing.slug}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                    <Image
                      src={listing.image}
                      alt={`${listing.title} - ${listing.address}`}
                      fill
                      className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={listing.blurData || IMAGE_BLUR_DATA_URL}
                    />
                    <div className="absolute inset-0 bg-charcoal/0 transition-all duration-500 group-hover:bg-charcoal/40" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-cream/90 backdrop-blur-md px-3 py-1.5 font-sans text-[10px] tracking-[0.2em] text-charcoal uppercase">
                        {listing.tag}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <span className="inline-flex items-center gap-2 border border-cream/40 bg-cream/10 px-6 py-3 font-sans text-xs tracking-[0.2em] text-cream uppercase backdrop-blur-sm">
                        View Property
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/60 to-transparent p-5 pt-16">
                      <span className="font-serif text-2xl font-light tracking-wide text-cream">
                        {listing.price}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h3 className="font-serif text-xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-gold">
                      {listing.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-gold/60" />
                      <span className="font-sans text-xs tracking-wide">
                        {listing.address}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-5 border-t border-border pt-4">
                      <div className="flex items-center gap-1.5">
                        <BedDouble className="h-3.5 w-3.5 text-gold/60" />
                        <span className="font-sans text-xs text-muted-foreground">
                          {listing.beds} Beds
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="h-3.5 w-3.5 text-gold/60" />
                        <span className="font-sans text-xs text-muted-foreground">
                          {listing.baths} Baths
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize className="h-3.5 w-3.5 text-gold/60" />
                        <span className="font-sans text-xs text-muted-foreground">
                          {listing.sqft} SF
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center"
            >
              <p className="font-serif text-xl font-light text-muted-foreground">
                No properties match your criteria
              </p>
              <p className="mt-2 font-sans text-sm text-muted-foreground/60">
                Adjust your filters or contact us for off-market access.
              </p>
            </motion.div>
          )}
        </StaggerContainer>

        <ScrollReveal delay={0.2} className="mt-16 flex justify-center">
          <Link href="/collection">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 border border-charcoal/20 px-10 py-4 font-sans text-xs tracking-[0.25em] text-charcoal uppercase transition-all duration-500 hover:border-gold hover:bg-gold hover:text-cream"
            >
              View Full Collection
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
