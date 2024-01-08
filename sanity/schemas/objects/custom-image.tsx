import { Image } from 'lucide-react';
import { defineField } from 'sanity';

export default defineField({
  title: 'Image',
  name: 'customImage',
  type: 'image',
  icon: Image,
  fields: [
    defineField({
      title: 'Custom Sizes',
      description: 'Optional',
      name: 'sizes',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      image: 'asset',
      caption: 'asset.description',
      alt: 'asset.alt',
    },
    prepare({ alt, caption, image }) {
      return {
        title: caption || alt,
        media: image,
      };
    },
  },
});
