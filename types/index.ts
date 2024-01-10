import type { Url } from 'url';
import type { ImageAsset, Slug } from 'sanity';

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
    ogImage?: TImage;
  };
  publishStatus?: 'hidden' | 'public';
};

export type TSitemap = {
  slug?: Slug;
  _updatedAt?: string;
  _type?: string;
};

export type TBaseModule = {
  _type?: string;
  _key?: string;
};

export type THeroModule = TBaseModule & {
  heading?: string;
  image?: TImage;
};

export type TCard = {
  _key?: string;
  heading?: string;
  text?: string;
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
  text?: string;
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

export type TModules = (
  | THeroModule
  | TLayoutModule
  | TFaqModule
  | TTestimonialModule
  | TCtaModule
  | TImageModule
)[];

export type THome = {
  modules?: TModules;
};
