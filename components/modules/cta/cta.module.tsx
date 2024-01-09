import CTA from '@/components/shared/cta.component';
import { TCtaModule } from '@/types';

export default function CtaModule({ ctas, heading, text }: TCtaModule) {
  return (
    <section>
      <div className="container grid gap-6 sm:grid-cols-2">
        <div className="space-y-1">
          {heading ? <h2>{heading}</h2> : null}
          {text ? <p>{text}</p> : null}
        </div>
        {ctas ? (
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-end">
            {ctas?.primaryCta ? <CTA cta={ctas.primaryCta} /> : null}
            {ctas?.secondaryCta ? (
              <CTA cta={ctas.secondaryCta} variant="outline" />
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
