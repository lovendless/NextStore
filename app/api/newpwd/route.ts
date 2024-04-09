import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

   try {

      const body = await req.json()
      const { token, newPwd } = body

      if (!newPwd) {
         return NextResponse.json({ message: "Password is required" }, { status: 400 })
      }

      const user = await db.user.findFirst({
         where: {
            ActivateTokens: {
               some: {
                  AND: [
                     {
                        valid: true,
                     },
                     {
                        resetToken: true,
                     },
                     {
                        createdAt: {
                           gt: new Date(Date.now() - 60 * 60 * 1000), //1 hour "more than"
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

      const hashedPwd = await hash(newPwd, 10);

      await db.user.update({
         where: {
            id: user.id,
         },
         data: {
            password: hashedPwd,
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

      return NextResponse.json({ message: "Success" }, { status: 201 })

   } catch (err: any) {

      console.log('[NEWPWD_POST]', err);

      return NextResponse.json({ error: err?.message }, { status: 500 })

   }
}