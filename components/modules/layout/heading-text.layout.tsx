import CustomPortableText from '@/components/shared/custom-portable-text.component';
import { cn } from '@/lib/utils';
import { TLayoutModule } from '@/types';

export default function HeadingTextLayout({
  heading,
  headingTextCard,
}: TLayoutModule) {
  return (
    <section>
      <div className="container my-20 grid gap-2 sm:grid-cols-2 sm:gap-8">
        {heading ? <h2>{heading}</h2> : null}
        <div
          className={cn({
            'order-first': headingTextCard?.textOnLeft === true,
            'prose prose-invert': true,
          })}
        >
          <CustomPortableText value={headingTextCard?.copy} />
        </div>
      </div>
    </section>
  );
}
