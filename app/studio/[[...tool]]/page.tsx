/**
 * Embedded Sanity Studio for marszye Luxury Real Estate.
 * Obsidian & Gold branding applied via sanity.config theme.
 * Uses force-dynamic for real-time editing (no CDN caching).
 */

import { NextStudio } from "next-sanity/studio"
import config from "../../../sanity.config"

export const dynamic = "force-dynamic"

export { metadata, viewport } from "next-sanity/studio"

export default function StudioPage() {
  return <NextStudio config={config} />
}
