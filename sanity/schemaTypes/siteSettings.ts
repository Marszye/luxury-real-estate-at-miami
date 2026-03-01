import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'brand', title: 'Brand', default: true },
    { name: 'visuals', title: 'Visuals' },
    { name: 'hero', title: 'Hero Content' },
    { name: 'aiPersona', title: 'AI Persona' },
  ],
  fields: [
    // Brand
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      group: 'brand',
      validation: (Rule) =>
        Rule.required().min(1).error('Company name is required.'),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'brand',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'brand',
      options: { hotspot: true },
      description: 'Small icon for browser tab (e.g. 32×32 or 64×64).',
    }),
    // Visuals
    defineField({
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'string',
      group: 'visuals',
      description: 'Hex color (e.g. #1a1a1a).',
      validation: (Rule) =>
        Rule.regex(hexRegex).error('Use a valid hex color (e.g. #1a1a1a).'),
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      group: 'visuals',
      description: 'Hex color (e.g. #c9a227).',
      validation: (Rule) =>
        Rule.regex(hexRegex).error('Use a valid hex color (e.g. #c9a227).'),
    }),
    defineField({
      name: 'fontFamily',
      title: 'Font Family',
      type: 'string',
      group: 'visuals',
      description: 'CSS font family (e.g. Inter, "Source Sans 3").',
    }),
    // Hero Content
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'hero',
      description: 'Optional override for <title> and social titles.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'hero',
      rows: 3,
      description: 'Optional override for meta description and social cards.',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      group: 'hero',
      rows: 3,
    }),
    defineField({
      name: 'heroBgImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),
    // AI Persona
    defineField({
      name: 'aiName',
      title: 'AI Name',
      type: 'string',
      group: 'aiPersona',
      description: 'Display name for the AI assistant.',
    }),
    defineField({
      name: 'aiWelcomeMessage',
      title: 'AI Welcome Message',
      type: 'text',
      group: 'aiPersona',
      rows: 4,
      description: 'Message shown when the user opens the chat.',
    }),
    defineField({
      name: 'aiAvatar',
      title: 'AI Avatar',
      type: 'image',
      group: 'aiPersona',
      options: { hotspot: true },
    }),
  ],
})
