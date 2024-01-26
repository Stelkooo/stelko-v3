import { Menu } from 'lucide-react';
import { useToggle } from 'usehooks-ts';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { THeader } from '@/types';
import SiteLink from '@/components/shared/site-link.component';
import Nav from '@/components/shared/nav.component';

type Props = {
  header?: THeader;
};

export default function MobileNavHeader({ header }: Props) {
  const [open, toggleOpen, setOpen] = useToggle(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
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
        <SheetContent className="overflow-hidden py-20">
          <Nav navLinks={header?.navLinks} isVertical setOpen={toggleOpen} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
