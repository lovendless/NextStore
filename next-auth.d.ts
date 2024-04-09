import { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
   interface Session {
      user: {
         id: string | unknown,
         role: string,
         name: string | null | undefined,
         image: any,
      } & DefaultSession
   }
   interface User extends DefaultUser {
      id: string,
      role: string,
      name: string
   }
}
declare module "next-auth/jwt" {
   interface JWT extends DefaultJWT { 
      role: string,
   }

}