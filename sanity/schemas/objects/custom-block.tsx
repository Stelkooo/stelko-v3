import { Table } from 'lucide-react';
import { defineField, defineArrayMember } from 'sanity';

import link from './link';

export default defineField({
  name: 'copy',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      marks: {
        annotations: [link],
      },
    }),
    defineArrayMember({
      type: 'customImage',
    }),
    defineField({
      name: 'code',
      type: 'code',
      options: {
        withFilename: true,
        language: 'typescript',
      },
    }),
    defineField({
      name: 'table',
      type: 'table',
      icon: Table,
    }),
  ],
});
