import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from "@/lib/db";
import { compare } from "bcrypt";

export const options: NextAuthOptions = {
   adapter: PrismaAdapter(db),
   session: {
      strategy: 'jwt'
   },
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
         httpOptions: {
            timeout: 40000,
         },
      }),
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            username: { label: "Username", type: "text", placeholder: "user" },
            password: { label: "Password", type: "password", placeholder: "pwd" }
         },
         async authorize(credentials) {
            // Add logic here to look up the user from the credentials supplied
            if (!credentials?.username || !credentials?.password) return null

            const existingUser = await db.user.findUnique({
               where: {
                  username: credentials?.username
               }
            })

            if (!existingUser) return null;

            if (!existingUser.active) {
               throw new Error('User is not active')
            }

            const passwordMatch = await compare(credentials.password, existingUser.password);

            if (passwordMatch) {

               return {
                  id: existingUser.id,
                  name: existingUser.username,
                  email: existingUser.email,
                  role: existingUser.role
               }

            }

            return null

         }
      })
   ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.id = user.id
            token.name = user.name
            token.role = user.role
            token.image = user.image
         }
         return token
      },
      async session({ session, token }) {
         if (token) {
            session.user.id = token.id
            session.user.name = token.name
            session.user.role = token.role
            session.user.image = token.image
         }
         return session
      }
   },
   pages: {
      signIn: '/sign-in'
   }
}