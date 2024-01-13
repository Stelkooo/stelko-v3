'use client';

import { createClient } from 'next-sanity';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';

import { TImage } from '@/types';

import { apiVersion, dataset, projectId, useCdn } from '@/sanity/env';
import { cn } from '@/lib/utils';

const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
});

type Props = {
  image: TImage;
  className?: string;
  sizes?: string;
  loading?: 'eager' | 'lazy';
  fill?: boolean;
};

export default function Photo({
  image,
  className = '',
  sizes = '100vw',
  loading = 'lazy',
  fill = false,
}: Props) {
  const imageProps = useNextSanityImage(client, image);
  return (
    <Image
      src={imageProps.src}
      loader={imageProps.loader}
      width={fill ? undefined : imageProps.width}
      height={fill ? undefined : imageProps.height}
      placeholder="blur"
      blurDataURL={image.asset.metadata.lqip}
      className={cn('rounded-sm border', className)}
      sizes={image.sizes || sizes}
      alt={image.alt || ''}
      loading={loading}
      fill={fill}
      itemProp="image"
      quality={90}
    />
  );
}
