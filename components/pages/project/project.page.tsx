import LayoutGlobal from '@/components/global/layout.global';
import HeroModule from '@/components/modules/hero/hero.module';
import ModuleBuilder from '@/components/modules/module-builder.component';
import { TProjectPayload } from '@/types';

type Props = { data?: TProjectPayload };

export default function ProjectPage({ data }: Props) {
  if (!data) return null;

  const { project, seo, site } = data;

  return (
    <LayoutGlobal seo={seo} site={site}>
      <HeroModule
        heading={project?.title}
        subheading={project?.description}
        image={project?.thumbnail}
        tags={project?.tags}
      />
      {project?.modules
        ? project.modules.map((module) => {
            // eslint-disable-next-line react/jsx-props-no-spreading
            return <ModuleBuilder key={module._key} {...module} />;
          })
        : null}
    </LayoutGlobal>
  );
}
