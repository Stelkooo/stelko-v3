import { TSeo, TSite } from '@/types';
import SiteMeta from '../shared/site-meta.component';
import { Toaster } from '../ui/sonner';
import Footer from './footer/footer.global';
import Header from './header/header.global';

type Props = { children: React.ReactNode; seo?: TSeo; site?: TSite };

export default function LayoutGlobal({ children, seo, site }: Props) {
  return (
    <>
      <SiteMeta seo={seo} />
      <div className="flex min-h-dvh flex-col">
        <Header header={site?.header} />
        <main className="flex-1">{children}</main>
        <Toaster />
        <Footer footer={site?.footer} />
      </div>
    </>
  );
}
