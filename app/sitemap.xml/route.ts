import { sanityFetch } from '@/sanity/lib/fetch';
import { TSitemap } from '@/types';
import { sitemapQuery } from '@/sanity/lib/queries';
import { WEBSITE_HOST_URL } from '@/lib/constants';
import resolveHref from '@/sanity/lib/links';

function generateSiteMap(
  services: TSitemap[],
  pages: TSitemap[],
  projects: TSitemap[],
  blog: TSitemap[]
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${WEBSITE_HOST_URL}</loc>
     </url>
     ${pages
       .map((page) => {
         return `
           <url>
               <loc>${`${WEBSITE_HOST_URL}${resolveHref(
                 page._type,
                 page.slug?.current
               )}`}</loc>
               <lastmod>${page._updatedAt}</lastmod>
           </url>
         `;
       })
       .join('')}
    ${projects
      .map((project) => {
        return `
        <url>
            <loc>${`${WEBSITE_HOST_URL}${resolveHref(
              project._type,
              project.slug?.current
            )}`}</loc>
            <lastmod>${project._updatedAt}</lastmod>
        </url>
      `;
      })
      .join('')}
    ${services
      .map((service) => {
        return `
          <url>
              <loc>${`${WEBSITE_HOST_URL}${resolveHref(
                service._type,
                service.slug?.current
              )}`}</loc>
              <lastmod>${service._updatedAt}</lastmod>
          </url>
        `;
      })
      .join('')}
      ${blog
        .map((post) => {
          return `
            <url>
                <loc>${`${WEBSITE_HOST_URL}${resolveHref(
                  post._type,
                  post.slug?.current
                )}`}</loc>
                <lastmod>${post._updatedAt}</lastmod>
            </url>
          `;
        })
        .join('')}
   </urlset>
 `;
}

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  const services = await sanityFetch<TSitemap[]>({
    query: sitemapQuery('service'),
    tags: ['services'],
  });

  const pages = await sanityFetch<TSitemap[]>({
    query: sitemapQuery('page'),
    tags: ['pages'],
  });

  const projects = await sanityFetch<TSitemap[]>({
    query: sitemapQuery('project'),
    tags: ['projects'],
  });

  const blog = await sanityFetch<TSitemap[]>({
    query: sitemapQuery('blog'),
    tags: ['blog'],
  });

  const body = generateSiteMap(services, pages, projects, blog);

  return new Response(body, {
    status: 200,
    headers: {
      'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
      'content-type': 'application/xml',
    },
  });
}
