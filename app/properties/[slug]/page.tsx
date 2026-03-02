import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getPropertyBySlug } from "@/lib/queries"
import type { Property } from "@/lib/queries"
import { createRealEstateListingJsonLd } from "@/lib/seo"
import { urlFor } from "@/sanity/lib/image"
import { getSiteSettings, siteSettingsFallback } from "@/sanity/lib/siteSettings"
import { PropertyDetailClient, type StaticListing } from "@/components/property-detail-client"
import { listings } from "@/components/featured-listings"

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

function getStaticListing(slug: string): StaticListing | null {
  const found = listings.find((l) => l.slug === slug)
  if (!found) return null
  return {
    slug: found.slug,
    title: found.title,
    address: found.address,
    neighborhood: found.neighborhood,
    price: found.price,
    beds: found.beds,
    baths: found.baths,
    sqft: found.sqft,
    style: found.style,
    image: found.image,
    tag: found.tag,
  }
}

function buildSanityListing(property: Property, imageUrl?: string): StaticListing {
  return {
    slug: property.slug,
    title: property.title,
    address: property.location || "Miami, FL",
    neighborhood: property.location || "Miami",
    price: property.price
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(property.price)
      : "Price on Request",
    beds: property.bedrooms || 0,
    baths: property.bathrooms || 0,
    sqft: property.sqFt ? property.sqFt.toLocaleString() : "N/A",
    style: property.propertyType || "Luxury",
    image: imageUrl || "/images/listing-1.jpg",
    tag: property.status === "pre-launch"
      ? "Pre-Launch"
      : property.status === "under-contract"
        ? "Under Contract"
        : "Exclusive",
    luxuryDescription: property.luxuryDescription,
    roiData: property.roiData,
    materialSpecs: property.materialSpecs,
    architecturalDNA: property.architecturalDNA,
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const staticListing = getStaticListing(params.slug)
  if (staticListing) {
    const settings = await getSiteSettings()
    const companyName = settings.companyName || siteSettingsFallback.companyName
    return {
      title: `${staticListing.title} | ${companyName}`,
      description: `Explore ${staticListing.title} in ${staticListing.address}. ${staticListing.beds} beds, ${staticListing.baths} baths, ${staticListing.sqft} SF.`,
    }
  }

  const property = await getPropertyBySlug(params.slug)
  if (!property) return {}

  const settings = await getSiteSettings()
  const companyName = settings.companyName || siteSettingsFallback.companyName
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const url = `${baseUrl}/properties/${property.slug}`

  return {
    title: `${property.title} | ${companyName}`,
    description: property.luxuryDescription
      || (property.location
        ? `Explore ${property.title} in ${property.location}.`
        : property.title),
    alternates: { canonical: url },
  }
}

export default async function PropertyPage(props: Props) {
  const params = await props.params
  const staticListing = getStaticListing(params.slug)
  if (staticListing) {
    return <PropertyDetailClient listing={staticListing} />
  }

  const property = await getPropertyBySlug(params.slug)
  if (!property) notFound()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const url = `${baseUrl}/properties/${property.slug}`
  const imageUrl =
    property.mainImage != null
      ? urlFor(property.mainImage).width(1200).height(800).url()
      : undefined
  const jsonLd = createRealEstateListingJsonLd(property, { url, imageUrl })

  const sanityListing = buildSanityListing(property, imageUrl)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyDetailClient listing={sanityListing} />
    </>
  )
}
