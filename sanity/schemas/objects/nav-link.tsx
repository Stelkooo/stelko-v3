import { defineField } from 'sanity';

export default defineField({
  name: 'navLink',
  type: 'object',
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'link',
      type: 'link',
    }),
  ],
});
