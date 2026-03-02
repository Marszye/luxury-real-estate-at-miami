/**
 * Production Sanity client configuration for marszye Luxury Real Estate SaaS.
 * - useCdn: true for blazing-fast global delivery (production)
 * - useCdn: false for real-time data (API routes, draft preview via /api/draft)
 * - SANITY_API_TOKEN: server-only, never exposed to browser
 */

import { createClient, type QueryParams } from "next-sanity"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-01"

export const hasSanityEnv = Boolean(projectId && dataset)

/** Server client: useCdn: false — for real-time data (API routes, draft preview) */
export const sanityClient = createClient({
  projectId: projectId || "missing-project-id",
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
})

/** CDN client: useCdn: true — for blazing-fast global delivery (production) */
export const sanityCdnClient = createClient({
  projectId: projectId || "missing-project-id",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
})

/** Write client: token required — server-only, never in client bundles */
export const sanityWriteClient = createClient({
  projectId: projectId || "missing-project-id",
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const sanityClientConfigured = hasSanityEnv

/**
 * ISR fetch: uses CDN for blazing-fast global delivery.
 * Revalidation period (default 60s) for Incremental Static Regeneration.
 * For draft preview, use /api/draft then sanityClient directly.
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
