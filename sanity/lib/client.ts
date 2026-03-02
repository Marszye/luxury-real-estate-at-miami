import { createClient } from "next-sanity"
import { apiVersion, dataset, hasSanityEnv, projectId } from "../env"

export const client = createClient({
  projectId: projectId || "missing-project-id",
  dataset: dataset || "missing-dataset",
  apiVersion,
  useCdn: true,
})

export const sanityConfigured = hasSanityEnv
