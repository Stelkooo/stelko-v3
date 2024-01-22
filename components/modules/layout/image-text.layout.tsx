import CustomPortableText from '@/components/shared/custom-portable-text.component';
import Photo from '@/components/shared/photo.component';
import { cn } from '@/lib/utils';
import { TLayoutModule } from '@/types';

export default function ImageTextLayout({
  heading,
  imageTextCard,
}: TLayoutModule) {
  return (
    <section>
      <div className="container my-20 grid items-center gap-2 sm:grid-cols-2 sm:gap-8">
        <div className="space-y-2">
          {heading ? <h2>{heading}</h2> : null}
          <div className="prose prose-invert">
            <CustomPortableText value={imageTextCard?.copy} />
          </div>
        </div>
        {imageTextCard?.image ? (
          <figure
            className={cn({
              'order-first': imageTextCard?.imageOnLeft === true,
            })}
          >
            <Photo
              image={imageTextCard.image}
              className="max-h-screen object-cover"
            />
          </figure>
        ) : null}
      </div>
    </section>
  );
}
