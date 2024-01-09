'use client';

import SiteLink from '@/components/shared/site-link.component';
import { TNavLink } from '@/types';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { cn } from '@/lib/utils';

type Props = { navLinks?: TNavLink[]; isVertical?: boolean };

export default function Nav({ navLinks, isVertical = false }: Props) {
  return navLinks ? (
    <NavigationMenu>
      <NavigationMenuList
        className={cn({ 'flex-col gap-4 space-x-0': isVertical })}
      >
        {navLinks.map((navLink) => (
          <NavigationMenuItem key={navLink?._key}>
            <SiteLink link={navLink?.link} legacyBehaviour passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <span className={cn({ 'text-4xl': isVertical })}>
                  {navLink?.title}
                </span>
              </NavigationMenuLink>
            </SiteLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  ) : null;
}
