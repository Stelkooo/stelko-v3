import { defineField, defineType } from 'sanity';

import { getModuleInfo, modulesArr } from '../modules';
import internalTitle from '../objects/internal-title';

export default defineType({
  title: 'Reusable Modules',
  name: 'reusableModule',
  type: 'document',
  fields: [
    internalTitle,
    defineField({
      name: 'modules',
      type: 'array',
      of: [...modulesArr],
      validation: (rule) => rule.length(1).required(),
    }),
  ],
  preview: {
    select: {
      modules: 'modules',
      title: 'title',
    },
    prepare({ modules, title }) {
      const { media, subtitle } = getModuleInfo(modules[0]._type);
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
