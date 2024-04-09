import { NextFetchEvent, NextRequest, NextResponse } from "next/server"
import { CustomMiddleware } from "./stackMiddlewares"
import { getToken } from "next-auth/jwt"

const authPaths = ["/sign-in", "/sign-up", "/forgotpwd"];
const adminPaths = ["/admin"];
const userPaths = ["/profile"];
const adminApiPath = [
   "/api/admin/city",
   "/api/admin/category",
   "/api/admin/product",
   "/api/admin/upload",
   "/api/admin/productcity"
];
const protectedPaths = userPaths.concat(adminPaths);

export function withAuthMiddleware(middleware: CustomMiddleware) {
   return async (request: NextRequest, event: NextFetchEvent) => {
      //Create a response object to pass down the chain
      const response = NextResponse.next()

      const token = await getToken({ req: request })

      // @ts-ignore
      request.nextauth = request.nextauth || {}
      // @ts-ignore
      request.nextauth.token = token
      // @ts-ignore
      const pathname = request.nextUrl.pathname

      //if already logged in
      if (token && authPaths.includes(pathname)) {
         return NextResponse.redirect(new URL('/profile', request.url))
      }

      //if user is not admin
      if (token && adminPaths.includes(pathname) && token?.role !== 'ADMIN') {
         return NextResponse.redirect(new URL('/denied', request.url))
      }

      //if api request without admin role
      if (token && adminApiPath.includes(pathname) && token?.role !== 'ADMIN') {
         return new NextResponse(null, {
            status: 400,
            statusText: 'Bad request',
            headers: {
               'Content-Type': "text/plain"
            }
         })
      }

      //if user hasn't logged in
      if (!token && protectedPaths.includes(pathname)) {
         const signInUrl = new URL('/api/auth/signin', request.url)
         signInUrl.searchParams.set('callbackUrl', pathname)
         return NextResponse.redirect(signInUrl);
      }

      return middleware(request, event, response)
   }
}


