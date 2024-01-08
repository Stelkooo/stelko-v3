import SiteLink from '@/components/shared/site-link.component';
import { TNavLink } from '@/types';

type Props = { navLinks?: TNavLink[] };

export default function Nav({ navLinks }: Props) {
  return navLinks
    ? navLinks.map((navLink) => (
        <li key={navLink?._key || ''}>
          <SiteLink link={navLink?.link}>{navLink?.title || ''}</SiteLink>
        </li>
      ))
    : null;
}
