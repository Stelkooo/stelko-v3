import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'tag',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
});
