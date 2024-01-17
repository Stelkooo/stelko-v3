import { defineArrayMember, defineField } from 'sanity';

import { getModuleInfo } from '.';

const NAME = 'blogModule';

const { media, subtitle } = getModuleInfo(NAME);

const getHeadline = (type: 'latest' | 'all' | 'similar', headline?: string) => {
  switch (type) {
    case 'all':
      return 'All Posts';
    case 'latest':
      return headline;
    case 'similar':
      return 'Similar Posts';
    default:
      return 'Blog Posts';
  }
};

export default defineField({
  title: subtitle,
  name: NAME,
  type: 'object',
  fields: [
    defineField({
      title: 'Type',
      name: 'blogType',
      type: 'string',
      options: { layout: 'radio', list: ['latest', 'all', 'similar'] },
    }),
    defineField({
      name: 'headline',
      type: 'string',
      hidden: ({ parent }) => parent.blogType !== 'latest',
    }),
    defineField({
      title: 'Similar Blog Posts',
      name: 'posts',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'blog' }] })],
      hidden: ({ parent }) => parent.blogType !== 'similar',
    }),
  ],
  initialValue: {
    blogType: 'all',
  },
  preview: {
    select: {
      headline: 'headline',
      type: 'blogType',
    },
    prepare({ headline, type }) {
      return {
        title: getHeadline(type, headline),
        subtitle,
        media,
      };
    },
  },
});
