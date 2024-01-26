import Head from 'next/head';

import { TSeo } from '@/types';
import { WEBSITE_HOST_URL } from '@/lib/constants';
import resolveHref from '@/sanity/lib/links';

type Props = {
  seo?: TSeo;
};

export default function SiteMeta({ seo }: Props) {
  const metaTitle = [
    ...(seo?.seoAndSocial?.title ? [seo.seoAndSocial.title] : []),
    'Stelko',
  ].join(' | ');
  return (
    <Head>
      {/* Title and description */}
      <title>{metaTitle || 'Stelko'}</title>
      {seo?.seoAndSocial?.description && (
        <meta
          key="description"
          name="description"
          content={seo.seoAndSocial.description}
        />
      )}
      {/* Viewport */}
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      {/* Favicons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="icon" href="/favicon/favicon.ico" />
      {/* Theme */}
      <meta name="msapplication-TileColor" content="#590bad" />
      <meta name="theme-color" content="#590bad" />
      {/* Canonical */}
      <link
        rel="canonical"
        href={`${WEBSITE_HOST_URL}${resolveHref(
          seo?._type,
          seo?.slug?.current
        )}`}
      />
    </Head>
  );
}
