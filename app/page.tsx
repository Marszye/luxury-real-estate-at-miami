import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { MarqueeBanner } from "@/components/marquee-banner"
import { FeaturedListings } from "@/components/featured-listings"
import { NeighborhoodGuide } from "@/components/neighborhood-guide"
import { MarketInsights } from "@/components/market-insights"
import { WhyMaison } from "@/components/why-maison"
import { TeamSection } from "@/components/team-section"
import { TestimonialsAndPress } from "@/components/testimonials-press"
import { ScheduleTour } from "@/components/schedule-tour"
import { AIConcierge } from "@/components/ai-concierge"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <MarqueeBanner />
      <FeaturedListings />
      <NeighborhoodGuide />
      <MarketInsights />
      <WhyMaison />
      <TeamSection />
      <TestimonialsAndPress />
      <ScheduleTour />
      <Footer />
      <AIConcierge />
    </main>
  )
}
