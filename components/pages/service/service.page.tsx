import ModuleBuilder from '@/components/modules/module-builder.component';
import { TService } from '@/types';
import LayoutGlobal from '@/components/global/layout.global';

type Props = { data?: TService };

export default function ServicePage({ data }: Props) {
  if (!data) return null;

  const { service, seo, site } = data;

  return (
    <LayoutGlobal seo={seo} site={site}>
      {service?.modules
        ? service.modules.map((module) => {
            // eslint-disable-next-line react/jsx-props-no-spreading
            return <ModuleBuilder key={module._key} {...module} />;
          })
        : null}
    </LayoutGlobal>
  );
}
