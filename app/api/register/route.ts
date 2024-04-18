import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { hash } from 'bcrypt';
import { sendEmail } from "@/lib/mailer";

//Define a schema for input validation
export async function POST(req: NextRequest) {

   try {
      const body = await req.json();
      const { username, email, password } = body;

      if (!username || !email || !password) {
         return NextResponse.json({ message: "Username, Email, Password are required" }, { status: 400 })
      }

      //check if email already exists
      const existingUserByEmail = await db.user.findUnique({
         where: { email }
      })

      //check if username already exists
      const existingUserByUsername = await db.user.findUnique({
         where: { name: username }
      })

      if (existingUserByEmail?.emailVerified === null) {

         //? send verification email
         await sendEmail({ email, emailType: "VERIFY", userId: existingUserByEmail.id })

         return NextResponse.json({ message: "User with this email already exists. Confirm your account by email." }, { status: 201 });

      }

      if (existingUserByEmail) {
         return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 })
      }

      if (existingUserByUsername) {
         return NextResponse.json({ user: null, message: "User with this username already exists" }, { status: 409 })
      }

      const hashedPwd = await hash(password, 10);

      const newUser = await db.user.create({
         data: {
            name: username,
            email,
            password: hashedPwd
         }
      })

      const { password: newUserPassword, ...userWithoutPass } = newUser;

      //? send verification email
      await sendEmail({ email, emailType: "VERIFY", userId: userWithoutPass.id })

      return NextResponse.json({ user: userWithoutPass, message: "User created successfully. We have sent a confirmation link to your email." }, { status: 201 });

   } catch (err) {

      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}