import { defineField } from 'sanity';

export default defineField({
  title: 'Title for internal reference',
  description:
    "This won't show up for users, just make sure you add a descriptive name which will make it easy to find this page later when adding links or searching & browsing the CMS.",
  name: 'title',
  type: 'string',
  validation: (rule) => rule.required(),
});
