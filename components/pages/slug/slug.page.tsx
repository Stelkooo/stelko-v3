import LayoutGlobal from '@/components/global/layout.global';
import ModuleBuilder from '@/components/modules/module-builder.component';
import { TPage } from '@/types';

type Props = { data?: TPage };

export default function SlugPage({ data }: Props) {
  if (!data) return null;

  const { page, seo, site } = data;

  return (
    <LayoutGlobal seo={seo} site={site}>
      {page?.modules
        ? page.modules.map((module) => {
            // eslint-disable-next-line react/jsx-props-no-spreading
            return <ModuleBuilder key={module._key} {...module} />;
          })
        : null}
    </LayoutGlobal>
  );
}
