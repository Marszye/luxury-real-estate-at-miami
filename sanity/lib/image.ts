import createImageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({
  projectId: projectId || "missing-project-id",
  dataset,
})

export const urlFor = (source: SanityImageSource) => builder.image(source)

/**
 * Optimized for next/image + Cinema Motion (60fps).
 * Returns URL with width, quality, format auto (avif/webp), and hotspot/crop.
 */
export function buildSanityImageUrl(
  source: SanityImageSource | null | undefined,
  options: {
    width?: number
    height?: number
    quality?: number
    fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min"
  } = {},
): string | null {
  if (!source) return null
  const { width = 1200, quality = 85, fit = "crop" } = options
  try {
    return urlFor(source)
      .width(width)
      .quality(quality)
      .fit(fit)
      .auto("format")
      .url()
  } catch {
    return null
  }
}
