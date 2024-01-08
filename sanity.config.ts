import { visionTool } from '@sanity/vision';
import { defineConfig, isDev } from 'sanity';
import { deskTool } from 'sanity/desk';

import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemas';
// import structure from './sanity/desk';

const devOnlyPlugins = [visionTool({ defaultApiVersion: apiVersion })];

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Stelko',

  schema,

  plugins: [deskTool(), ...(isDev ? devOnlyPlugins : [])],
});
