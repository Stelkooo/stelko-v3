import { THeader } from '@/types';
import Nav from '@/components/shared/nav.component';
import { Button } from '@/components/ui/button';
import SiteLink from '@/components/shared/site-link.component';

type Props = { header?: THeader };

export default function DesktopNavHeader({ header }: Props) {
  return (
    <nav className="max-md:hidden">
      <ul className="flex items-center gap-8 text-xl lg:text-2xl">
        <Nav navLinks={header?.navLinks} />
        {header?.cta ? (
          <li>
            <Button className="w-full" asChild>
              <SiteLink link={header?.cta?.link}>
                {header?.cta?.title || ''}
              </SiteLink>
            </Button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
