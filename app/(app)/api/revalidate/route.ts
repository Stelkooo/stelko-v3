import { revalidateTag } from 'next/cache';
import type { NextApiRequest } from 'next';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<
      BodyInit & { _type: string; slug?: { current?: string } }
    >(req as unknown as NextApiRequest, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      const message = 'Invalid signature';
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    }

    if (!body?._type) {
      return new Response(body, { status: 400 });
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
