import { defineField, defineType } from "sanity"
import { HomeIcon } from "@sanity/icons"

export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "core", title: "Core Details", default: true },
    { name: "media", title: "Media" },
    { name: "investment", title: "Investment & ROI" },
    { name: "architecture", title: "Architecture & Materials" },
    { name: "relations", title: "Relations" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "core",
      validation: (Rule) =>
        Rule.required().min(1).error("A title is required for every property."),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "core",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) =>
        Rule.required().error(
          "Please generate a unique slug for this property.",
        ),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      group: "core",
      description: "Asking price in USD (numbers only).",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "core",
      description: "Neighborhood, city, or full address.",
    }),
    defineField({
      name: "propertyType",
      title: "Property Type",
      type: "string",
      group: "core",
      options: {
        list: [
          { title: "Penthouse", value: "penthouse" },
          { title: "Estate", value: "estate" },
          { title: "Condo", value: "condo" },
          { title: "Waterfront", value: "waterfront" },
          { title: "Villa", value: "villa" },
          { title: "Townhouse", value: "townhouse" },
        ],
      },
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "core",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Under Contract", value: "under-contract" },
          { title: "Sold", value: "sold" },
          { title: "Pre-Launch", value: "pre-launch" },
          { title: "Coming Soon", value: "coming-soon" },
        ],
      },
      initialValue: "active",
    }),
    defineField({
      name: "featuredInCollection",
      title: "Featured in Collection",
      type: "boolean",
      group: "core",
      description: "Show this property on the curated Collection page.",
      initialValue: false,
    }),
    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
      group: "core",
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
      group: "core",
    }),
    defineField({
      name: "sqFt",
      title: "Square Footage",
      type: "number",
      group: "core",
      description: "Interior living area in square feet.",
    }),

    // Media
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe this image for accessibility and SEO.",
        }),
      ],
      description: "Primary hero image for this property listing.",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        },
      ],
      options: { layout: "grid" },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      group: "core",
      of: [{ type: "block" }],
      description: "Marketing description and key highlights.",
    }),
    defineField({
      name: "luxuryDescription",
      title: "Luxury Description",
      type: "text",
      group: "core",
      rows: 5,
      description:
        "Short, cinematic narrative for the property. Rendered with streaming text animation on the frontend.",
    }),

    // Investment & ROI
    defineField({
      name: "roiData",
      title: "ROI Data",
      type: "object",
      group: "investment",
      fields: [
        defineField({
          name: "annualReturn",
          title: "Annual Return (%)",
          type: "number",
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: "appreciationRate",
          title: "Appreciation Rate (%)",
          type: "number",
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: "rentalYield",
          title: "Rental Yield (%)",
          type: "number",
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: "projectedGrowth",
          title: "Projected Growth Summary",
          type: "string",
          description: "e.g. '18-24% projected appreciation over 3 years'",
        }),
      ],
    }),

    // Architecture & Materials
    defineField({
      name: "materialSpecs",
      title: "Material Specifications",
      type: "array",
      group: "architecture",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "material",
              title: "Material",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "origin",
              title: "Origin",
              type: "string",
              description: "e.g. Italian Carrara, Brazilian Quartzite",
            }),
            defineField({
              name: "application",
              title: "Application",
              type: "string",
              description: "e.g. Master Bath Flooring, Kitchen Countertops",
            }),
          ],
          preview: {
            select: { title: "material", subtitle: "origin" },
          },
        },
      ],
    }),
    defineField({
      name: "architecturalDNA",
      title: "Architectural DNA",
      type: "object",
      group: "architecture",
      fields: [
        defineField({
          name: "style",
          title: "Architectural Style",
          type: "string",
          description: "e.g. Contemporary Minimalism, Art Deco Revival",
        }),
        defineField({
          name: "architect",
          title: "Architect / Firm",
          type: "string",
        }),
        defineField({
          name: "designPhilosophy",
          title: "Design Philosophy",
          type: "text",
          rows: 4,
          description:
            "The creative vision behind this property. Rendered with cinema text animation.",
        }),
        defineField({
          name: "signature_elements",
          title: "Signature Elements",
          type: "array",
          of: [{ type: "string" }],
          description:
            "Key design features, e.g. Floor-to-ceiling glass, Cantilevered infinity pool",
        }),
      ],
    }),

    // Relations
    defineField({
      name: "advisor",
      title: "Primary Advisor",
      type: "reference",
      group: "relations",
      to: [{ type: "advisor" }],
      weak: false,
      description: "Lead advisor responsible for this listing.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "mainImage",
    },
  },
})

export const propertyIcon = HomeIcon
