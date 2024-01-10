import { defineArrayMember, defineField } from 'sanity';
import { getModuleInfo } from '.';

const NAME = 'projectModule';

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
      name: 'projects',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })],
      validation: (rule) => rule.required(),
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
