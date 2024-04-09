import BillboardForm from "@/components/admin/forms/BillboardForm";
import { db } from "@/lib/db"

export default async function BillboardPage(
   {
      params
   }: {
      params: { billboardId: string }
   }
) {

   const billboard = await db.billboard.findUnique({
      where: {
         id: params.billboardId
      },
   });

   return (
      <section style={{ gap: "20px" }} className="container flex direction-col">
         <BillboardForm initialData={billboard} />
      </section>
   )
}
