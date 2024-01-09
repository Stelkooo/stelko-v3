import { TNavLink } from '@/types';
import { Button, ButtonProps } from '../ui/button';
import SiteLink from './site-link.component';

type Props = { cta?: TNavLink } & ButtonProps;

export default function CTA({ cta, variant = 'default' }: Props) {
  return (
    <Button variant={variant}>
      <SiteLink link={cta?.link}>{cta?.title}</SiteLink>
    </Button>
  );
}
