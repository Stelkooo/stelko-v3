'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Logo() {
  const pathname = usePathname();
  // Content to show as Logo
  const Content = <span className="as-h3 font-black">stelko</span>;

  // Only work as a link to Home page if not on it
  if (pathname === '/') {
    return Content;
  }
  return <Link href="/">{Content}</Link>;
}
