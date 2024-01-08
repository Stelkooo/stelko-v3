import { type SchemaTypeDefinition } from 'sanity';

// Documents import
import blog from './documents/blog';
import footer from './documents/footer';
import general from './documents/general';
import header from './documents/header';
import home from './documents/home';
import page from './documents/page';
import project from './documents/project';
import reusableModules from './documents/reusable-modules';
import tags from './documents/tags';
import testimonial from './documents/testimonial';

// Modules import
import modulesSchema from './modules';
import ctaModule from './modules/cta-module';
import faqModule from './modules/faq-module';
import heroModule from './modules/hero-module';
import imageModule from './modules/image-module';
import layoutModule from './modules/layout-module';
import testimonialModule from './modules/testimonial-module';

// Objects import
import ctas from './objects/ctas';
import customImage from './objects/custom-image';
import link from './objects/link';
import navLink from './objects/nav-link';
import socials from './objects/socials';

const documents = [
  blog,
  footer,
  general,
  header,
  home,
  page,
  project,
  reusableModules,
  tags,
  testimonial,
];

const modules = [
  modulesSchema,
  ctaModule,
  faqModule,
  heroModule,
  imageModule,
  layoutModule,
  testimonialModule,
];

const objects = [ctas, customImage, link, navLink, socials];

const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documents, ...modules, ...objects],
};

export default schema;
