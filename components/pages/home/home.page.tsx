import LayoutGlobal from '@/components/global/layout.global';
import ModuleBuilder from '@/components/modules/module-builder.component';
import { THome } from '@/types';

type Props = { data?: THome };

export default function HomePage({ data }: Props) {
  if (!data) return null;

  const { home, seo, site } = data;

  return (
    <LayoutGlobal seo={seo} site={site}>
      {home?.modules
        ? home.modules.map((module) => {
            // eslint-disable-next-line react/jsx-props-no-spreading
            return <ModuleBuilder key={module._key} {...module} />;
          })
        : null}
    </LayoutGlobal>
  );
}
