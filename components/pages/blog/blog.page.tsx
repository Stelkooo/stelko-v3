import LayoutGlobal from '@/components/global/layout.global';
import HeroModule from '@/components/modules/hero/hero.module';
import ModuleBuilder from '@/components/modules/module-builder.component';
import ContextTable from '@/components/shared/context-table.component';
import CustomPortableText from '@/components/shared/custom-portable-text.component';
import { getDateFormatted } from '@/lib/utils';
import { TBlogPayload } from '@/types';

type Props = { data?: TBlogPayload };

export default function BlogPage({ data }: Props) {
  if (!data) return null;

  const { blog, seo, site } = data;

  const date = blog?.datePublished ? getDateFormatted(blog.datePublished) : '';

  return (
    <LayoutGlobal seo={seo} site={site}>
      <HeroModule
        heading={blog?.title}
        image={blog?.thumbnail}
        tags={blog?.tags}
      />
      <div className="container grid items-start gap-16 px-6 py-8">
        <div className="grid items-center gap-8 text-xl sm:grid-cols-2">
          <span
            className="sr-only"
            itemProp="dateModified"
            content={`${blog?.datePublished}`}
          />
          <time itemProp="datePublished" content={`${blog?.datePublished}`}>
            {date}
          </time>
          <span
            className="sr-only"
            itemProp="author"
            itemScope
            itemType="https://schema.org/Person"
          >
            <a itemProp="url" href="https://stelko.xyz">
              <span itemProp="name">Stelko</span>
            </a>
          </span>
        </div>
        <div className="flex flex-col items-start gap-16 lg:flex-row">
          <div className="flex flex-col space-y-4 lg:sticky lg:top-32">
            <h2>Contents</h2>
            <ul className="flex flex-col gap-4 text-xl">
              {blog?.copy?.filter((item) => item.style === 'h2') && (
                <ContextTable
                  value={blog.copy.filter((item) => item.style === 'h2')}
                />
              )}
            </ul>
          </div>
          <div className="prose prose-xl prose-invert text-primary-foreground lg:prose-2xl prose-figcaption:text-primary-foreground prose-table:bg-secondary-foreground prose-td:pl-[0.6em]">
            <CustomPortableText value={blog?.copy} />
          </div>
        </div>
      </div>
      {blog?.modules &&
        blog.modules.map((module) => {
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <ModuleBuilder key={module._key} {...module} />;
        })}
    </LayoutGlobal>
  );
}
