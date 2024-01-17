import { PortableText, PortableTextComponents } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import { slugify } from '@/lib/utils';

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => {
      return <a href={`#${slugify(children as string)}`}>{children}</a>;
    },
    h2: ({ children }) => {
      return (
        <li>
          <a href={`#${slugify(children as string)}`}>{children}</a>
        </li>
      );
    },
    h3: ({ children }) => {
      return <a href={`#${slugify(children as string)}`}>{children}</a>;
    },
    h4: ({ children }) => {
      return <a href={`#${slugify(children as string)}`}>{children}</a>;
    },
    h5: ({ children }) => {
      return <a href={`#${slugify(children as string)}`}>{children}</a>;
    },
    h6: ({ children }) => {
      return <a href={`#${slugify(children as string)}`}>{children}</a>;
    },
  },
};

type Props = {
  value?: PortableTextBlock[];
};

export default function ContextTable({ value }: Props) {
  if (!value) return null;

  return <PortableText components={components} value={value} />;
}
