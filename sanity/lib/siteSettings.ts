import { cache } from "react"
import { groq } from "next-sanity"
import { hasSanityEnv, sanityFetchWithISR } from "@/lib/sanity.client"

export type SiteSettings = {
  companyName: string
  primaryColor?: string
  accentColor?: string
  heroTitle?: string
  heroSubtitle?: string
  heroBgImageUrl?: string
  logoUrl?: string
  faviconUrl?: string
  seoTitle?: string
  seoDescription?: string
  aiName?: string
  aiWelcomeMessage?: string
  aiAvatarUrl?: string
  marqueeNeighborhoods?: string[]
}

export const siteSettingsFallback: Required<Pick<
  SiteSettings,
  "companyName" | "primaryColor" | "accentColor" | "heroTitle"
>> = {
  companyName: "Maison",
  primaryColor: "#1f1f1f",
  accentColor: "#c9a96e",
  heroTitle: "Luxury Real Estate Miami",
}

const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  companyName,
  primaryColor,
  accentColor,
  heroTitle,
  heroSubtitle,
  "heroBgImageUrl": heroBgImage.asset->url,
  "logoUrl": logo.asset->url,
  "faviconUrl": favicon.asset->url,
  seoTitle,
  seoDescription,
  aiName,
  aiWelcomeMessage,
  "aiAvatarUrl": aiAvatar.asset->url,
  marqueeNeighborhoods
}`

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!hasSanityEnv) {
    return siteSettingsFallback
  }

  try {
    const data = await sanityFetchWithISR<SiteSettings | null>(
      siteSettingsQuery,
      {},
      60,
    )

    return {
      ...siteSettingsFallback,
      ...(data ?? {}),
      companyName:
        data?.companyName?.trim() || siteSettingsFallback.companyName,
    }
  } catch {
    return siteSettingsFallback
  }
})

