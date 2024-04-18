import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

   try {

      const body = await req.json();
      const { token } = body;
     

      const user = await db.user.findFirst({
         where: {
            activateTokens: {
               some: {
                  AND: [
                     {
                        valid: true, //token must be not activated
                     },
                     {
                        verifyToken: true,
                     },
                     {
                        createdAt: {
                           gt: new Date(Date.now() - 24 * 60 * 60 * 1000), //24 hours
                        },
                     },
                     {
                        token,
                     },
                  ],
               },
            },
         }
      })

      if (!user) {
         return NextResponse.json({ error: "Invalid token" }, { status: 400 })
      }

         await db.user.update({
            where: {
               id: user.id,
            },
            data: {
               emailVerified: new Date(),
            }
         })

         await db.activateToken.update({
            where: {
               token
            },
            data: {
               valid: false,
            }
         })

         return NextResponse.json({
            message: "User created succesfully",
            success: true,
            user
         })


   } catch (err: any) {
      return NextResponse.json({ error: err?.message },
         { status: 500 })
   }
}