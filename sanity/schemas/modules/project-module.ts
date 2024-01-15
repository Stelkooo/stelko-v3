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
      title: 'Project type?',
      name: 'projectType',
      type: 'string',
      options: { layout: 'radio', list: ['all', 'some'] },
    }),
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'projects',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })],
      hidden: ({ parent }) => parent?.projectType !== 'some',
    }),
  ],
  initialValue: {
    projectType: 'some',
  },
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
