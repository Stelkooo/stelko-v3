import { defineField, defineType } from 'sanity';
import { Pencil } from 'lucide-react';

import { pageGroups } from '../constants';
import publishStatus from '../objects/publish-status';
import modules from '../modules';
import seo from '../objects/seo';

import slug from '../objects/slug';

export default defineType({
  name: 'service',
  type: 'document',
  groups: pageGroups,
  fields: [
    slug,
    publishStatus,
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    modules,
    seo,
  ],
  preview: {
    select: {
      title: 'title',
      slugCurrent: 'slug.current',
    },
    prepare({ slugCurrent, title }) {
      return {
        title,
        subtitle: `/service/${slugCurrent || ''}`,
        media: Pencil,
      };
    },
  },
});
