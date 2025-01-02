import { NextResponse } from 'next/server';

const AUTH_PAGES = ['/auth/login', '/auth/signup','/auth/forget-password','/auth/verify-code','/auth/reset-password']; 
export default async function middleware(request) {
  const token = request.cookies.get('next-auth.session-token');

  const currentPath = request.nextUrl.pathname;

  // Redirect authenticated users away from auth pages
  if (token && AUTH_PAGES.includes(currentPath)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect unauthenticated users to login
  if (!token) {
    if (AUTH_PAGES.includes(currentPath)) {
      return NextResponse.rewrite(new URL(currentPath, request.url));
    }
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Allow the request to continue if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
