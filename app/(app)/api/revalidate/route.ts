import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current?: string };
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      const message = 'Invalid signature';
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    }

    if (!body?._type) {
      const message = 'Bad Request';
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    // All `client.fetch` calls with `{next: {tags: [_type]}}` will be revalidated
    if (['footer', 'general', 'header'].includes(body._type)) {
      revalidateTag('site');
    } else {
      revalidateTag(
        `${body._type}${body?.slug ? `:${body.slug?.current}` : ''}`
      );
    }
    console.log(
      `Revalidated ${body._type}${body?.slug ? `:${body.slug?.current}` : ''}`
    );

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }
    return new Response('Error', { status: 500 });
  }
}
