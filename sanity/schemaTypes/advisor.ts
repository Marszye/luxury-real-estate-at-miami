import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const advisor = defineType({
  name: 'advisor',
  title: 'Advisor',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required().min(1).error('Each advisor must have a name.'),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. Senior Property Advisor, Managing Partner.',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portrait Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of spoken languages, e.g. English, Spanish, French.',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) =>
        Rule.email().warning('This should be a valid email address.'),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
  ],
})

export const advisorIcon = UserIcon

