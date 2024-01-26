import { GetStaticPaths, InferGetStaticPropsType } from 'next';

import { getClient } from '@/sanity/lib/client';
import { projectQuery, slugsQuery } from '@/sanity/lib/queries';
import { TProjectPayload } from '@/types';
import ProjectPage from '@/components/pages/project/project.page';

export const getStaticPaths = (async () => {
  const paths = await getClient().fetch<string[]>(slugsQuery('project'));
  return {
    paths: [...paths.map((path) => `/project/${path}`)],
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
  const data = await getClient().fetch<TProjectPayload>(projectQuery, { slug });

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
  return <ProjectPage data={data} />;
}
