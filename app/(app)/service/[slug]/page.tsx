import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import ServicePage from '@/components/pages/service/service.page';
import { serviceQuery, serviceSeoQuery } from '@/sanity/lib/queries';
import { loadQuery } from '@/sanity/lib/store';
import { TSeo, TService } from '@/types';
import { sanityFetch } from '@/sanity/lib/fetch';

const ServicePreviewPage = dynamic(
  () => import('@/components/pages/service/service-preview.page')
);

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const seo = await sanityFetch<TSeo>({
    query: serviceSeoQuery,
    tags: ['service'],
    params,
  });

  if (!seo) return notFound();

  return {
    title: seo.seoAndSocial?.title,
    description: seo.seoAndSocial?.description,
    alternates: {
      canonical: `/service/${params.slug}`,
    },
    robots: {
      index: seo.publishStatus === 'hidden' ? false : undefined,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const initial = await loadQuery<TService>(serviceQuery, params, {
    perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    next: { tags: ['services', `service:${params.slug}`, 'site'] },
  });

  if (draftMode().isEnabled)
    return <ServicePreviewPage initial={initial} params={params} />;

  if (!initial.data) return notFound();

  return <ServicePage service={initial.data} />;
}
