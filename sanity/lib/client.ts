import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, useCdn } from '../env';

// eslint-disable-next-line import/prefer-default-export
export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
});
