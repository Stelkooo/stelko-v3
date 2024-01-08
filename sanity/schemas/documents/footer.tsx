import { Anchor } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'footer',
  type: 'document',
  fields: [
    defineField({
      title: 'Navigation Links',
      name: 'navLinks',
      type: 'array',
      of: [defineArrayMember({ type: 'navLink' })],
    }),
    defineField({
      name: 'policies',
      type: 'array',
      of: [defineArrayMember({ type: 'navLink' })],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer',
        media: Anchor,
      };
    },
  },
});
