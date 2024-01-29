import { ServerResponse } from 'http';

import { WEBSITE_HOST_URL } from '@/lib/constants';
import { getClient } from '@/sanity/lib/client';
import resolveHref from '@/sanity/lib/links';
import { sitemapQuery } from '@/sanity/lib/queries';
import { TSitemap } from '@/types';

function generateSiteMap(pages: TSitemap[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://stelko.xyz</loc>
     </url>
     ${pages
       .map(({ _type, slug, _updatedAt }) => {
         return `
       <url>
           <loc>${`${WEBSITE_HOST_URL}${resolveHref(_type, slug?.current)}`}</loc>
           <lastmod>${_updatedAt}</lastmod>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {}

export async function getServerSideProps({ res }: { res: ServerResponse }) {
  const [pages, services, blog, projects] = await Promise.all([
    getClient().fetch(sitemapQuery('page')),
    getClient().fetch(sitemapQuery('service')),
    getClient().fetch(sitemapQuery('blog')),
    getClient().fetch(sitemapQuery('project')),
  ]);

  const sitemap = generateSiteMap([
    ...pages,
    ...services,
    ...projects,
    ...blog,
  ]);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
