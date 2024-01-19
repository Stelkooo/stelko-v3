'use client';

import { QueryResponseInitial, useQuery } from '@sanity/react-loader';

import { projectQuery } from '@/sanity/lib/queries';
import { TProject } from '@/types';
import ProjectPage from './project.page';

type Props = {
  initial: QueryResponseInitial<TProject>;
  params: { slug: string };
};

export default function ProjectPreviewPage({ initial, params }: Props) {
  const { data } = useQuery<TProject | null>(projectQuery, params, { initial });

  return data ? <ProjectPage project={data} /> : <div>No project found</div>;
}
