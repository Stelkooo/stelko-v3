import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { sanityFetch } from '@/sanity/lib/fetch';
import { TBlog, TSeo } from '@/types';
import { blogQuery, blogSeoQuery } from '@/sanity/lib/queries';
import BlogPage from '@/components/pages/blog/blog.page';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const seo = await sanityFetch<TSeo>({
    query: blogSeoQuery,
    tags: ['blog'],
    params,
  });

  if (!seo) return notFound();

  return {
    title: seo.seoAndSocial?.title,
    description: seo.seoAndSocial?.description,
    alternates: {
      canonical: '/',
    },
    robots: {
      index: seo.publishStatus === 'hidden' ? false : undefined,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const blog = await sanityFetch<TBlog>({
    query: blogQuery,
    tags: ['blog', 'site'],
    params,
  });

  if (!blog) return notFound();

  return <BlogPage blog={blog} />;
}
