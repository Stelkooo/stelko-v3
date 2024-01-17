import { PortableText, PortableTextComponents } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import { ExternalLink } from 'lucide-react';

import { TCodeBlock, TImage } from '@/types';

import Photo from './photo.component';
import { slugify } from '@/lib/utils';
import SiteLink from './site-link.component';
import CodeBlock from './code-block.component';
import Table from './table.component';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => {
      return <p>{children}</p>;
    },
    h1: ({ children }) => {
      return (
        <h1 id={`${slugify(children as string)}`} className="scroll-m-32">
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      return (
        <h2 id={`${slugify(children as string)}`} className="scroll-mt-32">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      return (
        <h3 id={`${slugify(children as string)}`} className="scroll-m-32">
          {children}
        </h3>
      );
    },
    h4: ({ children }) => {
      return (
        <h4 id={`${slugify(children as string)}`} className="scroll-m-32">
          {children}
        </h4>
      );
    },
    h5: ({ children }) => {
      return (
        <h5 id={`${slugify(children as string)}`} className="scroll-m-32">
          {children}
        </h5>
      );
    },
    h6: ({ children }) => {
      return (
        <h6 id={`${slugify(children as string)}`} className="scroll-m-32">
          {children}
        </h6>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      return (
        <SiteLink
          link={value}
          className={
            value?.linkType === 'external'
              ? 'inline-flex items-center gap-1'
              : undefined
          }
        >
          {children}
          {value?.linkType === 'external' ? <ExternalLink /> : null}
        </SiteLink>
      );
    },
  },
  types: {
    customImage: ({ value }: { value: TImage }) => {
      return (
        <figure>
          <Photo image={value} className="w-full object-cover" />
          <figcaption>{value.alt}</figcaption>
        </figure>
      );
    },
    code: ({ value }: { value: TCodeBlock }) => {
      return (
        <CodeBlock
          code={value.code}
          filename={value.filename}
          highlightedLines={value.highlightedLines}
          language={value.language}
        />
      );
    },
    table: ({ value }) => {
      return <Table table={value} />;
    },
  },
};

export default function CustomPortableText({
  value,
}: {
  value?: PortableTextBlock[];
}) {
  if (!value) return null;

  return <PortableText components={components} value={value} />;
}
