import { vercelStegaCleanAll } from '@sanity/client/stega';

import ModuleBuilder from '@/components/modules/module-builder.component';
import { TService } from '@/types';

type Props = { service?: TService };

export default function ServicePage({ service }: Props) {
  const serviceCleaned = vercelStegaCleanAll(service);

  return serviceCleaned?.modules
    ? serviceCleaned.modules.map((module) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <ModuleBuilder key={module._key} {...module} />;
      })
    : null;
}
