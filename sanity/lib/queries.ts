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
  tags[] {
    _key,
    ...@-> {
      name,
    },
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
        copy,
        cta {
          ${navLinkQuery},
        },
      },
    },
    layoutType == "threeColumnCards" => {
      threeColumnCards[] {
        _key,
        heading,
        copy,
        cta {
          ${navLinkQuery},
        },
      },
    },
    layoutType == "imageTextCard" => {
      imageTextCard {
        heading,
        copy,
        image {
          ${imageQuery},
        },
        imageOnLeft,
        cta {
          ${navLinkQuery},
        },
      },
    },
    layoutType == "headingTextCard" => {
      headingTextCard {
        heading,
        copy,
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
    projectType,
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
    tech[] {
      _key,
      ...@-> {
        _id,
        name,
        image {
          ${imageQuery},
        },
        category,
      },
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
  },
  _type == 'contactModule' => {
    ${moduleBaseQuery},
    heading,
    form,
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

export const seoQuery = groq`
  seoAndSocial {
    ...,
    defined(ogImage) => {
      "ogImage": ogImage.asset->url
    },
    !defined(ogImage) => {
      "ogImage": *[_type == 'general'][0].ogImage.asset->url
    }
  },
  _type,
  slug,
  publishStatus
`;

export const homeQuery = groq`
  {
    "home": *[_type == "home" && _id == "home"][0] {
      modules[] {
        ${fullModuleQuery},
      },
    },
    "site": {
      ${headerQuery},
      ${footerQuery},
    },
    "seo": *[_type == "home" && _id == "home"][0] {
      ${seoQuery},
    },
  }
`;

export const homeSitemapQuery = groq`
  *[_type == "home" && _id == "home"][0] {
    _updatedAt,
  }
`;

export const projectQuery = groq`
  {
    "project": *[_type == "project" && defined(slug) && slug.current == $slug][0] {
      slug,
      title,
      description,
      thumbnail {
        ${imageQuery},
      },
      tags[] {
        _key,
        ...@-> {
          name,
        },
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
    },
    "site": {
      ${headerQuery},
      ${footerQuery},
    },
    "seo": *[_type == "project" && defined(slug) && slug.current == $slug][0] {
      ${seoQuery},
    },
  }
`;

export const pageQuery = groq`
  {
    "page": *[_type == "page" && defined(slug) && slug.current == $slug][0] {
      slug,
      modules[] {
        ${fullModuleQuery},
      },
    },
    "site": {
      ${headerQuery},
      ${footerQuery},
    },
    "seo": *[_type == "page" && defined(slug) && slug.current == $slug][0] {
      ${seoQuery},
    },
  }
`;

export const blogQuery = groq`
  {
    "blog": *[_type == "blog" && defined(slug) && slug.current == $slug][0] {
      slug,
      title,
      thumbnail {
        ${imageQuery},
      },
      tags[] {
        _key,
        ...@-> {
          name,
        },
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
    },
    "site": {
      ${headerQuery},
      ${footerQuery},
    },
    "seo": *[_type == "blog" && defined(slug) && slug.current == $slug][0] {
      ${seoQuery},
    },
  }
`;

export const serviceQuery = groq`
  {
    "service": *[_type == "service" && defined(slug) && slug.current == $slug][0] {
      slug,
      modules[] {
        ${fullModuleQuery},
      },
    },
    "site": {
      ${headerQuery},
      ${footerQuery},
    },
    "seo": *[_type == "service" && defined(slug) && slug.current == $slug][0] {
      ${seoQuery},
    },
  }
`;

export const sitemapQuery = (type: string) => {
  return groq`
    *[_type == "${type}" && defined(slug) && publishStatus == "public"] {
      _updatedAt,
      _type,
      slug,
    }
  `;
};

export const slugsQuery = (type: string) => {
  return groq`
    *[_type == "${type}" && defined(slug) && publishStatus == "public"].slug.current
  `;
};

export const redirectsQuery = groq`
  *[_type == 'general' && _id == 'general'][0] {
    redirects,
  }
`;
