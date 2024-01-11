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
      <div className="container my-20 space-y-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          {heading ? <h2>{heading}</h2> : null}
          {linkToAllTestimonials ? (
            <Button asChild>
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
        <div className="grid gap-8 md:grid-cols-2">
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
      </div>
    </section>
  );
}
