import { defineArrayMember, defineField } from 'sanity';

import { getModuleInfo } from '.';

const NAME = 'testimonialModule';

const { media, subtitle } = getModuleInfo(NAME);

export default defineField({
  title: subtitle,
  name: NAME,
  type: 'object',
  fields: [
    defineField({
      title: 'Testimonial type',
      name: 'testimonialType',
      type: 'string',
      options: {
        layout: 'radio',
        list: ['single', 'double', 'all'],
      },
    }),
    defineField({
      name: 'heading',
      type: 'string',
      hidden: ({ parent }) => parent?.testimonialType !== 'double',
    }),
    defineField({
      name: 'testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
      hidden: ({ parent }) => parent?.testimonialType !== 'single',
    }),
    defineField({
      name: 'testimonials',
      type: 'array',
      of: [
        defineArrayMember({ type: 'reference', to: [{ type: 'testimonial' }] }),
      ],
      hidden: ({ parent }) => parent?.testimonialType !== 'double',
    }),
    defineField({
      title: 'Link to all testimonials?',
      name: 'linkToAllTestimonials',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  initialValue: {
    testimonialType: 'single',
  },
  preview: {
    select: {
      heading: 'heading',
      testimonialName: 'testimonial.name',
      testimonialType: 'testimonialType',
    },
    prepare({ heading, testimonialName, testimonialType }) {
      return {
        title: testimonialType === 'single' ? testimonialName : heading,
        subtitle,
        media,
      };
    },
  },
});
