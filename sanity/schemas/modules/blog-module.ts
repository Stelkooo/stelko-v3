import { defineArrayMember, defineField } from 'sanity';

import { getModuleInfo } from '.';

const NAME = 'blogModule';

const { media, subtitle } = getModuleInfo(NAME);

const getHeadline = (type: 'latest' | 'all' | 'similar') => {
  switch (type) {
    case 'all':
      return 'All posts';
    case 'latest':
      return 'Latest posts';
    case 'similar':
      return 'Similar posts';
    default:
      return 'Blog posts';
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
      type: 'blogType',
    },
    prepare({ type }) {
      return {
        title: getHeadline(type),
        subtitle,
        media,
      };
    },
  },
});
