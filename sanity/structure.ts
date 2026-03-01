import type { StructureResolver } from 'sanity/structure'
import { CogIcon } from '@sanity/icons'
import { propertyIcon } from './schemaTypes/property'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton: Site Settings (single instance)
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
      S.divider(),
      S.listItem()
        .title('Properties')
        .icon(propertyIcon)
        .child(S.documentTypeList('property').title('Properties')),
      S.divider(),
      // Other document types (exclude property and siteSettings to avoid duplicates)
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'property' && item.getId() !== 'siteSettings'
      ),
    ])
