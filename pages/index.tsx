import { InferGetStaticPropsType } from 'next';

import { getClient } from '@/sanity/lib/client';
import { homeQuery } from '@/sanity/lib/queries';
import { THome } from '@/types';
import HomePage from '@/components/pages/home/home.page';

export const getStaticProps = async () => {
  const data = await getClient().fetch<THome>(homeQuery);

  return { props: { data } };
};

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <HomePage data={data} />;
}
