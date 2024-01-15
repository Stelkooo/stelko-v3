import { Github, Linkedin } from 'lucide-react';
import type { Url } from 'url';

import { TSocials } from '@/types';
import SiteLink from './site-link.component';
import { Button } from '../ui/button';

function Icon({ children, url }: { children: React.ReactNode; url: Url }) {
  return (
    <Button variant="ghost" size="icon" asChild>
      <SiteLink
        link={{ linkType: 'external', external: url, openNewWindow: true }}
      >
        {children}
      </SiteLink>
    </Button>
  );
}

type Props = {
  socials?: TSocials;
};

export default function Socials({ socials }: Props) {
  if (!socials) return null;

  return (
    <nav>
      <ul className="flex gap-4">
        {socials.linkedin ? (
          <li>
            <Icon url={socials.linkedin}>
              <Linkedin size={32} className="relative" />
              <span className="sr-only">Link to my LinkedIn profile</span>
            </Icon>
          </li>
        ) : null}
        {socials.github ? (
          <li>
            <Icon url={socials.github}>
              <Github size={32} className="relative" />
              <span className="sr-only">Link to my Github profile</span>
            </Icon>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
