import CategoryForm from "@/components/admin/forms/CategoryForm"
import { db } from "@/lib/db"

export default async function CityPage(
   {
      params
   }: {
      params: { categoryId: string }
   }
) {

   const category = await db.category.findUnique({
      where: {
         id: params.categoryId
      },
      include: {
         billboard: true
      }
   });

   const billboards = await db.billboard.findMany();

   return (
      <section style={{ gap: "20px" }} className="container flex direction-col">
         <CategoryForm initialData={category} billboards={billboards} />
      </section>
   )
}
