import type { Metadata } from "next"
import { NeighborhoodsClient } from "./neighborhoods-client"

export const metadata: Metadata = {
  title: "Neighborhoods",
  description:
    "Explore Miami's most exclusive neighborhoods. ROI data, architectural DNA, and lifestyle profiles for Brickell, Design District, Star Island, and more.",
}

export default function NeighborhoodsPage() {
  return <NeighborhoodsClient />
}
