import Link from 'next/link';

import resolveHref from '@/sanity/lib/links';
import { TProjectModule } from '@/types';
import Photo from '@/components/shared/photo.component';
import Tags from '@/components/shared/tags.component';

export default function ProjectModule({ heading, projects }: TProjectModule) {
  return (
    <section>
      <div className="container my-20 space-y-8">
        {heading ? <h2>{heading}</h2> : null}
        {projects ? (
          <ul>
            {projects.map((project) => (
              <li key={project._id}>
                <Link href={`${resolveHref('project', project.slug?.current)}`}>
                  <div className="group/project grid gap-4 border-t py-4 lg:grid-cols-2">
                    <div className="space-y-4">
                      <h3 className="group-hover/project:underline">
                        {project.title}
                      </h3>
                      <Tags tags={project?.tags} />
                    </div>
                    {project?.thumbnail ? (
                      <figure className="overflow-hidden rounded-sm border">
                        <Photo
                          image={project.thumbnail}
                          className="transition-transform group-hover/project:scale-110"
                        />
                      </figure>
                    ) : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
