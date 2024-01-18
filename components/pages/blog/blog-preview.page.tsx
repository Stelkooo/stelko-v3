'use client';

import { QueryResponseInitial, useQuery } from '@sanity/react-loader';

import { blogQuery } from '@/sanity/lib/queries';
import { TBlog } from '@/types';
import BlogPage from './blog.page';

type Props = { initial: QueryResponseInitial<TBlog>; params: { slug: string } };

export default function BlogPreviewPage({ initial, params }: Props) {
  const { data } = useQuery<TBlog | null>(blogQuery, params, { initial });

  return data ? <BlogPage blog={data} /> : <div>Not page found</div>;
}
