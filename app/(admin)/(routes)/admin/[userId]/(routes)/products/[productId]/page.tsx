import ProductForm from "@/components/admin/forms/ProductForm";
import { db } from "@/lib/db"

export default async function CityPage(
   {
      params
   }: {
      params: { productId: string }
   }
) {

   const product = await db.product.findUnique({
      where: {
         id: params.productId
      },
      include: {
         images: true,
         category: true,
         availableCities: {
            include: {
               city: true
            }
         }
      }
   });

   const categories = await db.category.findMany();

   return (
      <section style={{ gap: "20px" }} className="container flex direction-col">
         <ProductForm initialData={product} categories={categories}/>
      </section>
   )
}
