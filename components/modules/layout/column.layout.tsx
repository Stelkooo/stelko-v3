import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      <div className="container my-20 space-y-2">
        {heading ? <h2>{heading}</h2> : null}{' '}
        <div
          className={cn({
            'grid gap-8': true,
            'md:grid-cols-2': columnNumber === 2,
            'md:grid-cols-2 lg:grid-cols-3': columnNumber === 3,
          })}
        >
          {twoColumnCards
            ? twoColumnCards.map((card) => (
                <Card key={card._key}>
                  <CardHeader>
                    <CardTitle>{card?.heading}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {card?.text ? <p>{card.text}</p> : null}
                  </CardContent>
                </Card>
              ))
            : null}
          {threeColumnCards
            ? threeColumnCards.map((card) => (
                <Card key={card._key}>
                  <CardHeader>
                    <CardTitle>{card?.heading}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {card?.text ? <p>{card.text}</p> : null}
                  </CardContent>
                </Card>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}