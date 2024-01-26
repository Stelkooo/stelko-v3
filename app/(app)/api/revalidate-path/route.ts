import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const slug = searchParams.get('slug');
    const type = searchParams.get('type') as 'layout' | 'page';

    revalidatePath(slug || '/', type || undefined);

    console.log('Revalidated path: ', slug);

    return NextResponse.json({
      status: 200,
      slug,
      type,
    });
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }
    return new Response('Error', { status: 500 });
  }
}
