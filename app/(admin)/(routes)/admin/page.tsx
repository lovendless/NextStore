import { options } from "@/app/api/auth/[...nextauth]/options"
import { db } from "@/lib/db";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function AdminVerificationPage() {

   const session = await getServerSession(options);

   if (!session) {
      redirect('/sign-in');
   }

   const admin = await db.user.findUnique({
      where: {
         id: session?.user?.id as string,
         role: "ADMIN"
      }
   });

   if (!admin) redirect('/profile');

   if (admin?.id) redirect(`/admin/${admin?.id}`)

}
