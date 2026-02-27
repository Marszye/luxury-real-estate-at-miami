"use client"

import { useState } from "react"
import Image from "next/image"
import { Bath, BedDouble, Maximize, MapPin, ArrowUpRight } from "lucide-react"

const listings = [
  {
    id: 1,
    title: "The Oceanfront Penthouse",
    address: "Fisher Island, Miami Beach",
    price: "$28,500,000",
    beds: 5,
    baths: 7,
    sqft: "8,200",
    image: "/images/listing-1.jpg",
    tag: "New Listing",
  },
  {
    id: 2,
    title: "Biscayne Bay Residence",
    address: "Edgewater, Miami",
    price: "$12,900,000",
    beds: 4,
    baths: 5,
    sqft: "5,400",
    image: "/images/listing-2.jpg",
    tag: "Featured",
  },
  {
    id: 3,
    title: "Villa Paradiso",
    address: "Star Island, Miami Beach",
    price: "$45,000,000",
    beds: 8,
    baths: 10,
    sqft: "14,600",
    image: "/images/listing-3.jpg",
    tag: "Exclusive",
  },
  {
    id: 4,
    title: "Aria Tower Residence",
    address: "Brickell, Miami",
    price: "$8,750,000",
    beds: 3,
    baths: 4,
    sqft: "3,800",
    image: "/images/listing-4.jpg",
    tag: "Pre-Launch",
  },
  {
    id: 5,
    title: "The Grand Suite",
    address: "Sunny Isles, Miami",
    price: "$16,200,000",
    beds: 5,
    baths: 6,
    sqft: "6,100",
    image: "/images/listing-5.jpg",
    tag: "Penthouse",
  },
  {
    id: 6,
    title: "Sky Terrace Estate",
    address: "Coconut Grove, Miami",
    price: "$19,800,000",
    beds: 6,
    baths: 7,
    sqft: "9,300",
    image: "/images/listing-6.jpg",
    tag: "Rare Find",
  },
]

export function FeaturedListings() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="properties" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-20 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span
              className="text-xs tracking-[0.4em] text-gold uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Portfolio
            </span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Featured Listings
          </h2>
          <p
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Each property in our collection has been personally selected for its
            extraordinary character, location, and investment potential.
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <article
              key={listing.id}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredId(listing.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <Image
                  src={listing.image}
                  alt={`${listing.title} - ${listing.address}`}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay on hover */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    hoveredId === listing.id
                      ? "bg-charcoal/40"
                      : "bg-charcoal/0"
                  }`}
                />

                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span
                    className="bg-cream/90 backdrop-blur-md px-3 py-1.5 text-[10px] tracking-[0.2em] text-charcoal uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {listing.tag}
                  </span>
                </div>

                {/* View button on hover */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                    hoveredId === listing.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <span className="inline-flex items-center gap-2 border border-cream/40 bg-cream/10 px-6 py-3 text-xs tracking-[0.2em] text-cream uppercase backdrop-blur-sm"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    View Property
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>

                {/* Price overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/60 to-transparent p-5 pt-16">
                  <span className="text-2xl font-light tracking-wide text-cream">
                    {listing.price}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="mt-5">
                <h3 className="text-xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-gold">
                  {listing.title}
                </h3>
                <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-gold/60" />
                  <span
                    className="text-xs tracking-wide"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {listing.address}
                  </span>
                </div>

                {/* Stats */}
                <div className="mt-4 flex items-center gap-5 border-t border-border pt-4">
                  <div className="flex items-center gap-1.5">
                    <BedDouble className="h-3.5 w-3.5 text-gold/60" />
                    <span
                      className="text-xs text-muted-foreground"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {listing.beds} Beds
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="h-3.5 w-3.5 text-gold/60" />
                    <span
                      className="text-xs text-muted-foreground"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {listing.baths} Baths
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize className="h-3.5 w-3.5 text-gold/60" />
                    <span
                      className="text-xs text-muted-foreground"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {listing.sqft} SF
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-16 flex justify-center">
          <a
            href="#"
            className="group inline-flex items-center gap-3 border border-charcoal/20 px-10 py-4 text-xs tracking-[0.25em] text-charcoal uppercase transition-all duration-500 hover:border-gold hover:bg-gold hover:text-cream"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            View Full Collection
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
