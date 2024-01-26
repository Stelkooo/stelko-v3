import { SanityClient, createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';

// eslint-disable-next-line import/prefer-default-export
export function getClient(): SanityClient {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: 'published',
  });
}
