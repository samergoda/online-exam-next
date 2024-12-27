import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default async function middleware(request) {
  const token = request.cookies.get('next-auth.session-token');
  const nextToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  // console.log('token from middleware', nextToken);
  // if (request.nextUrl.pathname === "/auth/logout") {
  //   const response = NextResponse.redirect(new URL("/auth/login", request.url));
  //   response.cookies.delete("connect.sid");
   
  //   console.log("Response cookies:", response.cookies.getAll());
   
  //   return response;
  // }
  const currentPath = request.nextUrl.pathname;
  console.log('request.url',request.url);
  // authnicate
  if (!token) return NextResponse.rewrite(new URL('/auth/login', request.url));
  if (token && currentPath !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  //   // role based access level
  //   if (pathsOfRole?.indexOf(currentUrl) === -1)
  //     return NextResponse.redirect(new URL("/denied", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
