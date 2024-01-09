import ModuleBuilder from '@/components/modules/module-builder.component';
import { THome } from '@/types';

type Props = { home?: THome };

export default function HomePage({ home }: Props) {
  return home?.modules
    ? home.modules.map((module) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <ModuleBuilder key={module._key} {...module} />;
      })
    : null;
}
