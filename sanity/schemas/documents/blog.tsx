import { defineArrayMember, defineField, defineType } from 'sanity';

import publishStatus from '../objects/publish-status';
import slug from '../objects/slug';
import internalTitle from '../objects/internal-title';
import seo from '../objects/seo';
import customBlock from '../objects/custom-block';
import { pageGroups } from '../constants';
import modules from '../modules';

export default defineType({
  name: 'blog',
  type: 'document',
  groups: pageGroups,
  fields: [
    slug,
    publishStatus,
    internalTitle,
    defineField({
      title: 'Date published',
      name: 'datePublished',
      type: 'date',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      type: 'customImage',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    customBlock,
    defineField({
      name: 'tags',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'tag' }] })],
    }),
    modules,
    seo,
  ],
  preview: {
    select: {
      title: 'title',
      slugCurrent: 'slug.current',
      thumbnail: 'thumbnail',
    },
    prepare({ slugCurrent, thumbnail, title }) {
      return {
        title,
        subtitle: `/blog/${slugCurrent || ''}`,
        media: thumbnail,
      };
    },
  },
});
