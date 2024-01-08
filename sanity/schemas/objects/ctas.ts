import { defineField } from 'sanity';

export default defineField({
  title: 'CTAs',
  name: 'ctas',
  type: 'object',
  fields: [
    defineField({
      title: 'Primary CTA',
      name: 'primaryCta',
      type: 'navLink',
    }),
    defineField({
      title: 'Secondary CTA',
      name: 'secondaryCta',
      type: 'navLink',
    }),
  ],
});
