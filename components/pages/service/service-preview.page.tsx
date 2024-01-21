'use client';

import { QueryResponseInitial, useQuery } from '@sanity/react-loader';

import { serviceQuery } from '@/sanity/lib/queries';
import { TService } from '@/types';
import ServicePage from './service.page';

type Props = {
  initial: QueryResponseInitial<TService>;
  params: { slug: string };
};

export default function ServicePreviewPage({ initial, params }: Props) {
  const { data } = useQuery<TService | null>(serviceQuery, params, { initial });

  return data ? <ServicePage service={data} /> : <div>No project found</div>;
}
