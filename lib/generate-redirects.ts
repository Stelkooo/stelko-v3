/* eslint-disable @typescript-eslint/no-var-requires */
const { sanityFetch } = require('../sanity/lib/fetch');
const resolveHref = require('../sanity/lib/links');
const { redirectsQuery } = require('../sanity/lib/queries');
const { TRedirect } = require('../types');

async function GenerateRedirects() {
  const redirects: (typeof TRedirect)[] = await sanityFetch({
    query: redirectsQuery,
    tags: ['general'],
  });

  return redirects.map((redirect) => {
    return {
      ...redirect,
      destination: resolveHref(
        redirect.destination?._type,
        redirect.destination?.slug?.current
      ),
    };
  });
}

module.exports = GenerateRedirects;
