import { groq } from "next-sanity"
import { hasSanityEnv, sanityFetchWithISR } from "./sanity.client"

// ---------------------------------------------------------------------------
// Shared image projection — resolves asset URL + preserves hotspot/crop
// ---------------------------------------------------------------------------
const imageProjection = `{
  _type,
  _key,
  asset->{ _id, url, metadata { dimensions, lqip } },
  hotspot,
  crop,
  alt
}`

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface SanityImageRef {
  _type: "image"
  _key?: string
  asset: {
    _id?: string
    _ref?: string
    _type?: "reference"
    url?: string
    metadata?: { dimensions?: { width: number; height: number }; lqip?: string }
  }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
}

export interface ROIData {
  annualReturn?: number
  appreciationRate?: number
  rentalYield?: number
  projectedGrowth?: string
}

export interface MaterialSpec {
  material: string
  origin?: string
  application?: string
}

export interface ArchitecturalDNA {
  style?: string
  architect?: string
  designPhilosophy?: string
  signature_elements?: string[]
}

export interface Property {
  _id: string
  title: string
  slug: string
  price?: number
  location?: string
  bedrooms?: number
  bathrooms?: number
  sqFt?: number
  mainImage?: SanityImageRef
  gallery?: SanityImageRef[]
  description?: unknown
  luxuryDescription?: string
  roiData?: ROIData
  materialSpecs?: MaterialSpec[]
  architecturalDNA?: ArchitecturalDNA
  propertyType?: string
  status?: string
  featuredInCollection?: boolean
  advisor?: Advisor
}

export interface Advisor {
  _id: string
  name: string
  role?: string
  bio?: string
  portraitImage?: SanityImageRef
  languages?: string[]
  email?: string
  phone?: string
}

export interface MarketInsight {
  _id: string
  title: string
  slug: string
  category?: string
  summary?: string
  body?: unknown
  coverImage?: SanityImageRef
  publishedAt?: string
  readTime?: number
  author?: { name: string; image?: SanityImageRef }
  tags?: string[]
}

// ---------------------------------------------------------------------------
// GROQ: GET_PROPERTIES — primary listing view
// ---------------------------------------------------------------------------
export const GET_PROPERTIES = groq`*[_type == "property"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  price,
  location,
  bedrooms,
  bathrooms,
  sqFt,
  mainImage ${imageProjection},
  gallery[] ${imageProjection},
  luxuryDescription,
  propertyType,
  status,
  roiData {
    annualReturn,
    appreciationRate,
    rentalYield,
    projectedGrowth
  },
  materialSpecs[] {
    material,
    origin,
    application
  },
  architecturalDNA {
    style,
    architect,
    designPhilosophy,
    signature_elements
  }
}`

// ---------------------------------------------------------------------------
// GROQ: Single property by slug (detail view)
// ---------------------------------------------------------------------------
export const GET_PROPERTY_BY_SLUG = groq`*[_type == "property" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  price,
  location,
  bedrooms,
  bathrooms,
  sqFt,
  mainImage ${imageProjection},
  gallery[] ${imageProjection},
  description,
  luxuryDescription,
  propertyType,
  status,
  roiData {
    annualReturn,
    appreciationRate,
    rentalYield,
    projectedGrowth
  },
  materialSpecs[] {
    material,
    origin,
    application
  },
  architecturalDNA {
    style,
    architect,
    designPhilosophy,
    signature_elements
  },
  advisor-> {
    _id,
    name,
    role,
    portraitImage ${imageProjection},
    languages,
    email,
    phone
  }
}`

// ---------------------------------------------------------------------------
// GROQ: GET_MARKET_INSIGHTS — blog / research feed
// ---------------------------------------------------------------------------
export const GET_MARKET_INSIGHTS = groq`*[_type == "marketInsight"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  summary,
  coverImage ${imageProjection},
  publishedAt,
  readTime,
  author-> {
    name,
    "image": portraitImage ${imageProjection}
  },
  tags
}`

