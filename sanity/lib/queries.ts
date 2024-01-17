import { groq } from 'next-sanity';

const linkQuery = groq`
  _key,
  linkType,
  openNewWindow,
  linkParameters,
  linkType == "internal" => {
    internal-> {
      slug,
      _type,
    },
  },
  linkType == "external" => {
    external,
  }
`;

const navLinkQuery = groq`
  _key,
  title,
  link {
    ${linkQuery},
  } 
`;

const headerQuery = groq`
  "header": *[_type == "header"][0] {
    cta {
      ${navLinkQuery},
    },
    navLinks[] {
      ${navLinkQuery},
    },
  }
`;

const footerQuery = groq`
  "footer": *[_type == "footer"][0] {
    navLinks[] {
      ${navLinkQuery},
    },
    policies[] {
      ${navLinkQuery},
    },
    "socials": *[_type == "general"][0].socials,
    "email": *[_type == "general"][0].contactInfo.email,
  }
`;

export const siteQuery = groq`
  {
    ${headerQuery},
    ${footerQuery},
  }
`;

const imageQuery = groq`
  _key,
  "alt": asset->altText,
  asset-> {
    ...,
    metadata,
  },
  sizes,
  "caption": asset->description
`;

const moduleBaseQuery = groq`
  _key,
  _type
`;

const testimonialQuery = groq`
  _id,
  name,
  testimonial
`;

const projectModuleQuery = groq`
  _id,
  thumbnail {
    ${imageQuery},
  },
  title,
  slug,
  description,
  tags[]-> {
    _id,
    name,
  }
`;

const shortBlog = groq`
  _id,
  title,
  slug,
  tags[] {
    _key,
    ...@-> {
      name,
    },
  },
  datePublished,
  thumbnail {
    ${imageQuery},
  }
`;

const modulesQuery = groq`
  _type == "heroModule" => {
    ${moduleBaseQuery},
    heading,
    subheading,
    image {
      ${imageQuery},
    },
  },
  _type == "layoutModule" => {
    ${moduleBaseQuery},
    layoutType,
    heading,
    layoutType == "twoColumnCards" => {
      twoColumnCards[] {
        _key,
        heading,
        text,
      },
    },
    layoutType == "threeColumnCards" => {
      threeColumnCards[] {
        _key,
        heading,
        text,
      },
    },
    layoutType == "imageTextCard" => {
      imageTextCard {
        heading,
        text,
        image {
          ${imageQuery},
        },
        imageOnLeft,
      },
    },
    layoutType == "headingTextCard" => {
      headingTextCard {
        heading,
        text,
        textOnLeft,
      },
    },
  },
  _type == 'faqModule' => {
    ${moduleBaseQuery},
    heading,
    text,
    cta {
      ${navLinkQuery},
    },
    faqs[] {
      question,
      answer,
      _key,
    },
  },
  _type == "testimonialModule" => {
    ${moduleBaseQuery},
    testimonialType,
    linkToAllTestimonials,
    testimonialType == 'single' => {
      testimonial-> {
        ${testimonialQuery},
      },
    },
    testimonialType == 'double' => {
      heading,
      testimonials[]-> {
        ${testimonialQuery},
      },
    },
    testimonialType == 'all' => {
      "testimonials": *[_type == 'testimonial'] {
        ${testimonialQuery},
      },
    },
  },
  _type == "ctaModule" => {
    ${moduleBaseQuery},
    heading,
    text,
    ctas {
      defined(primaryCta.title) => {
        primaryCta {
          ${navLinkQuery},
        },
      },
      defined(secondaryCta.title) => {
        secondaryCta {
          ${navLinkQuery},
        },
      },
    },
  },
  _type == "imageModule" => {
    ${moduleBaseQuery},
    imageType,
    imageType == "single" => {
      image {
        ${imageQuery},
      },
    },
    imageType == "double" => {
      images[] {
        ${imageQuery},
      },
    },
  },
  _type == 'projectModule' => {
    ${moduleBaseQuery},
    heading,
    projectType == 'some' => {
      projects[]-> {
        ${projectModuleQuery},
      },
    },
    projectType == 'all' => {
      "projects": *[_type == 'project' && defined(slug)] {
        ${projectModuleQuery},
      },
    },
  },
  _type == 'techStackModule' => {
    ${moduleBaseQuery},
    tech[]-> {
      _id,
      name,
      image {
        ${imageQuery},
      },
      category,
    },
  },
  _type == "blogModule" => {
    ${moduleBaseQuery},
    blogType,
    heading,
    "posts": select(
      blogType == "latest" => *[_type == "blog"] | order(datePublished desc)[0...4] {
        ${shortBlog},
      },
      blogType == "all" => *[_type == "blog"] | order(datePublished desc) {
        ${shortBlog},
      },
    ),
    blogType == 'similar' => {
      posts[]-> {
        ${shortBlog},
      },
    },
  }
`;

const fullModuleQuery = groq`
  defined(_ref) => {
    ...@->modules[0] {
      ${modulesQuery},
    },
  },
  !defined(_ref) => {
    ${modulesQuery}
  }
`;

export const homeQuery = groq`
  *[_type == "home" && _id == "home"][0] {
    modules[] {
      ${fullModuleQuery},
    },
  }
`;

export const homeSeoQuery = groq`
  *[_type == "home" && _id == "home"][0] {
    seoAndSocial,
    publishStatus,
  }
`;

export const homeSitemapQuery = groq`
  *[_type == "home" && _id == "home"][0] {
    _type,
    _updatedAt,
  }
`;

export const projectQuery = groq`
  *[_type == "project" && defined(slug) && slug.current == $slug][0] {
    slug,
    title,
    description,
    thumbnail {
      ${imageQuery},
    },
    tags[]-> {
      _id,
      name,
    },
    modules[] {
      ${fullModuleQuery},
    },
    tech[]-> {
      _id,
      name,
      image {
        ${imageQuery},
      },
      category,
    },
  }
`;

export const projectSeoQuery = groq`
  *[_type == "project" && defined(slug) && slug.current == $slug][0] {
    seoAndSocial,
    publishStatus,
  }
`;

export const pageQuery = groq`
  *[_type == 'page' && defined(slug) && slug.current == $slug][0] {
    slug,
    modules[] {
      ${fullModuleQuery},
    },
  }
`;

export const pageSeoQuery = groq`
  *[_type == "page" && defined(slug) && slug.current == $slug][0] {
    seoAndSocial,
    publishStatus,
  }
`;

export const blogQuery = groq`
  *[_type == 'blog' && defined(slug) && slug.current == $slug][0] {
    slug,
    title,
    thumbnail {
      ${imageQuery},
    },
    tags[]-> {
      _id,
      name,
    },
    copy[] {
      ...,
      markDefs[] {
        ...,
        _type == 'link' => {
          ${linkQuery},
        },
      },
      _type == "customImage" => {
        ${imageQuery},
      },
    },
    datePublished,
    modules[] {
      ${fullModuleQuery},
    },
  }
`;

export const blogSeoQuery = groq`
  *[_type == "blog" && defined(slug) && slug.current == $slug][0] {
    seoAndSocial,
    publishStatus,
  }
`;
