import Photo from '@/components/shared/photo.component';
import { cn } from '@/lib/utils';
import { THeroModule } from '@/types';

export default function HeroModule({ heading, image }: THeroModule) {
  return (
    <section>
      <div
        className={cn({
          'container relative my-32 flex flex-col items-start justify-end':
            true,
          relative: image,
        })}
      >
        {image ? (
          <Photo image={image} fill className="object-cover opacity-15" />
        ) : null}
        {heading ? <h1 className="relative">{heading}</h1> : null}
      </div>
    </section>
  );
}
