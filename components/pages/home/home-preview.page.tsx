'use client';

import { QueryResponseInitial, useQuery } from '@sanity/react-loader';

import { THome } from '@/types';
import { homeQuery } from '@/sanity/lib/queries';
import HomePage from './home.page';

type Props = {
  initial: QueryResponseInitial<THome>;
};

export default function HomePreviewPage({ initial }: Props) {
  const { data } = useQuery<THome | null>(homeQuery, {}, { initial });

  return data ? <HomePage home={data} /> : <div>No home page data</div>;
}
