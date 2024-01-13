import HeroModule from '@/components/modules/hero/hero.module';
import ModuleBuilder from '@/components/modules/module-builder.component';
import { TProject } from '@/types';

type Props = { project?: TProject };

export default function ProjectPage({ project }: Props) {
  return (
    <>
      <HeroModule
        heading={project?.title}
        image={project?.thumbnail}
        tags={project?.tags}
      />
      {project?.modules
        ? project.modules.map((module) => {
            // eslint-disable-next-line react/jsx-props-no-spreading
            return <ModuleBuilder key={module._key} {...module} />;
          })
        : null}
    </>
  );
}
