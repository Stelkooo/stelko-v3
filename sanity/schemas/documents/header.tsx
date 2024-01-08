import { Globe } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'header',
  type: 'document',
  fields: [
    defineField({
      name: 'navLinks',
      type: 'array',
      of: [defineArrayMember({ type: 'navLink' })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta',
      type: 'navLink',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Header',
        media: Globe,
      };
    },
  },
});
