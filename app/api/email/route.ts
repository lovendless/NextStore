import { db } from "@/lib/db";
import { sendEmail } from "@/lib/mailer";
import { NextRequest, NextResponse } from "next/server";

//forgot pwd
export async function POST(req: NextRequest) {

   try {
      const body = await req.json()
      const { email } = body

      if (!email) {
         return NextResponse.json({ message: "Email is required!" }, { status: 400 })
      }

      const existingUserByEmail = await db.user.findUnique({
         where: {
            email: email
         }
      })

      if (!existingUserByEmail) {
         return NextResponse.json({ user: null, message: "User with this email don't exists" }, { status: 401 })
      }

      const { password, ...userWithoutPass } = existingUserByEmail

      //?send verification email
      await sendEmail({ email, emailType: "RESET", userId: userWithoutPass.id })

      return NextResponse.json({ user: null, message: "Reset request has been sent successfully" }, { status: 201 });

   } catch (err) {
      console.log('[FORGOTPWD_POST]', err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}