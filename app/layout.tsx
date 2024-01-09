import type { Metadata } from 'next';
import './globals.css';
import { Bricolage_Grotesque } from 'next/font/google';

import { cn } from '@/lib/utils';
import { WEBSITE_HOST_URL } from '@/lib/constants';

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    template: '%s | Stelko',
    default: 'Stelko',
  },
  metadataBase: new URL(WEBSITE_HOST_URL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          bricolageGrotesque.variable,
          'min-h-[100dvh] overflow-x-hidden font-sans'
        )}
      >
        {children}
      </body>
    </html>
  );
}
