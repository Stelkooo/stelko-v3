import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import dynamic from 'next/dynamic';

import { sanityFetch } from '@/sanity/lib/fetch';
import { TBlog, TSeo } from '@/types';
import { blogQuery, blogSeoQuery } from '@/sanity/lib/queries';
import BlogPage from '@/components/pages/blog/blog.page';
import { loadQuery } from '@/sanity/lib/store';

const BlogPreviewPage = dynamic(
  () => import('@/components/pages/blog/blog-preview.page')
);

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
  const initial = await loadQuery<TBlog>(blogQuery, params, {
    perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
  });

  if (draftMode().isEnabled)
    return <BlogPreviewPage initial={initial} params={params} />;

  if (!initial.data) return notFound();

  return <BlogPage blog={initial.data} />;
}
