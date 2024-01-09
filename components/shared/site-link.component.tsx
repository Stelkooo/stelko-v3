import Link from 'next/link';

import { TLink } from '@/types';
import resolveHref from '@/sanity/lib/links';

type Props = {
  link?: TLink;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  passHref?: boolean;
  legacyBehaviour?: boolean;
};

export default function SiteLink({
  link,
  children,
  onClick,
  className = '',
  legacyBehaviour = false,
  passHref = false,
}: Props) {
  const target = link?.openNewWindow ? '_blank' : undefined;

  switch (link?.linkType) {
    case 'external':
      return (
        <Link
          href={link.external || '/'}
          target={target}
          onClick={onClick}
          className={className}
          legacyBehavior={legacyBehaviour}
          passHref={passHref}
        >
          {children}
        </Link>
      );
    case 'internal':
      return (
        <Link
          href={`${resolveHref(
            link.internal?._type,
            link.internal?.slug?.current
          )}`}
          onClick={onClick}
          target={target}
          className={className}
          legacyBehavior={legacyBehaviour}
          passHref={passHref}
        >
          {children}
        </Link>
      );
    default:
      return (
        <Link
          href="/"
          onClick={onClick}
          className={className}
          legacyBehavior={legacyBehaviour}
          passHref={passHref}
        >
          {children}
        </Link>
      );
  }
}
