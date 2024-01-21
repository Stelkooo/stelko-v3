import { defineArrayMember, defineField } from 'sanity';
import { getModuleInfo } from '.';

const NAME = 'layoutModule';

const { media, subtitle } = getModuleInfo(NAME);

export default defineField({
  title: subtitle,
  name: NAME,
  type: 'object',
  fields: [
    defineField({
      title: 'Layout type',
      name: 'layoutType',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: '2 Columns', value: 'twoColumnCards' },
          { title: '3 Columns', value: 'threeColumnCards' },
          { title: 'Image / Text', value: 'imageTextCard' },
          { title: 'Heading / Text', value: 'headingTextCard' },
        ],
      },
    }),
    defineField({
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Two Column Cards',
      name: 'twoColumnCards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              type: 'string',
            }),
            defineField({
              name: 'text',
              type: 'text',
              rows: 3,
            }),
            defineField({
              title: 'CTA',
              name: 'cta',
              type: 'navLink',
            }),
          ],
        }),
      ],
      validation: (rule) => rule.min(2),
      hidden: ({ parent }) => parent?.layoutType !== 'twoColumnCards',
    }),
    defineField({
      title: 'Three Column Cards',
      name: 'threeColumnCards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              type: 'string',
            }),
            defineField({
              name: 'text',
              type: 'text',
              rows: 3,
            }),
            defineField({
              title: 'CTA',
              name: 'cta',
              type: 'navLink',
            }),
          ],
        }),
      ],
      validation: (rule) => rule.min(3),
      hidden: ({ parent }) => parent?.layoutType !== 'threeColumnCards',
    }),
    defineField({
      title: 'Image / Text Card',
      name: 'imageTextCard',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'image',
          type: 'customImage',
        }),
        defineField({
          title: 'Image on left?',
          name: 'imageOnLeft',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          title: 'CTA',
          name: 'cta',
          type: 'navLink',
        }),
      ],
      hidden: ({ parent }) => parent?.layoutType !== 'imageTextCard',
    }),
    defineField({
      title: 'Heading / Text Card',
      name: 'headingTextCard',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          type: 'text',
          rows: 3,
        }),
        defineField({
          title: 'Text on left?',
          name: 'textOnLeft',
          type: 'boolean',
          initialValue: false,
        }),
      ],
      hidden: ({ parent }) => parent?.layoutType !== 'headingTextCard',
    }),
  ],
  initialValue: { layoutType: 'imageTextCard' },
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
