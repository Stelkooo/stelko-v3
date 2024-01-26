import { GetStaticPaths, InferGetStaticPropsType } from 'next';

import { getClient } from '@/sanity/lib/client';
import { serviceQuery, slugsQuery } from '@/sanity/lib/queries';
import { TService } from '@/types';
import ServicePage from '@/components/pages/service/service.page';

export const getStaticPaths = (async () => {
  const paths = await getClient().fetch<string[]>(slugsQuery('service'));
  return {
    paths: [...paths.map((path) => `/service/${path}`)],
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
  const data = await getClient().fetch<TService>(serviceQuery, { slug });

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
  return <ServicePage data={data} />;
}
