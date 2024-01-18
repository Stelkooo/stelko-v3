import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';

import { sanityFetch } from '@/sanity/lib/fetch';
import { projectQuery, projectSeoQuery } from '@/sanity/lib/queries';
import { TProject, TSeo } from '@/types';
import ProjectPage from '@/components/pages/project/project.page';
import { loadQuery } from '@/sanity/lib/store';
import ProjectPreviewPage from '@/components/pages/project/project-preview.page';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const seo = await sanityFetch<TSeo>({
    query: projectSeoQuery,
    tags: ['project'],
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
  const initial = await loadQuery<TProject>(projectQuery, params, {
    perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
  });

  if (!initial) return notFound();

  return draftMode().isEnabled ? (
    <ProjectPreviewPage initial={initial} params={params} />
  ) : (
    <ProjectPage project={initial.data} />
  );
}
