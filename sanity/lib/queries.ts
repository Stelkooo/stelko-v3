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

const modulesQuery = groq`
  _type == "heroModule" => {
    ${moduleBaseQuery},
    heading,
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
  },
  _type == "ctaModule" => {
    ${moduleBaseQuery},
    heading,
    text,
    ctas {
      primaryCta {
        ${navLinkQuery},
      },
      secondaryCta {
        ${navLinkQuery},
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
  }
`;

export const homeQuery = groq`
  *[_type == "home" && _id == "home"][0] {
    modules[] {
      ${modulesQuery},
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
