/**
 * Production Sanity client configuration for marszye Luxury Real Estate SaaS.
 *
 * useCdn: false for Studio route and API routes (real-time editing, draft preview)
 * useCdn: true for public property pages (0.1s loading, blazing-fast global delivery)
 *
 * Env vars (required in production):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   NEXT_PUBLIC_SANITY_API_VERSION
 *   SANITY_API_TOKEN (server-only, never exposed to browser)
 */

import { createClient, type QueryParams } from "next-sanity"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-01"

export const hasSanityEnv = Boolean(projectId && dataset)

/** Server client: useCdn false for real-time data (Studio, API routes, draft preview) */
export const sanityClient = createClient({
  projectId: projectId || "missing-project-id",
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
})

/** CDN client: useCdn true for public property pages (0.1s loading speed) */
export const sanityCdnClient = createClient({
  projectId: projectId || "missing-project-id",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
})

/** Write client: token required, server-only, never in client bundles */
export const sanityWriteClient = createClient({
  projectId: projectId || "missing-project-id",
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const sanityClientConfigured = hasSanityEnv

/**
 * ISR fetch for public pages: uses CDN for blazing-fast global delivery.
 * Used by property pages, collection, market-intelligence, blog.
 * Revalidation via webhook at /api/revalidate when Sanity content changes.
 */
export async function sanityFetchWithISR<T>(
  query: string,
  params: QueryParams = {},
  revalidate = 60,
): Promise<T> {
  return sanityCdnClient.fetch<T>(query, params, {
    next: { revalidate, tags: ["sanity"] },
  })
}

export default sanityClient
