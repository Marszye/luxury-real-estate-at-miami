import { Metadata } from "next"
import { CollectionClient } from "./collection-client"

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Three extraordinary residences selected from our private portfolio. Architectural philosophy, material provenance, and smart-home integration detailed for the discerning buyer.",
}

export default function CollectionPage() {
  return <CollectionClient />
}
