import type { Metadata } from "next"
import { ServicesClient } from "./services-client"

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI Portfolio Analysis, Private Yacht Docking Management, 24/7 White-Glove Concierge, and bespoke real estate services for ultra-high-net-worth clients.",
}

export default function ServicesPage() {
  return <ServicesClient />
}
