import CTA from '@/components/shared/cta.component';
import CustomPortableText from '@/components/shared/custom-portable-text.component';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TLayoutModule } from '@/types';

type Props = { columnNumber?: 2 | 3 } & TLayoutModule;

export default function ColumnLayout({
  columnNumber = 2,
  heading,
  twoColumnCards,
  threeColumnCards,
}: Props) {
  return (
    <section>
      <div className="container my-20 space-y-8">
        {heading ? <h2>{heading}</h2> : null}{' '}
        <div
          className={cn({
            'grid gap-4 md:gap-8': true,
            'md:grid-cols-2': columnNumber === 2,
            'md:grid-cols-2 lg:grid-cols-3': columnNumber === 3,
          })}
        >
          {twoColumnCards
            ? twoColumnCards.map((card) => (
                <Card key={card._key} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{card?.heading}</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-invert">
                    <CustomPortableText value={card?.copy} />
                  </CardContent>
                  <CardFooter className="mt-auto flex flex-col">
                    <CTA cta={card.cta} className="self-end" />
                  </CardFooter>
                </Card>
              ))
            : null}
          {threeColumnCards
            ? threeColumnCards.map((card) => (
                <Card key={card._key} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{card?.heading}</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-invert">
                    <CustomPortableText value={card?.copy} />
                  </CardContent>
                  <CardFooter className="mt-auto flex flex-col">
                    <CTA cta={card.cta} className="self-end" />
                  </CardFooter>
                </Card>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
