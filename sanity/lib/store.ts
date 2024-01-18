import * as queryStore from '@sanity/react-loader';

import { client } from '@/sanity/lib/client';
import { token } from '@/sanity/lib/token';

queryStore.setServerClient(client.withConfig({ token }));

// eslint-disable-next-line import/prefer-default-export
export const { loadQuery } = queryStore;
