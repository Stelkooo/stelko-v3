import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { Metadata } from 'next';

import Footer from '@/components/global/footer/footer.global';
import Header from '@/components/global/header/header.global';
import { sanityFetch } from '@/sanity/lib/fetch';
import { siteQuery } from '@/sanity/lib/queries';
import { TSite } from '@/types';
import { WEBSITE_HOST_URL } from '@/lib/constants';

const VisualEditing = dynamic(
  () => import('@/components/global/visual-editing.global')
);

export const metadata: Metadata = {
  title: {
    template: '%s | Stelko',
    default: 'Stelko',
  },
  metadataBase: new URL(WEBSITE_HOST_URL),
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await sanityFetch<TSite>({ query: siteQuery, tags: ['site'] });

  return (
    <>
      <div className="flex min-h-[100dvh] flex-col">
        <Header header={site?.header} />
        <main className="flex-1">{children}</main>
        <Footer footer={site?.footer} />
      </div>
      {draftMode().isEnabled && <VisualEditing />}
    </>
  );
}
