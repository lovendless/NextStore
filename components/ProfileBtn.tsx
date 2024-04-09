'use client'

import IconButton from "./UI/buttons/IconButton"
import { CircleUser } from "lucide-react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useMenu } from "@/hooks/useMenu";

export default function ProfileBtn(
   {
      session
   }: {
      session: Session | null
   }
) {

   const router = useRouter();

   const { isMenu } = useMenu();

   return (
      session ?
         <IconButton className={'profile-btn'} title={isMenu && 'Profile'} icon={<CircleUser />} onClick={() => router.push('/profile')} /> :
         <IconButton className={'profile-btn'} title={isMenu && 'Sign-in'} icon={<CircleUser />} onClick={() => router.push('/sign-in')} />
   )
}
