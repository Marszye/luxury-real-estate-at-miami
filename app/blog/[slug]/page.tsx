import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArticleClient } from "./article-client"

const articles: Record<
  string,
  { title: string; category: string; date: string; readTime: string; content: string[] }
> = {
  "tax-benefits-tech-migration-miami": {
    title: "Tax Benefits for Tech Migration in Miami",
    category: "Tax Strategy",
    date: "February 2026",
    readTime: "14 min read",
    content: [
      "Florida's zero state income tax has created a historic wealth migration corridor from California and New York. Tech executives relocating to Miami can eliminate up to 13.3% in state income tax while preserving their equity compensation structures.",
      "The SALT cap, introduced in 2017, limited the federal deduction for state and local taxes to $10,000. For high earners in California (13.3% top rate) and New York (10.9%), this effectively made every dollar of state tax a direct cost. Florida's zero rate removes that burden entirely.",
      "Residency requirements are straightforward but must be documented. The IRS uses a facts-and-circumstances test: where do you vote, where is your driver's license, where do your children attend school, where do you receive mail? Establishing a primary residence in Miami before vesting equity or receiving bonuses is critical.",
      "For tech executives with RSUs and stock options, timing matters. Vesting events that occur after establishing Florida residency are taxed at the federal level only. A pre-vesting relocation can save millions on a single grant. Our advisors work with tax counsel to structure moves that optimize for both lifestyle and tax efficiency.",
      "Miami's appeal extends beyond tax. The city has become a hub for tech talent, VC capital, and remote work. The infrastructure for high-net-worth individuals is mature: private banking, family offices, and legal counsel specializing in residency are all readily available.",
    ],
  },
  "rise-ultra-luxury-ai-ready-homes": {
    title: "The Rise of Ultra-Luxury AI-Ready Homes",
    category: "Market Intelligence",
    date: "January 2026",
    readTime: "12 min read",
    content: [
      "The next generation of trophy residences is being built with AI-first infrastructure. From smart home systems that learn occupant preferences to integrated security that anticipates threats, Miami's most ambitious developments are redefining what luxury means.",
      "Properties with Savant, Control4, and custom AI integrations are commanding premiums of 18% to 32% over comparable conventional homes. The premium reflects not just the cost of the technology but the value of convenience, security, and future-proofing.",
      "Savant Pro is the dominant platform in ultra-luxury new construction. It offers 34 zones of control, voice activation, geofencing, and Apple HomeKit compatibility. The system learns: within 72 hours it begins pre-conditioning spaces based on calendar and proximity data.",
      "Security has evolved from cameras and alarms to predictive systems. AI motion analysis can distinguish between a delivery person and an intruder. License plate recognition at the gate integrates with a guest list. Safe rooms are standard in properties above $15M.",
      "The trend is accelerating. Every major new development in Brickell, Edgewater, and Miami Beach is specifying AI-ready infrastructure. Builders who omit it are finding buyers demanding retrofits, which cost 40% more than integrated installation.",
    ],
  },
  "capital-preservation-miami-real-estate": {
    title: "Capital Preservation: Why Miami Real Estate Outperforms Traditional Asset Classes",
    category: "Investment Analysis",
    date: "December 2025",
    readTime: "10 min read",
    content: [
      "In a macro environment of persistent inflation and geopolitical uncertainty, dollar-denominated hard assets in tax-advantaged jurisdictions have outperformed equities and bonds. Miami's unique combination of zero state tax, international buyer demand, and supply constraints has created a 14.2% annualized return profile for waterfront properties.",
      "The S&P 500 returned 10.2% over the same period. Investment-grade bonds returned 4.1%. Miami waterfront real estate returned 14.2%, with lower volatility and a tangible asset that provides use value (a place to live) in addition to financial return.",
      "Supply constraints are structural. Miami-Dade has limited new waterfront land. The approval process for new development is lengthy. Pre-construction inventory is selling out before groundbreaking. For existing stock, the average days on market for properties above $5M has fallen to 42 days.",
      "International demand is the wild card. Latin American buyers seeking capital preservation, European buyers seeking dollar diversification, and Northeast buyers seeking tax arbitrage have created a buyer pool that is less sensitive to interest rates than domestic buyers.",
      "The outlook for 2026 remains optimistic. Migration capital flows continue. Institutional capital is entering the market through build-to-rent and single-family rental. The Miami luxury segment is no longer a niche; it is a recognized asset class.",
    ],
  },
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = articles[slug]
  if (!article) return {}
  return {
    title: article.title,
    description: article.content[0]?.slice(0, 160) ?? article.title,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = articles[slug]
  if (!article) notFound()
  return <ArticleClient article={article} slug={slug} />
}
