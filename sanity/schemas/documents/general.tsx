import { Settings } from 'lucide-react';
import { defineField, defineType } from 'sanity';

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
