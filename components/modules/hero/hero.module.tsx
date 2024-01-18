import Photo from '@/components/shared/photo.component';
import Tags from '@/components/shared/tags.component';
import { cn } from '@/lib/utils';
import { THeroModule } from '@/types';

export default function HeroModule({
  heading,
  image,
  subheading,
  tags,
}: THeroModule) {
  return (
    <section>
      <div
        className={cn({
          'container relative flex flex-col items-start justify-end space-y-8 py-32':
            true,
          relative: image,
        })}
      >
        {image ? (
          <Photo image={image} fill className="object-cover opacity-15" />
        ) : null}
        {heading ? <h1 className="relative">{heading}</h1> : null}
        {subheading ? (
          <p className="as-h4 relative sm:max-w-[60%]">{subheading}</p>
        ) : null}
        {tags ? <Tags tags={tags} /> : null}
      </div>
    </section>
  );
}
