'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { buildLegacyTheme } from 'sanity'

import { apiVersion, dataset, projectId } from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

const obsidianGoldTheme = buildLegacyTheme({
  '--black': '#0f0f0f',
  '--white': '#fafaf9',
  '--brand-primary': '#c9a96e',
  '--main-navigation-color': '#0f0f0f',
  '--main-navigation-color--inverted': '#fafaf9',
  '--focus-color': '#c9a96e',
  '--component-bg': '#1a1a1a',
  '--component-text-color': '#fafaf9',
  '--default-button-color': '#c9a96e',
  '--default-button-primary-color': '#c9a96e',
  '--state-info-color': '#c9a96e',
})

export default defineConfig({
  basePath: '/studio',
  projectId: projectId || 'missing-project-id',
  dataset: dataset || 'missing-dataset',
  title: 'Maison Studio',
  schema,
  theme: obsidianGoldTheme,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
