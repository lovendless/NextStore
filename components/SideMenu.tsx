'use client'
import MainNav from "./MainNav";
import FavBtn from "./FavBtn";
import ProfileBtn from "./ProfileBtn";
import { Session } from "next-auth";
import { useMenu } from "@/hooks/useMenu";

interface SideMenuProps {
   session: Session | null,
   favIds: string[]
}

export default function SideMenu(
   {
      session,
      favIds
   }: SideMenuProps
) {

   const { isMenu } = useMenu();

   return (
      <aside className={isMenu ? 'side-menu active' : 'side-menu'}>
         <div className="side-menu__inner flex">
            <ProfileBtn session={session} />
            <FavBtn fav={favIds} />
            <MainNav />
         </div>
      </aside>
   )
}