export const GET_MARKET_INSIGHT_BY_SLUG = groq`*[_type == "marketInsight" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  category,
  summary,
  body,
  coverImage ${imageProjection},
  publishedAt,
  readTime,
  author-> {
    name,
    "image": portraitImage ${imageProjection}
  },
  tags
}`

// ---------------------------------------------------------------------------
// GROQ: Collection properties (featured, for curated page)
// ---------------------------------------------------------------------------
export const GET_COLLECTION_PROPERTIES = groq`*[_type == "property" && featuredInCollection == true] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  price,
  location,
  bedrooms,
  bathrooms,
  sqFt,
  mainImage ${imageProjection},
  gallery[] ${imageProjection},
  luxuryDescription,
  materialSpecs[] {
    material,
    origin,
    application
  },
  architecturalDNA {
    style,
    architect,
    designPhilosophy,
    signature_elements
  }
}`

// ---------------------------------------------------------------------------
// GROQ: Advisors
// ---------------------------------------------------------------------------
export const GET_ADVISORS = groq`*[_type == "advisor"] | order(name asc) {
  _id,
  name,
  role,
  bio,
  portraitImage ${imageProjection},
  languages,
  email,
  phone
}`

// ---------------------------------------------------------------------------
// Legacy aliases for backward compatibility
// ---------------------------------------------------------------------------
export const allPropertiesQuery = GET_PROPERTIES
export const propertyBySlugQuery = GET_PROPERTY_BY_SLUG
export const allAdvisorsQuery = GET_ADVISORS

// ---------------------------------------------------------------------------
// Data fetchers with ISR (revalidate: 60)
// ---------------------------------------------------------------------------
export async function getAllProperties(): Promise<Property[]> {
  if (!hasSanityEnv) return []
  try {
    return await sanityFetchWithISR<Property[]>(GET_PROPERTIES, {}, 60)
  } catch {
    return []
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (!hasSanityEnv) return null
  try {
    return await sanityFetchWithISR<Property | null>(
      GET_PROPERTY_BY_SLUG,
      { slug },
      60,
    )
  } catch {
    return null
  }
}

export async function getAllAdvisors(): Promise<Advisor[]> {
  if (!hasSanityEnv) return []
  try {
    return await sanityFetchWithISR<Advisor[]>(GET_ADVISORS, {}, 60)
  } catch {
    return []
  }
}

export async function getMarketInsights(): Promise<MarketInsight[]> {
  if (!hasSanityEnv) return []
  try {
    return await sanityFetchWithISR<MarketInsight[]>(GET_MARKET_INSIGHTS, {}, 60)
  } catch {
    return []
  }
}

export async function getMarketInsightBySlug(
  slug: string,
): Promise<MarketInsight | null> {
  if (!hasSanityEnv) return null
  try {
    return await sanityFetchWithISR<MarketInsight | null>(
      GET_MARKET_INSIGHT_BY_SLUG,
      { slug },
      60,
    )
  } catch {
    return null
  }
}

export async function getCollectionProperties(): Promise<Property[]> {
  if (!hasSanityEnv) return []
  try {
    return await sanityFetchWithISR<Property[]>(GET_COLLECTION_PROPERTIES, {}, 60)
  } catch {
    return []
  }
}

// ---------------------------------------------------------------------------
// Portable Text typography mapper — strips markdown artifacts (***,---,etc)
// and returns clean text for framer-motion CinemaText rendering
// ---------------------------------------------------------------------------
export function sanitizeForDisplay(text: string | null | undefined): string {
  if (!text) return ""
  return text
    .replace(/\*{2,}/g, "")
    .replace(/_{2,}/g, "")
    .replace(/~{2,}/g, "")
    .replace(/^---+$/gm, "")
    .replace(/^===+$/gm, "")
    .replace(/^#{1,6}\s/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}
