import { defineField } from 'sanity';

export default defineField({
  name: 'link',
  type: 'object',
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      title: 'Link type',
      name: 'linkType',
      type: 'string',
      options: { layout: 'radio', list: ['external', 'internal'] },
    }),
    defineField({
      title: 'Link to another page on the site',
      name: 'internal',
      type: 'reference',
      to: [
        { type: 'page' },
        { type: 'project' },
        { type: 'home' },
        { type: 'blog' },
        { type: 'service' },
      ],
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
      title: 'Link to another site',
      name: 'external',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
    defineField({
      title: 'Open the link in a new window?',
      name: 'openNewWindow',
      type: 'boolean',
    }),
    defineField({
      title: 'Link parameters',
      description: 'Optional',
      name: 'linkParameters',
      type: 'string',
    }),
  ],
  initialValue: {
    linkType: 'external',
    openNewWindow: false,
  },
});
