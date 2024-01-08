import Link from 'next/link';

import { TLink } from '@/types';
import resolveHref from '@/sanity/lib/links';
import { cn } from '@/lib/utils';

type Props = {
  link?: TLink;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function SiteLink({
  link,
  children,
  onClick,
  className = '',
}: Props) {
  const target = link?.openNewWindow ? '_blank' : undefined;

  switch (link?.linkType) {
    case 'external':
      return (
        <Link
          href={link.external || '/'}
          target={target}
          onClick={onClick}
          className={cn('font-medium lg:hover:underline', className)}
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
          className={cn('font-medium lg:hover:underline', className)}
        >
          {children}
        </Link>
      );
    default:
      return (
        <Link href="/" onClick={onClick} className={className}>
          {children}
        </Link>
      );
  }
}
