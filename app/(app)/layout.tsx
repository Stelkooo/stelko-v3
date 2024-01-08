import Header from '@/components/global/header/header.global';
import { sanityFetch } from '@/sanity/lib/fetch';
import { siteQuery } from '@/sanity/lib/queries';
import { TSite } from '@/types';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await sanityFetch<TSite>({ query: siteQuery, tags: ['site'] });

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header header={site?.header} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
