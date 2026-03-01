import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const property = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) =>
        Rule.required().min(1).error('A title is required for every property.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) =>
        Rule.required().error('Please generate a unique slug for this property.'),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Enter the asking price in USD (numbers only).',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Neighborhood, city, or full address.',
    }),
    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
    }),
    defineField({
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
    }),
    defineField({
      name: 'sqFt',
      title: 'Square Footage',
      type: 'number',
      description: 'Interior living area in square feet.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Primary hero image for this property listing.',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Marketing description and key highlights for the property.',
    }),
    defineField({
      name: 'advisor',
      title: 'Primary Advisor',
      type: 'reference',
      to: [{type: 'advisor'}],
      weak: false,
      description: 'Lead advisor responsible for this listing.',
    }),
  ],
})

export const propertyIcon = HomeIcon

