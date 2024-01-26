import { GetStaticPaths, InferGetStaticPropsType } from 'next';

import { getClient } from '@/sanity/lib/client';
import { blogQuery, slugsQuery } from '@/sanity/lib/queries';
import { TBlogPayload } from '@/types';
import BlogPage from '@/components/pages/blog/blog.page';

export const getStaticPaths = (async () => {
  const paths = await getClient().fetch<string[]>(slugsQuery('blog'));
  return {
    paths: [...paths.map((path) => `/blog/${path}`)],
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths;

export const getStaticProps = async ({
  params = {},
}: {
  params: { slug?: string };
  draftMode?: boolean;
}) => {
  const { slug } = params;
  const data = await getClient().fetch<TBlogPayload>(blogQuery, { slug });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: { data } };
};

export default function Page({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BlogPage data={data} />;
}
