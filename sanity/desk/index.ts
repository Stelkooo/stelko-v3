import { ListItemBuilder, StructureResolver } from 'sanity/structure';

import pagesStructure from './pages-structure';
import blogStructure from './blog-structure';
import tagStructure from './tag-structure';
import techStructure from './tech-structure';
import projectStructure from './project-structure';
import testimonialStructure from './testimonial-structure';
import reusableModulesStructure from './reusable-modules-structure';
import serviceStructure from './service-structure';

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
    'service',
    'tag',
    'tech',
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
      S.divider(),
      tagStructure(S, context),
      techStructure(S, context),
      S.divider(),
      projectStructure(S, context),
      serviceStructure(S, context),
      testimonialStructure(S, context),
      S.divider(),
      S.documentListItem().id('general').schemaType('general'),
      S.documentListItem().id('header').schemaType('header'),
      S.documentListItem().id('footer').schemaType('footer'),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);

export default structure;
