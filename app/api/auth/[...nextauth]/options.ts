import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from "@/lib/db";
import { compare } from "bcrypt";

const getUser = async (email: string) => {
   const findUser = await db.user.findFirst({
      where: {
         email
      }
   });

   return findUser;
}

export const options: NextAuthOptions = {
   adapter: PrismaAdapter(db),
   session: {
      strategy: 'jwt'
   },
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID ?? '',
         clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
         httpOptions: {
            timeout: 40000,
         },
      }),
      GitHubProvider({
         clientId: process.env.GITHUB_ID ?? '',
         clientSecret: process.env.GITHUB_SECRET ?? ''
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
                  name: credentials?.username
               }
            })

            if (!existingUser || !existingUser?.password) throw new Error('Invalid credentials');

            if (!existingUser.emailVerified) {
               throw new Error('User is not active');
            }

            const passwordMatch = await compare(credentials.password, existingUser.password!);

            if (passwordMatch) {

               return {
                  id: existingUser.id,
                  name: existingUser.name,
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
      },
      async signIn({ user, profile, account }) {
      
         if (!user.email) {
            return false;
         }

         // fetch the account of the user
         const existingAccount = await db.account.findFirst({
            where: {
               providerAccountId: account?.providerAccountId,
            },
         });

         // if the account exists, let it through
         if (existingAccount) {
            return true;
         }

         // get the user
         const existingUser = await getUser(user.email);

         if (existingUser) {

            await db.account.create({
               data: {
                  provider: account?.provider!,
                  type: account?.type!,
                  providerAccountId: account?.providerAccountId!,
                  access_token: account?.access_token,
                  expires_at: account?.expires_at,
                  scope: account?.scope,
                  token_type: account?.token_type,
                  id_token: account?.id_token,
                  user: {
                     connect: {
                        email: user.email ?? '',
                     },
                  },
               },
            });
            return true;
         }

         // if the user doesn't exist, create the user, create the account and let it through
         const newUser = await db.user.create({
            data: {
               email: user.email,
               name: user.name,
               image: user.image,
               accounts: {
                  create: {
                     provider: account?.provider!,
                     type: account?.type!,
                     providerAccountId: account?.providerAccountId!,
                     access_token: account?.access_token,
                     expires_at: account?.expires_at,
                     scope: account?.scope,
                     token_type: account?.token_type,
                     id_token: account?.id_token,
                  },
               },
            },
         });

         if (account?.provider === 'google'
            // @ts-ignore
            && profile?.email_verified === true
            && newUser.emailVerified === null) {

            await db.user.update({
               where: {
                  email: user.email
               },
               data: {
                  emailVerified: new Date()
               },
            });
            // @ts-ignore
            return profile.email_verified && profile.email.endsWith("@gmail.com");
         }

         if (account?.provider === 'github'
            && newUser.emailVerified === null) {

            await db.user.update({
               where: {
                  email: user.email
               },
               data: {
                  emailVerified: new Date()
               },
            });
            
            return true;
         }

         return true
      },
   },
   pages: {
      signIn: '/sign-in'
   }
}

