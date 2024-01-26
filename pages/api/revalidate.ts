import { NextApiRequest, NextApiResponse } from 'next';
import { parseBody } from 'next-sanity/webhook';
import { groq } from 'next-sanity';

import resolveHref from '@/sanity/lib/links';
import { getClient } from '@/sanity/lib/client';

export { config } from 'next-sanity/webhook';

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
    await getClient().fetch(referencesQuery);

  if (!references) return [];

  return references
    .flat(2)
    .map(
      (reference) => `${resolveHref(reference._type, reference.slug?.current)}`
    ) as string[];
}

async function revalidatePaths(res: NextApiResponse, paths: string[]) {
  await Promise.all(
    paths.map(async (path) => {
      await res.revalidate(path);
    })
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current?: string };
      _id: string;
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      const message = 'Invalid signature';
      res.status(401).json({ message, isValidSignature, body });
      return;
    }

    if (!body?._type) {
      const message = 'Bad Request';
      res.status(400).json({ message, body });
      return;
    }

    const pagesToRevalidate: string[] = [];

    if (body._type === 'home') {
      pagesToRevalidate.push(`${resolveHref(body._type)}`);
    } else if (body._type === 'page') {
      pagesToRevalidate.push(`${resolveHref(body._type, body.slug?.current)}`);
    } else if (['reusableModule', 'tag', 'tech'].includes(body._type)) {
      const references = await getReferences(body._id);
      pagesToRevalidate.push(
        ...references,
        '/',
        '/projects',
        '/blog',
        '/services'
      );
    } else if (['project', 'service', 'testimonial'].includes(body._type)) {
      const references = await getReferences(body._id);
      pagesToRevalidate.push(
        ...references,
        `${resolveHref(body._type, body.slug?.current)}`,
        `/${body._type}s`,
        '/'
      );
    } else if (body._type === 'blog') {
      const references = await getReferences(body._id);
      pagesToRevalidate.push(
        ...references,
        `${resolveHref(body._type, body.slug?.current)}`,
        `/${body._type}`,
        '/'
      );
    } else if (['header', 'footer', 'general'].includes(body._type)) {
      pagesToRevalidate.push(`/`);
    }

    await revalidatePaths(res, pagesToRevalidate);

    res.status(200).json({ body });
    return;
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) res.status(500).json({ message: err.message });
  }
}
