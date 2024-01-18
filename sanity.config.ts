import { visionTool } from '@sanity/vision';
import { defineConfig, isDev } from 'sanity';
import { deskTool } from 'sanity/desk';

import { codeInput } from '@sanity/code-input';
import { table } from '@sanity/table';
import { media } from 'sanity-plugin-media';
import { presentationTool } from 'sanity/presentation';

import { apiVersion, dataset, projectId } from './sanity/env';
import schema from './sanity/schemas';
import structure from './sanity/desk';

const devOnlyPlugins = [visionTool({ defaultApiVersion: apiVersion })];

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Stelko',

  schema,

  plugins: [
    deskTool({ structure }),
    codeInput(),
    table(),
    media(),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
    ...(isDev ? devOnlyPlugins : []),
  ],
});
