import Photo from '@/components/shared/photo.component';
import SiteLink from '@/components/shared/site-link.component';
import Tags from '@/components/shared/tags.component';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getDateFormatted } from '@/lib/utils';
import { TBlogModule } from '@/types';

function getHeading(blogType?: 'similar' | 'latest' | 'all') {
  switch (blogType) {
    case 'similar':
      return <h2>Similar posts</h2>;
    case 'latest':
      return <h2>Latest posts</h2>;
    default:
      return <h2 className="sr-only">All posts</h2>;
  }
}

export default function BlogModule({ blogType, posts }: TBlogModule) {
  return (
    <section>
      <div className="container my-20 grid gap-8">
        {getHeading(blogType)}
        {posts ? (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {posts.map((post) => (
              <li key={post._id}>
                <SiteLink
                  link={{
                    internal: { _type: 'blog', slug: post?.slug },
                    linkType: 'internal',
                  }}
                  className="group/blog"
                >
                  <Card className="flex h-full flex-col">
                    <CardContent className="mb-2 space-y-4">
                      {post?.thumbnail ? (
                        <figure className="overflow-hidden rounded-sm border">
                          <Photo
                            image={post.thumbnail}
                            className="rounded-none border-none transition-transform group-hover/blog:scale-110"
                          />
                        </figure>
                      ) : null}
                      <Tags tags={post?.tags} />
                    </CardContent>
                    <CardTitle>
                      <CardHeader className="group-hover/blog:underline">
                        {post?.title}
                      </CardHeader>
                    </CardTitle>
                    <CardFooter className="mt-auto">
                      <p>{getDateFormatted(post?.datePublished)}</p>
                    </CardFooter>
                  </Card>
                </SiteLink>
              </li>
            ))}
          </ul>
        ) : null}
        {blogType !== 'all' ? (
          <Button asChild className="justify-self-end">
            <SiteLink
              link={{
                linkType: 'internal',
                internal: {
                  _type: 'page',
                  slug: { _type: 'slug', current: 'blog' },
                },
              }}
            >
              See all blog posts
            </SiteLink>
          </Button>
        ) : null}
      </div>
    </section>
  );
}
