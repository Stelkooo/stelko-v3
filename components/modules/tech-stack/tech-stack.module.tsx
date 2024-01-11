import Photo from '@/components/shared/photo.component';
import { techCategories } from '@/lib/constants';
import { TTechStackModule } from '@/types';

export default function TechStackModule({ tech }: TTechStackModule) {
  if (!tech) return null;

  return (
    <section>
      <div className="container my-20 space-y-8">
        <h2>Tech stack</h2>
        <div>
          <ul className="grid space-y-8">
            {techCategories.map((category) => (
              <li
                key={category?.value}
                className="grid gap-8 border-t py-4 md:grid-cols-2"
              >
                <h3>{category?.title}</h3>
                <ul className="flex flex-wrap items-center gap-6">
                  {tech.map((item) => {
                    if (item?.category === category?.value) {
                      return (
                        <li key={item?._id} className="flex items-center gap-3">
                          {item?.image ? (
                            <Photo
                              image={item.image}
                              className="max-h-8 w-auto"
                              sizes="32px"
                            />
                          ) : null}
                          <h4>{item?.name}</h4>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
