import {groq} from 'next-sanity'
import {sanityClient} from './sanity.client'

export interface SanityImageRef {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
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

// All properties (primary details)
export const allPropertiesQuery = groq`*[_type == "property"]|order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  price,
  location,
  bedrooms,
  bathrooms,
  sqFt,
  mainImage,
  gallery[0],
}`

// Single property by slug (detail view)
export const propertyBySlugQuery = groq`*[_type == "property" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  price,
  location,
  bedrooms,
  bathrooms,
  sqFt,
  mainImage,
  gallery,
  description,
  advisor->{
    _id,
    name,
    role,
    portraitImage,
    languages,
    email,
    phone
  }
}`

// All advisors
export const allAdvisorsQuery = groq`*[_type == "advisor"]|order(name asc){
  _id,
  name,
  role,
  bio,
  portraitImage,
  languages,
  email,
  phone
}`

export async function getAllProperties() {
  try {
    return await sanityClient.fetch<Property[]>(allPropertiesQuery)
  } catch {
    return []
  }
}

export async function getPropertyBySlug(slug: string) {
  try {
    return await sanityClient.fetch<Property | null>(propertyBySlugQuery, {slug})
  } catch {
    return null
  }
}

export async function getAllAdvisors() {
  try {
    return await sanityClient.fetch<Advisor[]>(allAdvisorsQuery)
  } catch {
    return []
  }
}

