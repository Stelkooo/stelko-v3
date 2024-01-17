import FormBuilder from '@/components/shared/form-builder.component';
import { TContactModule } from '@/types';

export default function ContactModule({ form, heading }: TContactModule) {
  return (
    <section>
      <div className="container mb-20 space-y-8">
        {heading ? <h2>{heading}</h2> : null}
        <FormBuilder form={form} />
      </div>
    </section>
  );
}
