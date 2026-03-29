import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Reading the supplementary local cookie set during login
  const hasAuthStatus = request.cookies.has('auth-status');
  
  // Protect authenticated routes
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/settings');
  if (isProtectedRoute && !hasAuthStatus) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', encodeURIComponent(pathname));
    return NextResponse.redirect(loginUrl);
  }

  // Prevent authenticated users from visiting auth pages
  const isAuthRoute = ['/login', '/signup', '/forgot-password', '/reset-password'].some(route => pathname.startsWith(route));
  if (isAuthRoute && hasAuthStatus) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
