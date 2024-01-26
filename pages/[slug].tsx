import { GetStaticPaths, InferGetStaticPropsType } from 'next';

import SlugPage from '@/components/pages/slug/slug.page';
import { getClient } from '@/sanity/lib/client';
import { pageQuery, slugsQuery } from '@/sanity/lib/queries';
import { TPage } from '@/types';

export const getStaticPaths = (async () => {
  const paths = await getClient().fetch<string[]>(slugsQuery('page'));
  return {
    paths: [...paths.map((path) => `/${path}`)],
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = async ({
  params = {},
}: {
  params: { slug?: string };
  draftMode?: boolean;
}) => {
  const { slug } = params;
  const data = await getClient().fetch<TPage>(pageQuery, { slug });

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
  return <SlugPage data={data} />;
}
