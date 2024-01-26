/* eslint-disable react/jsx-props-no-spreading */

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Bricolage_Grotesque } from 'next/font/google';

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolageGrotesque',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
  adjustFontFallback: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-bricolage-grotesque: ${bricolageGrotesque.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
