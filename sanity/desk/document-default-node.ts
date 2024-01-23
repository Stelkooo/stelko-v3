import { DefaultDocumentNodeResolver } from 'sanity/desk';
import { SEOPane } from 'sanity-plugin-seo-pane';

import resolveHref from '../lib/links';

// eslint-disable-next-line import/prefer-default-export
export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  if (['home', 'page', 'blog', 'project', 'service'].includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(SEOPane)
        .options({
          url: (doc: { _type?: string; slug?: { current?: string } }) =>
            `https://stelko.xyz${resolveHref(doc?._type, doc?.slug?.current)}`,
        })
        .title('SEO'),
    ]);
  }

  return S.document().views([S.view.form()]);
};
