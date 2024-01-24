import { defineField } from 'sanity';

export default defineField({
  title: 'SEO and social',
  name: 'seoAndSocial',
  type: 'object',
  group: 'seo',
  fields: [
    defineField({
      title: 'Title for SEO and social sharing (meta title)',
      description:
        'Make it as enticing as possible to convert users in social feeds and Google searches. Ideally between 15 and 70 characters.',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Short paragraph for SEO and social sharing (meta description)',
      description:
        'Optional but highly encouraged as it will help you convert more visitors from Google and social. Ideally between 70 and 160 characters.',
      name: 'description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      title: 'Social sharing image',
      description:
        'Optional but highly encouraged for increasing conversion rates for links to page shared in social media.',
      name: 'ogImage',
      type: 'image',
    }),
    defineField({
      name: 'keywords',
      description: 'Optional and ONLY used in the SEO pane',
      type: 'string',
    }),
    defineField({
      name: 'synonyms',
      description: 'Optional and ONLY used in the SEO pane',
      type: 'string',
    }),
  ],
  options: {
    collapsible: true,
  },
});
