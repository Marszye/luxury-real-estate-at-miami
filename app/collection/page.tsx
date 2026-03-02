import { Metadata } from "next"
import { Wifi, Shield, Thermometer, Eye } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { CollectionClient } from "./collection-client"
import { getCollectionProperties } from "@/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import type { Property } from "@/lib/queries"
import { sanitizeForDisplay } from "@/lib/queries"

export const revalidate = 60

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Three extraordinary residences selected from our private portfolio. Architectural philosophy, material provenance, and smart-home integration detailed for the discerning buyer.",
}

function formatPrice(price?: number): string {
  if (!price) return "Price on Request"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price)
}

const DEFAULT_SMART_HOME: { icon: LucideIcon; label: string; detail: string }[] = [
  { icon: Wifi, label: "Integrated Automation", detail: "Full-residence smart home with voice, touch, and geofence activation." },
  { icon: Shield, label: "Fortified Perimeter", detail: "Biometric entry and enterprise-grade security." },
  { icon: Thermometer, label: "Climate Intelligence", detail: "Precision climate control with per-room optimization." },
  { icon: Eye, label: "Art Lighting", detail: "Museum-grade lighting for displayed collections." },
]

function normalizeForCollection(p: Property) {
  const imageUrl =
    p.mainImage?.asset?.url ||
    (p.mainImage ? urlFor(p.mainImage).width(1200).url() : "/images/listing-1.jpg")
  const materials =
    p.materialSpecs?.map(
      (m) =>
        [m.material, m.origin, m.application].filter(Boolean).join(" — ") || m.material
    ) || []
  return {
    id: p._id,
    slug: p.slug,
    title: p.title,
    subtitle: p.architecturalDNA?.style || p.propertyType || "Luxury Residence",
    address: p.location || "Miami, FL",
    price: formatPrice(p.price),
    beds: p.bedrooms || 0,
    baths: p.bathrooms || 0,
    sqft: p.sqFt ? p.sqFt.toLocaleString() : "N/A",
    tag: p.status === "pre-launch" ? "Pre-Launch" : "Exclusive",
    image: imageUrl,
    narrative: sanitizeForDisplay(p.luxuryDescription) || "An exceptional architectural masterpiece in Miami's most coveted enclave.",
    materials: materials.length > 0 ? materials : ["Hand-selected materials from international sources", "Architect-designed interiors", "Custom millwork and finishes"],
    philosophy: sanitizeForDisplay(p.architecturalDNA?.designPhilosophy) || "A residence that balances structural ambition with emotional restraint, designed for the discerning collector.",
    smartHome: DEFAULT_SMART_HOME,
  }
}

export default async function CollectionPage() {
  const sanityProperties = await getCollectionProperties()
  const sanityCollection =
    sanityProperties.length > 0
      ? sanityProperties.slice(0, 3).map(normalizeForCollection)
      : undefined

  return <CollectionClient sanityCollection={sanityCollection} />
}
