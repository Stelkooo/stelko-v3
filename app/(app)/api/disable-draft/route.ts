import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line import/prefer-default-export
export function GET(request: NextRequest) {
  draftMode().disable();
  const url = new URL(request.nextUrl);
  return NextResponse.redirect(new URL('/', url.origin));
}
