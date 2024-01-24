import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

async function getReferences(id: string) {
  const referencesQuery = groq`*[_id == "${id}" || references("${id}")] { _type, slug }`;
  const references: { _type: string; slug?: { current?: string } }[] =
    await client.fetch(referencesQuery);

  if (!references) return [];

  return references.map(
    (reference) =>
      `${reference._type}${reference?.slug ? `:${reference.slug.current}` : ''}`
  );
}

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current?: string };
      _id: string;
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
    const tagsToRevalidate: string[] = [];

    if (body._type === 'home') {
      tagsToRevalidate.push('home');
    } else if (body._type === 'page') {
      tagsToRevalidate.push(`page:${body?.slug?.current}`);
    } else if (['reusableModule', 'tag', 'tech'].includes(body._type)) {
      const references = await getReferences(body._id);
      tagsToRevalidate.push(...references);
    } else if (['project', 'service', 'testimonial'].includes(body._type)) {
      tagsToRevalidate.push(`page:${body._type}s`);
    } else if (body._type === 'blog') {
      tagsToRevalidate.push('page:blog');
    } else if (['header', 'footer', 'general'].includes(body._type)) {
      tagsToRevalidate.push('site');
    }

    tagsToRevalidate.forEach((tag) => revalidateTag(tag));

    console.log('Tags revalidated: ', tagsToRevalidate.join(', '));

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
