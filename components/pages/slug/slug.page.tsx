import { vercelStegaCleanAll } from '@sanity/client/stega';

import ModuleBuilder from '@/components/modules/module-builder.component';
import { TPage } from '@/types';

type Props = { page?: TPage };

export default function SlugPage({ page }: Props) {
  const pageCleaned = vercelStegaCleanAll(page);

  return pageCleaned?.modules
    ? pageCleaned.modules.map((module) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <ModuleBuilder key={module._key} {...module} />;
      })
    : null;
}
