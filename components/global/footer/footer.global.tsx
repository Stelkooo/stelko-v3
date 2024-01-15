import Logo from '@/components/shared/logo.component';
import Nav from '@/components/shared/nav.component';
import Socials from '@/components/shared/socials.component';
import { TFooter } from '@/types';

type Props = { footer?: TFooter };

export default function Footer({ footer }: Props) {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-8 py-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <Socials socials={footer?.socials} />
          <Nav navLinks={footer?.navLinks} />
          <p className="as-body">© 2023 Stelko</p>
        </div>
        <Logo unlimitedSize />
      </div>
    </footer>
  );
}
