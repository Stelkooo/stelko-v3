import { defineArrayMember, defineField } from 'sanity';
import _ from 'lodash';

import { getModuleInfo } from '.';

const NAME = 'imageModule';

const { media, subtitle } = getModuleInfo(NAME);

export default defineField({
  title: subtitle,
  name: NAME,
  type: 'object',
  fields: [
    defineField({
      title: 'Image type',
      name: 'imageType',
      type: 'string',
      options: {
        layout: 'radio',
        list: ['single', 'double'],
      },
    }),
    defineField({
      name: 'image',
      type: 'customImage',
      hidden: ({ parent }) => parent?.imageType !== 'single',
    }),
    defineField({
      name: 'images',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [defineArrayMember({ type: 'customImage' })],
      hidden: ({ parent }) => parent?.imageType !== 'double',
      validation: (rule) => rule.length(2),
    }),
  ],
  initialValue: { imageType: 'single' },
  preview: {
    select: {
      imageType: 'imageType',
    },
    prepare({ imageType }) {
      return {
        title: _.capitalize(imageType),
        subtitle,
        media,
      };
    },
  },
});
