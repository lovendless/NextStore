import { NextMiddlewareResult } from "next/dist/server/web/types";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

export type CustomMiddleware = (
   request: NextRequest,
   event: NextFetchEvent,
   response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>

type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware

export function stackMiddlewares(
   functions: MiddlewareFactory[] = [],
   index = 0
): CustomMiddleware {
   const current = functions[index];

   if (current) {
      const next = stackMiddlewares(functions, index + 1);
      return current(next);
   }

   return (
      request: NextRequest,
      event: NextFetchEvent,
      response: NextResponse 
   ) => {
      return response
   }
}
