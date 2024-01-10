import { TCtaModule, THeroModule, TImageModule, TLayoutModule } from '@/types';

import HeroModule from './hero/hero.module';
import ImageModule from './image/image.module';
import CtaModule from './cta/cta.module';
import LayoutModule from './layout/layout.module';

const ModulesMap = {
  heroModule: HeroModule,
  imageModule: ImageModule,
  ctaModule: CtaModule,
  layoutModule: LayoutModule,
};

type Props = THeroModule | TImageModule | TCtaModule | TLayoutModule;

export default function ModuleBuilder({ ...props }: Props) {
  if (!props._type) throw new Error('Object does not have a "_type" property');

  const Module = ModulesMap[props._type as keyof typeof ModulesMap];
  if (!Module) throw new Error(`Module does not exist - ${Module}`);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Module {...props} />;
}
