import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { TTestimonial } from '@/types';

type Props = {
  testimonial?: TTestimonial;
};

export default function Testimonial({ testimonial }: Props) {
  return (
    <Card>
      <CardContent>
        <p>{testimonial?.testimonial || ''}</p>
      </CardContent>
      <CardFooter>
        <p className="as-small font-medium">{testimonial?.name || ''}</p>
      </CardFooter>
    </Card>
  );
}
