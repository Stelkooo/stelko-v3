import Photo from '@/components/shared/photo.component';
import { TImageModule } from '@/types';

export default function SingleImage({ image }: TImageModule) {
  return (
    <section>
      <div className="container my-10">
        <figure>
          {image ? <Photo image={image} /> : null}
          {image?.caption ? (
            <figcaption className="as-small mt-1 text-center">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      </div>
    </section>
  );
}
