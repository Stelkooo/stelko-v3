import { defineField, defineType } from 'sanity';

import { techCategories } from '@/lib/constants';

export default defineType({
  name: 'tech',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        layout: 'radio',
        list: techCategories,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'customImage',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'image',
      category: 'category',
    },
    prepare({ image, name, category }) {
      return {
        title: name,
        subtitle: category,
        media: image,
      };
    },
  },
});
