import { UserRound } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'testimonial',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare({ name }) {
      return {
        title: name,
        media: UserRound,
      };
    },
  },
});
