import Logo from '@/components/shared/logo.component';
import { THeader } from '@/types';
import MobileNavHeader from './mobile-nav.header';
import DesktopNavHeader from './desktop-nav.header';

type Props = {
  header?: THeader;
};

export default function Header({ header }: Props) {
  return (
    <header className="fixed z-50 w-full border-b bg-background">
      <div className="container flex items-center justify-between py-5">
        <Logo />
        <MobileNavHeader header={header} />
        <DesktopNavHeader header={header} />
      </div>
    </header>
  );
}
