import CTA from '@/components/shared/cta.component';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TFaqModule } from '@/types';

export default function FaqModule({ cta, faqs, heading, text }: TFaqModule) {
  return (
    <section>
      <div className="container my-20 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            {heading ? <h2>{heading}</h2> : null}
            {text ? <p>{text}</p> : null}
          </div>
          {cta ? <CTA cta={cta} /> : null}
        </div>
        <div>
          {faqs ? (
            <Accordion type="single" collapsible>
              {faqs.map((faq) => (
                <AccordionItem value={faq._key} key={faq._key}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : null}
        </div>
      </div>
    </section>
  );
}
