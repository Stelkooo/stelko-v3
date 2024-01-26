import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning className="scroll-smooth">
      <Head />
      <body className="min-h-[100dvh] overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
