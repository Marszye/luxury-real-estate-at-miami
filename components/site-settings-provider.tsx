"use client"

import { createContext, useContext, useMemo } from "react"
import type { SiteSettings } from "@/sanity/lib/siteSettings"
import { siteSettingsFallback } from "@/sanity/lib/siteSettings"

type SiteSettingsContextValue = {
  settings: Required<
    Pick<
      SiteSettings,
      "companyName" | "primaryColor" | "accentColor" | "heroTitle"
    >
  > &
    Pick<SiteSettings, "logoUrl" | "faviconUrl" | "seoTitle" | "seoDescription">
}

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null)

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings?: SiteSettings | null
  children: React.ReactNode
}) {
  const value = useMemo<SiteSettingsContextValue>(() => {
    const merged = {
      ...siteSettingsFallback,
      ...(settings ?? {}),
    }

    return {
      settings: {
        companyName: (merged.companyName || siteSettingsFallback.companyName).trim(),
        primaryColor: merged.primaryColor || siteSettingsFallback.primaryColor,
        accentColor: merged.accentColor || siteSettingsFallback.accentColor,
        heroTitle: merged.heroTitle || siteSettingsFallback.heroTitle,
        logoUrl: merged.logoUrl,
        faviconUrl: merged.faviconUrl,
        seoTitle: merged.seoTitle,
        seoDescription: merged.seoDescription,
      },
    }
  }, [settings])

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings(): SiteSettingsContextValue["settings"] {
  const ctx = useContext(SiteSettingsContext)
  if (ctx?.settings) return ctx.settings
  return {
    ...siteSettingsFallback,
    logoUrl: undefined,
    faviconUrl: undefined,
    seoTitle: undefined,
    seoDescription: undefined,
  }
}

