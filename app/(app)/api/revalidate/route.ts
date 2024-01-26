import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import resolveHref from '@/sanity/lib/links';
import { WEBSITE_HOST_URL } from '@/lib/constants';

type TRevalidatePath = { slug: string; type?: 'layout' | 'page' };

async function getReferences(id: string) {
  const referencesQuery = groq`
  *[references("${id}")] {
    _type != "reusableModule" => {
      _type,
      slug,  
    },
    _type == "reusableModule" => {
      "references": *[references(^._id)] {
        _type,
        slug,
      },
    },
  }
  `;
  const references: { _type: string; slug?: { current?: string } }[] =
    await client.fetch(referencesQuery);

  if (!references) return [];

  return references.flat(2).map((reference) => ({
    slug: `${resolveHref(reference._type, reference.slug?.current)}`,
  })) as TRevalidatePath[];
}

async function revalidatePaths(paths: TRevalidatePath[]) {
  await Promise.all(
    paths.map(async ({ slug, type }) => {
      await fetch(
        `${WEBSITE_HOST_URL}/api/revalidate-path?slug=${slug}${
          type ? `&type=${type}` : ''
        }`
      );
    })
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
    const pagesToRevalidate: TRevalidatePath[] = [];

    if (body._type === 'home') {
      pagesToRevalidate.push({
        slug: `${resolveHref(body._type)}`,
      });
    } else if (body._type === 'page') {
      pagesToRevalidate.push({
        slug: `${resolveHref(body._type, body.slug?.current)}`,
      });
    } else if (['reusableModule', 'tag', 'tech'].includes(body._type)) {
      const references = await getReferences(body._id);
      pagesToRevalidate.push(...references);
    } else if (['project', 'service', 'testimonial'].includes(body._type)) {
      const references = await getReferences(body._id);
      pagesToRevalidate.push(
        ...references,
        {
          slug: `${resolveHref(body._type, body.slug?.current)}`,
        },
        { slug: `/${body._type}s` }
      );
    } else if (body._type === 'blog') {
      const references = await getReferences(body._id);
      pagesToRevalidate.push(
        ...references,
        {
          slug: `${resolveHref(body._type, body.slug?.current)}`,
        },
        { slug: `/${body._type}` }
      );
    } else if (['header', 'footer', 'general'].includes(body._type)) {
      pagesToRevalidate.push({ slug: `/`, type: 'layout' });
    }

    revalidatePaths(pagesToRevalidate);

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
