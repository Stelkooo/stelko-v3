import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { THeader } from '@/types';
import SiteLink from '@/components/shared/site-link.component';
import Nav from '@/components/shared/nav.component';

type Props = {
  header?: THeader;
};

export default function MobileNavHeader({ header }: Props) {
  return (
    <div className="md:hidden">
      <Sheet>
        <div className="flex items-center justify-between gap-2">
          {header?.cta ? (
            <Button className="w-full" asChild>
              <SiteLink link={header?.cta?.link}>
                {header?.cta?.title || ''}
              </SiteLink>
            </Button>
          ) : null}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
            asChild
          >
            <SheetTrigger>
              <Menu />
              <span className="sr-only">Open</span>
            </SheetTrigger>
          </Button>
        </div>
        <SheetContent>
          <Nav navLinks={header?.navLinks} isVertical />
        </SheetContent>
      </Sheet>
    </div>
  );
}
