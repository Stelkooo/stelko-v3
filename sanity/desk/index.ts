import { ListItemBuilder, StructureResolver } from 'sanity/desk';

import pagesStructure from './pages-structure';
import blogStructure from './blog-structure';
import tagStructure from './tag-structure';
import projectStructure from './project-structure';
import testimonialStructure from './testimonial-structure';
import reusableModulesStructure from './reusable-modules-structure';

const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId();

  if (!id) return false;

  return ![
    'blog',
    'footer',
    'general',
    'header',
    'home',
    'media.tag',
    'page',
    'project',
    'reusableModule',
    'tag',
    'testimonial',
  ].includes(id);
};

const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      S.documentListItem().id('home').schemaType('home'),
      pagesStructure(S, context),
      reusableModulesStructure(S, context),
      S.divider(),
      blogStructure(S, context),
      tagStructure(S, context),
      S.divider(),
      projectStructure(S, context),
      testimonialStructure(S, context),
      S.divider(),
      S.documentListItem().id('general').schemaType('general'),
      S.documentListItem().id('header').schemaType('header'),
      S.documentListItem().id('footer').schemaType('footer'),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);

export default structure;
