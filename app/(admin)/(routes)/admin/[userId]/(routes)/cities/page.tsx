import { db } from "@/lib/db";
import CitiesClient from "./client";
import { format } from "date-fns";

export type CityColumn = {
   id: string,
   name: string,
   createdAt: string
}

export default async function CitiesPage() {

   const cities = await db.city.findMany({

      select: {
         id: true,
         name: true,
         createdAt: true,
         availableProducts: true
      },
      orderBy: {
         createdAt: 'desc'
      },

   })

   const formattedData: CityColumn[] = cities?.map((city) => ({

      id: city?.id,
      name: city?.name,
      createdAt: format(city?.createdAt, "MMMM do, yyyy"),
      availableProducts: city?.availableProducts.length

   }))

   return (
      <section className="container">
        <CitiesClient data={formattedData}/>
      </section>
   )
}