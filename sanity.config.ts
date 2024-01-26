import { visionTool } from '@sanity/vision';
import { defineConfig, isDev } from 'sanity';
import { structureTool } from 'sanity/structure';

import { codeInput } from '@sanity/code-input';
import { table } from '@sanity/table';
import { media } from 'sanity-plugin-media';
import { presentationTool } from 'sanity/presentation';

import { apiVersion, dataset, projectId } from './sanity/env';
import schema from './sanity/schemas';
import structure from './sanity/desk';
import { defaultDocumentNode } from './sanity/desk/document-default-node';
import { locate } from './sanity/presentation/locate';

const devOnlyPlugins = [visionTool({ defaultApiVersion: apiVersion })];

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Stelko',

  schema,

  plugins: [
    structureTool({ structure, defaultDocumentNode }),
    codeInput(),
    table(),
    media(),
    presentationTool({
      locate,
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
    ...(isDev ? devOnlyPlugins : []),
  ],
});
