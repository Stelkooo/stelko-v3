import { defineArrayMember, defineField } from 'sanity';
import { getModuleInfo } from '.';

const NAME = 'techStackModule';

const { media, subtitle } = getModuleInfo(NAME);

export default defineField({
  title: subtitle,
  name: NAME,
  type: 'object',
  fields: [
    defineField({
      name: 'tech',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'tech' }] })],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: subtitle,
        media,
      };
    },
  },
});
