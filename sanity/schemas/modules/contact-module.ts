import _ from 'lodash';
import { AtSign, Calendar, FileText, Hash, Phone, Text } from 'lucide-react';

import { defineArrayMember, defineField, defineType } from 'sanity';

import { getModuleInfo } from '.';

const NAME = 'contactModule';

const { media, subtitle } = getModuleInfo(NAME);

const getInputIcon = (inputType: string) => {
  switch (inputType) {
    case 'date':
      return Calendar;
    case 'email':
      return AtSign;
    case 'tel':
      return Phone;
    case 'text':
      return Text;
    case 'textArea':
      return FileText;
    case 'number':
      return Hash;
    default:
      return Text;
  }
};

export default defineType({
  title: subtitle,
  name: NAME,
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      title: 'Form',
      name: 'form',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'row',
          type: 'object',
          fields: [
            defineField({
              name: 'fields',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      title: 'Required',
                      name: 'isRequired',
                      type: 'boolean',
                    }),
                    defineField({
                      title: 'Field Label',
                      name: 'fieldLabel',
                      description: 'Inform what needs to be entered',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      title: 'Field ID',
                      name: 'fieldId',
                      description: 'Unique ID to distinguish each field apart',
                      type: 'slug',
                      options: {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        source: (_doc, { parent }) => parent.fieldLabel,
                      },
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      title: 'Input Type',
                      name: 'inputType',
                      type: 'string',
                      options: {
                        list: [
                          'date',
                          'email',
                          'number',
                          'tel',
                          'text',
                          { title: 'Text Area', value: 'textArea' },
                        ],
                      },
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'fieldLabel',
                      subtitle: 'inputType',
                      isRequired: 'isRequired',
                    },
                    prepare({ subtitle: formSubtitle, title, isRequired }) {
                      return {
                        title: `${title}${isRequired ? '*' : ''}`,
                        subtitle: _.capitalize(formSubtitle),
                        media: getInputIcon(subtitle),
                      };
                    },
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
