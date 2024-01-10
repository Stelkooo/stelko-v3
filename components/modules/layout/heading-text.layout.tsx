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
        {headingTextCard?.text ? (
          <p
            className={cn({
              'order-first': headingTextCard?.textOnLeft === true,
            })}
          >
            {headingTextCard.text}
          </p>
        ) : null}
      </div>
    </section>
  );
}
