import Photo from '@/components/shared/photo.component';
import { techCategories } from '@/lib/constants';
import { TTechStackModule } from '@/types';

export default function TechStackModule({ tech }: TTechStackModule) {
  if (!tech) return null;

  const techCategoriesFilters = techCategories.filter((value) =>
    tech.some((item) => item.category === value.value)
  );

  return (
    <section>
      <div className="container my-20 space-y-8">
        <h2>Tech stack</h2>
        <div>
          <ul className="grid gap-4">
            {techCategoriesFilters.map((category) => (
              <li
                key={category?.value}
                className="grid gap-y-8 rounded-sm border bg-card px-6 py-8 md:grid-cols-2"
              >
                <h3 className="md:pr-8">{category?.title}</h3>
                <ul className="flex flex-wrap items-center gap-x-20 gap-y-6">
                  {tech.map((item) => {
                    if (item?.category === category?.value) {
                      return (
                        <li
                          key={item?._key}
                          className="flex items-center gap-3"
                        >
                          {item?.image ? (
                            <Photo
                              image={item.image}
                              className="max-h-8 w-auto rounded-none border-0"
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
