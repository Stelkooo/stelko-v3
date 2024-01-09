import { TCtaModule, THeroModule, TImageModule } from '@/types';

import HeroModule from './hero/hero.module';
import ImageModule from './image/image.module';
import CtaModule from './cta/cta.module';

const ModulesMap = {
  heroModule: HeroModule,
  imageModule: ImageModule,
  ctaModule: CtaModule,
};

type Props = THeroModule | TImageModule | TCtaModule;

export default function ModuleBuilder({ ...props }: Props) {
  if (!props._type) throw new Error('Object does not have a "_type" property');

  const Module = ModulesMap[props._type as keyof typeof ModulesMap];
  if (!Module) throw new Error(`Module does not exist - ${Module}`);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Module {...props} />;
}
