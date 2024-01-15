import Photo from '@/components/shared/photo.component';
import { TImageModule } from '@/types';

export default function DoubleImage({ images }: TImageModule) {
  return (
    <section>
      <div className="container my-20 grid gap-4 sm:grid-cols-2">
        {images
          ? images.map((image) =>
              image ? (
                <figure key={image._key}>
                  <Photo image={image} />
                  {image?.caption ? (
                    <figcaption className="as-small mt-1 text-center">
                      {image.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null
            )
          : null}
      </div>
    </section>
  );
}
