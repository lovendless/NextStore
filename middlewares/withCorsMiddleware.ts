import { NextFetchEvent, NextRequest, NextResponse } from "next/server"
import { CustomMiddleware } from "./stackMiddlewares";
import { allowedOrigins } from "@/config/allowedOrigins";

export const config = {
   matcher: ['/api/:path*']
}

export function withCorsMiddleware(middleware: CustomMiddleware) {
   return async (req: NextRequest, event: NextFetchEvent) => {
      // retrieve the current response
      const response = NextResponse.next()
      //console.log(req.nextUrl.pathname)
      // retrieve the HTTP "Origin" header 
      // from the incoming request
      const origin = req.headers.get("origin")

      if (origin && !allowedOrigins.includes(origin)) {
         return new NextResponse(null, {
            status: 400,
            statusText: 'Bad request',
            headers: {
               'Content-Type': "text/plain"
            }
         })
      }

      req.headers.append('Access-Control-Allow-Credentials', 'true')

      return middleware(req, event, response)
   }
}
