import { defineField } from 'sanity';

export default defineField({
  title: 'Relative address on the website',
  description: 'https://stelko.xyz/about',
  name: 'slug',
  type: 'slug',
  group: 'seo',
  validation: (rule) => rule.required(),
});
