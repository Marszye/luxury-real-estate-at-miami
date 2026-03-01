import { Metadata } from "next"
import { PropertyShowcaseClient } from "./property-showcase-client"

export const metadata: Metadata = {
  title: "Ultra-Luxury Showcase",
  description:
    "Statuario marble, Savant smart home, and Architectural DNA analysis. A complete specification for the discerning buyer.",
}

export default function UltraLuxuryShowcasePage() {
  return <PropertyShowcaseClient />
}
