import {type SchemaTypeDefinition} from 'sanity'
import {property} from './property'
import {advisor} from './advisor'
import {siteSettings} from './siteSettings'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [property, advisor, siteSettings],
}
