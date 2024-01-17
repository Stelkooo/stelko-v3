import {
  AppWindow,
  Cpu,
  HelpCircle,
  Image,
  Layout,
  LucideIcon,
  Phone,
  Presentation,
  ScrollText,
  UserCircle2,
  X,
} from 'lucide-react';
import { ArrayOfType, defineArrayMember, defineField } from 'sanity';

const moduleNames = [
  'heroModule',
  'layoutModule',
  'faqModule',
  'testimonialModule',
  'ctaModule',
  'imageModule',
  'projectModule',
  'techStackModule',
  'blogModule',
] as const;

type TModuleNames = (typeof moduleNames)[number];

export const modulesArr: ArrayOfType[] = [
  ...moduleNames.map((module) => defineArrayMember({ type: module })),
];

export function getModuleInfo(module: TModuleNames): {
  subtitle: string;
  media: LucideIcon;
} {
  switch (module) {
    case 'heroModule':
      return { subtitle: 'Hero', media: Presentation };
    case 'layoutModule':
      return { subtitle: 'Layout', media: Layout };
    case 'faqModule':
      return { subtitle: 'FAQ', media: HelpCircle };
    case 'testimonialModule':
      return { subtitle: 'Testimonial', media: UserCircle2 };
    case 'ctaModule':
      return { subtitle: 'CTA', media: Phone };
    case 'imageModule':
      return { subtitle: 'Image', media: Image };
    case 'projectModule':
      return { subtitle: 'Project/s', media: AppWindow };
    case 'techStackModule':
      return { subtitle: 'Tech stack', media: Cpu };
    case 'blogModule':
      return { subtitle: 'Blog', media: ScrollText };
    default:
      return { subtitle: 'Invalid Module', media: X };
  }
}

export default defineField({
  name: 'modules',
  type: 'array',
  group: 'content',
  of: [
    ...modulesArr,
    defineArrayMember({
      title: 'Reusable Modules',
      type: 'reference',
      to: [{ type: 'reusableModule' }],
    }),
  ],
});
