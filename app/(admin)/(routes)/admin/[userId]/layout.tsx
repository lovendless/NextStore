import { options } from "@/app/api/auth/[...nextauth]/options";
import AdminHeader from "@/components/admin/AdminHeader";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
   children,
   params
}: {
   children: React.ReactNode,
   params: { userId: string }
}) {

   const session = await getServerSession(options);

   if (!session) {
      redirect('/sign-in');
   }

   if (session?.user?.id !== params.userId) {
      redirect('/profile')
   }

   return (
      <div>
         <AdminHeader params={params}/>
         <main>
         {children}
         </main>
      </div>
   )
}
