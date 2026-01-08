import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Agar koi specific language prefix nahi hai to redirect to '/pt'
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/pt', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}
