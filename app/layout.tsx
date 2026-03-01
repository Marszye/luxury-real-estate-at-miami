import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Geist } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import { getSiteSettings, siteSettingsFallback } from '@/sanity/lib/siteSettings'
import { SiteSettingsProvider } from '@/components/site-settings-provider'
import { LeadProvider } from '@/src/context/lead-context'
import { PageTransition } from '@/components/page-transition'
import { HashScrollHandler } from '@/components/hash-scroll-handler'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maison-miami.com'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const companyName = settings.companyName || siteSettingsFallback.companyName
  const heroTitle = settings.seoTitle || settings.heroTitle || siteSettingsFallback.heroTitle
  const description =
    settings.seoDescription ||
    `Discover extraordinary waterfront properties and ultra-luxury residences in Miami. ${companyName} — your exclusive gateway to the finest real estate in South Florida.`
  const faviconUrl = settings.faviconUrl

  return {
    title: {
      default: `${companyName} | ${heroTitle}`,
      template: `%s | ${companyName}`,
    },
    description,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: `${companyName} | ${heroTitle}`,
      description,
      url: siteUrl,
      siteName: companyName,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${companyName} | ${heroTitle}`,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: faviconUrl ? [{ url: faviconUrl }] : undefined,
      apple: faviconUrl || undefined,
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getSiteSettings()

  const primary = settings.primaryColor || siteSettingsFallback.primaryColor
  const accent = settings.accentColor || siteSettingsFallback.accentColor

  const cssVars: Record<string, string> = {
    '--dynamic-primary': primary,
    '--dynamic-accent': accent,
  }

  return (
    <html lang="en" style={cssVars as React.CSSProperties}>
      <body
        className={`${playfair.variable} ${inter.variable} ${geist.variable} font-sans antialiased`}
      >
        <SiteSettingsProvider settings={settings}>
          <LeadProvider>
            <HashScrollHandler />
            <PageTransition>{children}</PageTransition>
          </LeadProvider>
        </SiteSettingsProvider>
        <Toaster
          richColors
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
            },
          }}
        />
      </body>
    </html>
  )
}
