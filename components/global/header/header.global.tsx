import Logo from '@/components/shared/logo.component';
import { THeader } from '@/types';
import MobileNavHeader from './mobile-nav.header';
import DesktopNavHeader from './desktop-nav.header';

type Props = {
  header?: THeader;
};

export default function Header({ header }: Props) {
  return (
    <header className="fixed top-5 z-50 w-full">
      <div className="container flex items-center justify-between gap-4">
        <Logo />
        <div className="rounded-full border p-1">
          <MobileNavHeader header={header} />
          <DesktopNavHeader header={header} />
        </div>
      </div>
    </header>
  );
}
