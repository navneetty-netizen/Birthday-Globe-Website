import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Neutralized: Returns immediately to prevent TTFB bottlenecks
  console.log(`[middleware] updateSession called. request.url: ${request.url}`);
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths and static assets
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
