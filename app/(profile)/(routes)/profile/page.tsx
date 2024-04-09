import { options } from "../../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SignOutButton from "@/components/UI/buttons/SignOutButton";
import Image from "next/image";

export default async function ProfilePage() {

   const session = await getServerSession(options);

   return (
      <section className="profile container flex direction-col ">

         <Image src={session?.user?.image ? session?.user?.image : '/public/profile/default.jpg'} width={100} height={100} alt={'profile'} />
         <h1>Profile of {session?.user?.name}</h1>

         <SignOutButton />

      </section>
   )
}

