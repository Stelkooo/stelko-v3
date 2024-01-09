import { Metadata } from 'next';

import { sanityFetch } from '@/sanity/lib/fetch';
import { homeQuery, homeSeoQuery } from '@/sanity/lib/queries';
import { THome, TSeo } from '@/types';
import HomePage from '@/components/pages/home/home.page';

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
  const home = await sanityFetch<THome>({
    query: homeQuery,
    tags: ['home', 'site'],
  });
  return <HomePage home={home} />;
}
