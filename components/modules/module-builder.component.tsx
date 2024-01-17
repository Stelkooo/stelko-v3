import {
  TBlogModule,
  TCtaModule,
  TFaqModule,
  THeroModule,
  TImageModule,
  TLayoutModule,
  TProjectModule,
  TTechStackModule,
  TTestimonialModule,
} from '@/types';

import HeroModule from './hero/hero.module';
import ImageModule from './image/image.module';
import CtaModule from './cta/cta.module';
import LayoutModule from './layout/layout.module';
import TestimonialModule from './testimonial/testimonial.module';
import FaqModule from './faq/faq.module';
import ProjectModule from './project/project.module';
import TechStackModule from './tech-stack/tech-stack.module';
import BlogModule from './blog/blog.module';

const ModulesMap = {
  heroModule: HeroModule,
  imageModule: ImageModule,
  ctaModule: CtaModule,
  layoutModule: LayoutModule,
  testimonialModule: TestimonialModule,
  faqModule: FaqModule,
  projectModule: ProjectModule,
  techStackModule: TechStackModule,
  blogModule: BlogModule,
};

type Props =
  | THeroModule
  | TImageModule
  | TCtaModule
  | TLayoutModule
  | TTestimonialModule
  | TFaqModule
  | TProjectModule
  | TTechStackModule
  | TBlogModule;

export default function ModuleBuilder({ ...props }: Props) {
  if (!props._type) throw new Error('Object does not have a "_type" property');

  const Module = ModulesMap[props._type as keyof typeof ModulesMap];
  if (!Module) throw new Error(`Module does not exist - ${Module}`);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Module {...props} />;
}
