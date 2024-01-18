'use client';

import { QueryResponseInitial, useQuery } from '@sanity/react-loader';

import { pageQuery } from '@/sanity/lib/queries';
import { TPage } from '@/types';
import SlugPage from './slug.page';

type Props = { initial: QueryResponseInitial<TPage>; params: { slug: string } };

export default function SlugPreviewPage({ initial, params }: Props) {
  const { data } = useQuery<TPage | null>(pageQuery, params, { initial });

  return data ? <SlugPage page={data} /> : <div>Not page found</div>;
}
