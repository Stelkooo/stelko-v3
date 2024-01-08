import { defineArrayMember, defineField } from 'sanity';
import { HelpCircle } from 'lucide-react';

import { getModuleInfo } from '.';

const NAME = 'faqModule';

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
      name: 'cta',
      type: 'navLink',
    }),
    defineField({
      title: 'Question and answers',
      name: 'faqs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              question: 'question',
              answer: 'answer',
            },
            prepare({ answer, question }) {
              return {
                title: question,
                subtitle: answer,
                media: HelpCircle,
              };
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).required(),
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
