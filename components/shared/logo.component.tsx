'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Ghost from '@/public/images/ghost.svg';
import Stelko from '@/public/images/stelko.svg';

export default function Logo() {
  const pathname = usePathname();
  // Content to show as Logo
  const Content = (
    <div className="flex items-center gap-1">
      <Image
        src={Ghost}
        alt="Stelko's Ghost Logo"
        className="hidden h-11 w-11"
      />
      <Image src={Stelko} alt="Stelko's Typeface Logo" className="h-11 w-40 " />
    </div>
  );

  // Only work as a link to Home page if not on it
  if (pathname === '/') {
    return Content;
  }
  return <Link href="/">{Content}</Link>;
}
