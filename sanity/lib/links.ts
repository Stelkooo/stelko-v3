export default function resolveHref(
  documentType?: string,
  slug?: string
): string | undefined {
  switch (documentType) {
    case 'home':
      return '/';
    case 'page':
      return slug ? `/${slug}` : undefined;
    case 'blog':
      return slug ? `/blog/${slug}` : undefined;
    case 'project':
      return slug ? `/project/${slug}` : undefined;
    default:
      // eslint-disable-next-line no-console
      console.warn('Invalid document type:', documentType);
      return undefined;
  }
}
