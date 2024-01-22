import { TNavLink } from '@/types';
import { Button, ButtonProps } from '../ui/button';
import SiteLink from './site-link.component';

type Props = { cta?: TNavLink } & ButtonProps;

export default function CTA({ cta, className, variant = 'default' }: Props) {
  if (!cta?.title && (!cta?.link?.internal || !cta?.link?.external))
    return null;

  return (
    <Button variant={variant} className={className}>
      <SiteLink link={cta?.link}>{cta?.title}</SiteLink>
    </Button>
  );
}
