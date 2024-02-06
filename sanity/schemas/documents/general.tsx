import { Settings } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  title: 'General Settings',
  name: 'general',
  type: 'document',
  fields: [
    defineField({
      title: 'Contact Info',
      name: 'contactInfo',
      type: 'object',
      options: {
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'email',
          type: 'string',
          validation: (rule) => rule.email(),
        }),
      ],
    }),
    defineField({ name: 'socials', type: 'socials' }),
    defineField({ name: 'ogImage', type: 'customImage' }),
    defineField({
      name: 'redirects',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'source',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'destination',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'permanent',
              type: 'boolean',
              initialValue: () => true,
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'General Settings',
        media: Settings,
      };
    },
  },
});
