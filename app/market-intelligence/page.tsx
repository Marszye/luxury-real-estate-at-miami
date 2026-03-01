import { Metadata } from "next"
import { MarketIntelligenceClient } from "./market-intelligence-client"

export const metadata: Metadata = {
  title: "Market Intelligence",
  description:
    "ROI forecasts, AI-driven migration analysis, and the Luxury Lifestyle Index. Proprietary intelligence for decisive capital allocation in Miami real estate.",
}

export default function MarketIntelligencePage() {
  return <MarketIntelligenceClient />
}
