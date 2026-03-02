import type { StructureResolver } from "sanity/structure"
import { CogIcon } from "@sanity/icons"
import { propertyIcon } from "./schemaTypes/property"
import { leadIcon } from "./schemaTypes/lead"
import { marketInsightIcon } from "./schemaTypes/marketInsight"

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),
      S.divider(),
      S.listItem()
        .title("Properties")
        .icon(propertyIcon)
        .child(S.documentTypeList("property").title("Properties")),
      S.listItem()
        .title("Market Insights")
        .icon(marketInsightIcon)
        .child(S.documentTypeList("marketInsight").title("Market Insights")),
      S.divider(),
      S.listItem()
        .title("Lead Vault")
        .icon(leadIcon)
        .child(
          S.documentTypeList("lead")
            .title("Leads")
            .defaultOrdering([{ field: "capturedAt", direction: "desc" }]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() !== "property" &&
          item.getId() !== "siteSettings" &&
          item.getId() !== "lead" &&
          item.getId() !== "marketInsight",
      ),
    ])
