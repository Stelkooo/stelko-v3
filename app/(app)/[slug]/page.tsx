import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';

import SlugPage from '@/components/pages/slug/slug.page';
import { sanityFetch } from '@/sanity/lib/fetch';
import { pageQuery, pageSeoQuery } from '@/sanity/lib/queries';
import { TPage, TSeo } from '@/types';
import { loadQuery } from '@/sanity/lib/store';
import SlugPreviewPage from '@/components/pages/slug/slug-preview.page';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const seo = await sanityFetch<TSeo>({
    query: pageSeoQuery,
    tags: ['page'],
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
  const initial = await loadQuery<TPage>(pageQuery, params, {
    perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
  });

  return draftMode().isEnabled ? (
    <SlugPreviewPage initial={initial} params={params} />
  ) : (
    <SlugPage page={initial.data} />
  );
}
