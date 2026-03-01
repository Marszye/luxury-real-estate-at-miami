import { Metadata } from "next"
import { BlogClient } from "./blog-client"

export const metadata: Metadata = {
  title: "Investment Blog",
  description:
    "Tax benefits for tech migration, ultra-luxury AI-ready homes, and strategic insights for Miami real estate investors.",
}

export default function BlogPage() {
  return <BlogClient />
}
