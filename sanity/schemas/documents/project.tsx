import { defineArrayMember, defineField, defineType } from 'sanity';

import { pageGroups } from '../constants';
import slug from '../objects/slug';
import publishStatus from '../objects/publish-status';
import seo from '../objects/seo';
import modules from '../modules';

export default defineType({
  name: 'project',
  type: 'document',
  groups: pageGroups,
  fields: [
    slug,
    publishStatus,
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      type: 'customImage',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'tag' }] })],
      group: 'content',
      validation: (rule) => rule.required(),
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
        subtitle: `/project/${slugCurrent || ''}`,
        media: thumbnail,
      };
    },
  },
});
