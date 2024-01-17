/* eslint-disable react/jsx-props-no-spreading */

'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useFormspark } from '@formspark/use-formspark';
import { createRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useToggle } from 'usehooks-ts';
import { Loader2 } from 'lucide-react';

import { TForm, TInputType } from '@/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const getZodSchemaObj = (inputType?: TInputType) => {
  switch (inputType) {
    case 'email':
      return z.string().email().min(2);
    case 'text':
      return z.string().min(2).max(50);
    case 'textArea':
      return z.string().min(3).max(255);
    default:
      return z.string().min(2).max(50);
  }
};

const getFormElement = (
  field: ControllerRenderProps<
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [x: string]: any;
    },
    string
  >,
  inputType?: TInputType,
  placeholder?: string
) => {
  switch (inputType) {
    case 'text':
      return <Input {...field} placeholder={placeholder} />;
    case 'email':
      return <Input {...field} placeholder={placeholder} />;
    case 'textArea':
      return (
        <Textarea
          {...field}
          className="resize-none"
          placeholder={placeholder}
          rows={3}
        />
      );
    default:
      return <Input {...field} placeholder={placeholder} />;
  }
};

type Props = { form?: TForm };

export default function FormBuilder({ form }: Props) {
  const recaptchaRef = createRef<ReCAPTCHA>();
  const [hasReCAPTCHAed, toggleHasReCAPTCHAed] = useToggle(false);

  const formObjs = form?.flatMap((row) => {
    return row?.fields?.map((input) => {
      return {
        name: input.fieldId?.current,
        fieldType: getZodSchemaObj(input.inputType),
      };
    });
  }) as { name: string; fieldType: z.ZodSchema }[];

  const formSchema = z.object(
    Object.fromEntries(formObjs.map((obj) => [obj.name, obj.fieldType]))
  );

  const formDefined = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...Object.fromEntries(formObjs.map((obj) => [obj.name, ''])),
    },
  });

  const [submit, submitting] = useFormspark({ formId: 'c3xA2tzX' });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = recaptchaRef.current?.getValue();
    await submit({ ...values, 'g-recaptcha-response': token });
    toast('Form submitted');
  }

  return (
    <Form {...formDefined}>
      <form
        onSubmit={formDefined.handleSubmit(onSubmit)}
        className="flex h-full max-w-[960px] flex-col gap-8"
      >
        <div className="grid gap-4">
          {form?.map((row) => (
            <div key={row._key} className="grid gap-4 sm:grid-cols-2">
              {row?.fields?.map((input) => (
                <FormField
                  key={input._key}
                  control={formDefined.control}
                  name={input.fieldId?.current || ''}
                  render={({ field }) => (
                    <FormItem
                      className={
                        row?.fields?.length === 1
                          ? 'sm:col-span-2'
                          : 'sm:col-span-1'
                      }
                    >
                      <FormControl>
                        {getFormElement(
                          field,
                          input.inputType,
                          input.fieldLabel
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
            theme="dark"
            size="normal"
            onChange={() => toggleHasReCAPTCHAed()}
          />
          <Button type="submit" disabled={submitting || !hasReCAPTCHAed}>
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
