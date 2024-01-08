import { defineField } from 'sanity';

export default defineField({
  name: 'socials',
  type: 'object',
  options: {
    collapsible: true,
    columns: 2,
  },
  fields: [
    defineField({
      title: 'LinkedIn',
      name: 'linkedin',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'GitHub',
      name: 'github',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
});
