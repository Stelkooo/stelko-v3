import { MetadataRoute } from 'next';

import { sanityFetch } from '@/sanity/lib/fetch';
import {
  blogSitemapQuery,
  homeSitemapQuery,
  pagesSitemapQuery,
  projectsSitemapQuery,
} from '@/sanity/lib/queries';
import { TSitemap } from '@/types';
import { WEBSITE_HOST_URL } from '@/lib/constants';
import resolveHref from '@/sanity/lib/links';

function sanityFetchToSitemap(res: TSitemap[]) {
  return res.map((page) => {
    return {
      url: `${WEBSITE_HOST_URL}${resolveHref(page._type, page.slug?.current)}`,
      lastModified: page._updatedAt,
    };
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const home = await sanityFetch<TSitemap>({
    query: homeSitemapQuery,
    tags: ['home'],
  });

  const pages = await sanityFetch<TSitemap[]>({
    query: pagesSitemapQuery,
    tags: ['page'],
  }).then((res) => {
    return sanityFetchToSitemap(res);
  });

  const projects = await sanityFetch<TSitemap[]>({
    query: projectsSitemapQuery,
    tags: ['project'],
  }).then((res) => {
    return sanityFetchToSitemap(res);
  });

  const blog = await sanityFetch<TSitemap[]>({
    query: blogSitemapQuery,
    tags: ['blog'],
  }).then((res) => {
    return sanityFetchToSitemap(res);
  });

  return [
    { url: `${WEBSITE_HOST_URL}/`, lastModified: home?._updatedAt },
    ...pages,
    ...projects,
    ...blog,
  ];
}
