import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { TTestimonial } from '@/types';

type Props = {
  testimonial?: TTestimonial;
};

export default function Testimonial({ testimonial }: Props) {
  return (
    <Card className="flex flex-col">
      <CardContent>
        <p>{testimonial?.testimonial || ''}</p>
      </CardContent>
      <CardFooter className="mt-auto pt-6">
        <p className="font-medium">{testimonial?.name || ''}</p>
      </CardFooter>
    </Card>
  );
}
