import { defineField } from 'sanity';

export default defineField({
  title: 'Publish status',
  name: 'publishStatus',
  type: 'string',
  options: {
    layout: 'radio',
    list: [
      {
        title: "Hidden (won't show up in Google, but accessible through URL)",
        value: 'hidden',
      },
      'public',
    ],
  },
  group: 'seo',
  initialValue: 'hidden',
});
