'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Stelko from '@/public/images/stelko.svg';

type Props = {
  unlimitedSize?: boolean;
};

export default function Logo({ unlimitedSize = false }: Props) {
  const pathname = usePathname();
  // Content to show as Logo
  const Content = (
    <div className="flex items-center gap-1">
      <Image
        src={Stelko}
        alt="Stelko's Typeface Logo"
        className={unlimitedSize ? `h-auto w-full` : 'h-11 w-40'}
      />
    </div>
  );

  // Only work as a link to Home page if not on it
  if (pathname === '/') {
    return Content;
  }
  return <Link href="/">{Content}</Link>;
}
