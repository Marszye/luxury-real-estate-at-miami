import dynamic from "next/dynamic"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { MarqueeBanner } from "@/components/marquee-banner"
import { MarketInsights } from "@/components/market-insights"
import { AIConciergeLazy } from "@/components/ai-concierge-lazy"
import { getSiteSettings } from "@/sanity/lib/siteSettings"
import { getAllProperties, getMarketInsights } from "@/lib/queries"

export const revalidate = 60

function SectionPlaceholder({ minHeight }: { minHeight: string }) {
  return (
    <section
      aria-hidden="true"
      className="w-full animate-pulse bg-background/40"
      style={{ minHeight }}
    />
  )
}

const FeaturedListings = dynamic(
  () => import("@/components/featured-listings").then((mod) => mod.FeaturedListings),
  {
    loading: () => <SectionPlaceholder minHeight="980px" />,
  }
)

const NeighborhoodGuide = dynamic(
  () => import("@/components/neighborhood-guide").then((mod) => mod.NeighborhoodGuide),
  {
    loading: () => <SectionPlaceholder minHeight="980px" />,
  }
)

const WhyMaison = dynamic(
  () => import("@/components/why-maison").then((mod) => mod.WhyMaison),
  {
    loading: () => <SectionPlaceholder minHeight="1200px" />,
  }
)

const TeamSection = dynamic(
  () => import("@/components/team-section").then((mod) => mod.TeamSection),
  {
    loading: () => <SectionPlaceholder minHeight="1000px" />,
  }
)

const TestimonialsAndPress = dynamic(
  () =>
    import("@/components/testimonials-press").then(
      (mod) => mod.TestimonialsAndPress
    ),
  {
    loading: () => <SectionPlaceholder minHeight="900px" />,
  }
)

const ScheduleTour = dynamic(
  () => import("@/components/schedule-tour").then((mod) => mod.ScheduleTour),
  {
    loading: () => <SectionPlaceholder minHeight="980px" />,
  }
)

const Footer = dynamic(
  () => import("@/components/footer").then((mod) => mod.Footer),
  {
    loading: () => <SectionPlaceholder minHeight="1200px" />,
  }
)

export default async function Home() {
  const [settings, sanityProperties, sanityInsights] = await Promise.all([
    getSiteSettings(),
    getAllProperties(),
    getMarketInsights(),
  ])

  return (
    <main>
      <Navigation />
      <HeroSection />
      <MarqueeBanner />
      <FeaturedListings
        sanityProperties={
          sanityProperties.length > 0 ? sanityProperties : undefined
        }
      />
      <NeighborhoodGuide />
      <MarketInsights sanityInsights={sanityInsights.length > 0 ? sanityInsights : undefined} />
      <WhyMaison companyName={settings.companyName} />
      <TeamSection companyName={settings.companyName} />
      <TestimonialsAndPress />
      <ScheduleTour />
      <Footer />
      <AIConciergeLazy />
    </main>
  )
}
