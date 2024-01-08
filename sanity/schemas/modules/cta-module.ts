import { defineField } from 'sanity';

import { getModuleInfo } from '.';

const NAME = 'ctaModule';

const { media, subtitle } = getModuleInfo(NAME);

export default defineField({
  title: subtitle,
  name: NAME,
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      title: 'Call to actions',
      name: 'ctas',
      type: 'ctas',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: heading,
        subtitle,
        media,
      };
    },
  },
});
