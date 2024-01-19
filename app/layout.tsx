import './globals.css';
import { Bricolage_Grotesque } from 'next/font/google';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
  adjustFontFallback: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={cn(
          bricolageGrotesque.variable,
          'min-h-[100dvh] overflow-x-hidden font-sans'
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
