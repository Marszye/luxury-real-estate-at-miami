import { createClient } from "next-sanity"
import { apiVersion, dataset, hasSanityEnv, projectId } from "@/sanity/env"

export const sanityClient = createClient({
  projectId: projectId || "missing-project-id",
  dataset: dataset || "production",
  apiVersion: apiVersion || "2026-02-27",
  useCdn: false,
})

export const sanityClientConfigured = hasSanityEnv

export default sanityClient

