import { Metadata } from 'next';
import { draftMode } from 'next/headers';

import { sanityFetch } from '@/sanity/lib/fetch';
import { homeQuery, homeSeoQuery } from '@/sanity/lib/queries';
import { THome, TSeo } from '@/types';
import HomePage from '@/components/pages/home/home.page';
import { loadQuery } from '@/sanity/lib/store';
import HomePreviewPage from '@/components/pages/home/home-preview.page';

export async function generateMetadata(): Promise<Metadata> {
  const homeSeo = await sanityFetch<TSeo>({
    query: homeSeoQuery,
    tags: ['home'],
  });

  return {
    title: homeSeo.seoAndSocial?.title,
    description: homeSeo.seoAndSocial?.description,
    alternates: {
      canonical: '/',
    },
    robots: {
      index: homeSeo.publishStatus === 'hidden' ? false : undefined,
    },
  };
}

export default async function Home() {
  const home = await loadQuery<THome>(
    homeQuery,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    }
  );

  return draftMode().isEnabled ? (
    <HomePreviewPage initial={home} />
  ) : (
    <HomePage home={home.data} />
  );
}
