import CityForm from "@/components/admin/forms/CityForm"
import { db } from "@/lib/db"

export default async function CityPage(
   {
      params
   }: {
      params: { cityId: string }
   }
) {

   const city = await db.city.findUnique({
      where: {
         id: params.cityId
      },
   });

   return (
      <section style={{ gap: "20px" }} className="container flex direction-col">
         <CityForm initialData={city} />
      </section>
   )
}
