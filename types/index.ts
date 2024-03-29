import type { Url } from 'url';
import type { ImageAsset, Slug } from 'sanity';
import type { PortableTextBlock } from '@portabletext/types';

export type TLinkType = 'internal' | 'external';

export type TReference = { slug?: Slug; _type?: string };

export type TLink = {
  _key?: string;
  linkType?: TLinkType;
  external?: Url;
  internal?: TReference;
  openNewWindow?: boolean;
};

export type TNavLink = {
  _key?: string;
  title?: string;
  link?: TLink;
};

export type THeader = {
  navLinks?: TNavLink[];
  cta?: TNavLink;
};

export type TSocials = {
  github?: Url;
  linkedin?: Url;
};

export type TFooter = {
  navLinks?: TNavLink[];
  policies?: TNavLink[];
  socials?: TSocials;
  email?: string;
};

export type TSite = {
  header?: THeader;
  footer?: TFooter;
};

export type TImage = {
  _key?: string;
  asset: ImageAsset;
  alt?: string;
  sizes?: string;
  caption?: string;
};

export type TSeo = {
  seoAndSocial?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
  publishStatus?: 'hidden' | 'public';
  _type?: string;
  slug?: Slug;
};

export type TSitemap = {
  slug?: Slug;
  _updatedAt?: Date;
  _type?: string;
};

export type TBaseModule = {
  _type?: string;
  _key?: string;
};

export type THeroModule = TBaseModule & {
  heading?: string;
  subheading?: string;
  image?: TImage;
  tags?: TTag[];
};

export type TCard = {
  _key?: string;
  heading?: string;
  copy?: PortableTextBlock[];
  image?: TImage;
  cta?: TNavLink;
};

export type TLayoutModule = TBaseModule & {
  layoutType?:
    | 'twoColumnCards'
    | 'threeColumnCards'
    | 'imageTextCard'
    | 'headingTextCard';
  heading?: string;
  twoColumnCards?: TCard[];
  threeColumnCards?: TCard[];
  imageTextCard?: TCard & { imageOnLeft?: boolean };
  headingTextCard?: TCard & { textOnLeft?: boolean };
};

export type TFaq = {
  question?: string;
  answer?: string;
  _key: string;
};

export type TFaqModule = TBaseModule & {
  heading?: string;
  text?: string;
  cta?: TNavLink;
  faqs?: TFaq[];
};

export type TTestimonial = {
  _id: string;
  name?: string;
  testimonial?: string;
};

export type TTestimonialModule = TBaseModule & {
  heading?: string;
  linkToAllTestimonials?: boolean;
  testimonial?: TTestimonial;
  testimonials?: TTestimonial[];
  testimonialType?: 'single' | 'double';
};

export type TCtas = {
  primaryCta?: TNavLink;
  secondaryCta?: TNavLink;
};

export type TCtaModule = TBaseModule & {
  heading?: string;
  text?: string;
  ctas?: TCtas;
};

export type TImageModule = TBaseModule & {
  imageType?: 'single' | 'double';
  image?: TImage;
  images?: TImage[];
};

export type TTag = {
  _key?: string;
  _id?: string;
  name?: string;
};

export type TProject = {
  _key?: string;
  _id?: string;
  slug?: Slug;
  thumbnail?: TImage;
  modules?: TModules;
  title?: string;
  description?: string;
  tags?: TTag[];
  tech?: TTech[];
  seo?: TSeo;
};

export type TProjectModule = TBaseModule & {
  heading?: string;
  projects?: TProject[];
  projectType?: 'all' | 'some';
};

export type TCategoryValues =
  | 'frontendDevelopment'
  | 'cms'
  | 'deploymentAndVersionControl'
  | 'design'
  | 'developmentTools'
  | 'communicationAndProjectManagement';

export type TTech = {
  _key?: string;
  _id?: string;
  category?: TCategoryValues;
  name?: string;
  image?: TImage;
};

export type TTechStackModule = TBaseModule & {
  tech?: TTech[];
};

export type TBlog = {
  _id?: string;
  slug?: Slug;
  title?: string;
  datePublished?: Date;
  thumbnail?: TImage;
  tags?: TTag[];
  modules?: TModules;
  copy?: PortableTextBlock[];
  seo?: TSeo;
};

export type TTable = {
  rows: { cells: string[]; _key: string }[];
};

export type TCodeBlock = {
  language?: string;
  highlightedLines?: number[];
  code?: string;
  filename?: string;
};

export type TBlogModule = TBaseModule & {
  blogType?: 'all' | 'similar' | 'latest';
  posts?: TBlog[];
  heading?: string;
};

export type TInputType =
  | 'date'
  | 'email'
  | 'number'
  | 'tel'
  | 'text'
  | 'textArea';

export type TInput = {
  isRequired?: boolean;
  fieldLabel?: string;
  fieldId?: Slug;
  inputType?: TInputType;
  _key?: string;
};

export type TForm = { fields?: TInput[]; _key?: string }[];

export type TContactModule = TBaseModule & {
  heading?: string;
  form?: TForm;
};

export type TRedirect = {
  source?: string;
  permanent?: boolean;
  destination?: { _type?: string; slug?: Slug };
};

export type TModules = (
  | THeroModule
  | TLayoutModule
  | TFaqModule
  | TTestimonialModule
  | TCtaModule
  | TImageModule
  | TProjectModule
  | TTechStackModule
  | TBlogModule
  | TContactModule
)[];

export type THome = {
  home?: { modules?: TModules };
  site?: TSite;
  seo?: TSeo;
};

export type TPage = {
  page?: { slug?: Slug; modules?: TModules };
  site?: TSite;
  seo?: TSeo;
};

export type TService = {
  service?: {
    _id?: string;
    slug?: Slug;
    title?: string;
    modules?: TModules;
  };
  site?: TSite;
  seo?: TSeo;
};

export type TProjectPayload = {
  project?: TProject;
  site?: TSite;
  seo?: TSeo;
};

export type TBlogPayload = {
  blog?: TBlog;
  site?: TSite;
  seo?: TSeo;
};
