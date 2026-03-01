import { cache } from "react"
import { groq } from "next-sanity"
import { client } from "./client"
import { hasSanityEnv } from "../env"

export type SiteSettings = {
  companyName: string
  primaryColor?: string
  accentColor?: string
  heroTitle?: string
  logoUrl?: string
  faviconUrl?: string
  seoTitle?: string
  seoDescription?: string
}

export const siteSettingsFallback: Required<Pick<
  SiteSettings,
  "companyName" | "primaryColor" | "accentColor" | "heroTitle"
>> = {
  companyName: "Maison",
  // Defaults are aligned with the existing design language.
  primaryColor: "#1f1f1f",
  accentColor: "#c9a96e",
  heroTitle: "Luxury Real Estate Miami",
}

const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  companyName,
  primaryColor,
  accentColor,
  heroTitle,
  "logoUrl": logo.asset->url,
  "faviconUrl": favicon.asset->url,
  seoTitle,
  seoDescription
}`

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!hasSanityEnv) {
    return siteSettingsFallback
  }

  try {
    const data = await client.fetch<SiteSettings>(
      siteSettingsQuery,
      {},
      { next: { revalidate: 60 } }
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

