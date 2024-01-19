import { vercelStegaCleanAll } from '@sanity/client/stega';

import ModuleBuilder from '@/components/modules/module-builder.component';
import { THome } from '@/types';

type Props = { home?: THome };

export default function HomePage({ home }: Props) {
  const homeCleaned = vercelStegaCleanAll(home);

  return homeCleaned?.modules
    ? homeCleaned.modules.map((module) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <ModuleBuilder key={module._key} {...module} />;
      })
    : null;
}
