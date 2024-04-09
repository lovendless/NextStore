import { db } from "@/lib/db";
import CategoriesClient from "./client";
import { format } from "date-fns";

export type CategoryColumn = {
   id: string,
   name: string,
   createdAt: string
}

export default async function CitiesPage() {

   const categories = await db.category.findMany({

      select: {
         id: true,
         name: true,
         products: true,
         createdAt: true,
      },
      orderBy: {
         createdAt: 'desc'
      },

   })

   const formattedData: CategoryColumn[] = categories?.map((category) => ({

      id: category?.id,
      name: category?.name,
      products: category?.products?.length,
      createdAt: format(category?.createdAt, "MMMM do, yyyy"),

   }))

   return (
      <section className="container">
        <CategoriesClient data={formattedData}/>
      </section>
   )
}