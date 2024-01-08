import { defineType } from 'sanity';
import { File } from 'lucide-react';

import publishStatus from '../objects/publish-status';
import slug from '../objects/slug';
import internalTitle from '../objects/internal-title';
import seo from '../objects/seo';
import { pageGroups } from '../constants';
import modules from '../modules';

export default defineType({
  name: 'page',
  type: 'document',
  groups: pageGroups,
  fields: [slug, publishStatus, internalTitle, modules, seo],
  initialValue: { publishStatus: 'hidden' },
  preview: {
    select: {
      title: 'title',
      slugCurrent: 'slug.current',
    },
    prepare({ slugCurrent, title }) {
      return {
        title,
        subtitle: `/${slugCurrent || ''}`,
        media: File,
      };
    },
  },
});
