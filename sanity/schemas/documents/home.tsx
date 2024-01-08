import { defineType } from 'sanity';
import { Home } from 'lucide-react';

import publishStatus from '../objects/publish-status';
import seo from '../objects/seo';
import { pageGroups } from '../constants';
import modules from '../modules';

export default defineType({
  name: 'home',
  type: 'document',
  groups: pageGroups,
  fields: [publishStatus, modules, seo],
  preview: {
    prepare() {
      return {
        title: 'Home',
        subtitle: '/',
        media: Home,
      };
    },
  },
});
