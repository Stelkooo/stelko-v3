import { TTestimonialModule } from '@/types';
import Testimonial from './testimonial.testimonial';
import SiteLink from '@/components/shared/site-link.component';
import { Button } from '@/components/ui/button';

export default function TestimonialModule({
  heading,
  linkToAllTestimonials,
  testimonial,
  testimonials,
}: TTestimonialModule) {
  return (
    <section>
      <div className="container my-20 grid gap-y-8">
        {heading ? <h2>{heading}</h2> : null}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          {testimonial ? (
            <div className="md:col-start-2">
              <Testimonial testimonial={testimonial} />
            </div>
          ) : null}
          {testimonials
            ? testimonials.map((testi) => (
                <Testimonial testimonial={testi} key={testi._id} />
              ))
            : null}
        </div>
        {linkToAllTestimonials ? (
          <Button asChild className="justify-self-end">
            <SiteLink
              link={{
                linkType: 'internal',
                internal: {
                  _type: 'page',
                  slug: { _type: 'slug', current: 'testimonials' },
                },
              }}
            >
              View all testimonials
            </SiteLink>
          </Button>
        ) : null}
      </div>
    </section>
  );
}
