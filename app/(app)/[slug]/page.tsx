import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import SlugPage from '@/components/pages/slug/slug.page';
import { sanityFetch } from '@/sanity/lib/fetch';
import { pageQuery, pageSeoQuery } from '@/sanity/lib/queries';
import { TPage, TSeo } from '@/types';

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
  const page = await sanityFetch<TPage>({
    query: pageQuery,
    params,
    tags: ['page'],
  });

  return <SlugPage page={page} />;
}