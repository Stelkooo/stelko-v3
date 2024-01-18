/* eslint-disable @typescript-eslint/no-var-requires */
const { createClient } = require('@sanity/client');

const client = createClient({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
  apiVersion: '2022-08-30',
});

async function fetchSanityRedirects() {
  const redirectData = await client.fetch(`
    *[_type == "general" && _id == "general"][0].redirects[] {
      source,
      destination,
      permanent,
    }
  `);

  return redirectData;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  experimental: {
    taint: true,
  },
  async redirects() {
    const sanityRedirects = await fetchSanityRedirects();
    return sanityRedirects;
  },
};

module.exports = nextConfig;
