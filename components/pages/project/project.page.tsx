import { vercelStegaCleanAll } from '@sanity/client/stega';

import HeroModule from '@/components/modules/hero/hero.module';
import ModuleBuilder from '@/components/modules/module-builder.component';
import { TProject } from '@/types';

type Props = { project?: TProject };

export default function ProjectPage({ project }: Props) {
  const projectCleaned = vercelStegaCleanAll(project);

  return (
    <>
      <HeroModule
        heading={projectCleaned?.title}
        subheading={projectCleaned?.description}
        image={projectCleaned?.thumbnail}
        tags={projectCleaned?.tags}
      />
      {projectCleaned?.modules
        ? projectCleaned.modules.map((module) => {
            // eslint-disable-next-line react/jsx-props-no-spreading
            return <ModuleBuilder key={module._key} {...module} />;
          })
        : null}
    </>
  );
}
