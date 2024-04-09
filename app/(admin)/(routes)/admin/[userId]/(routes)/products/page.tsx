import { db } from "@/lib/db";
import ProductsClient from "./client";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

export type ProductColumn = {
   id: string,
   name: string,
   price: string,
   category: string,
   isArchived: string,
   createdAt: string
}

export default async function ProductsPage() {

   const products = await db.product.findMany({
      select: {
         id: true,
         name: true,
         price: true,
         category: true,
         isArchived: true,
         createdAt: true
      },
      orderBy: {
         createdAt: 'desc'
      }
   })

   const formattedData = products?.map((product) => ({

      id: product?.id,
      name: product?.name,
      price: formatter.format(product?.price.toNumber()),
      category: product?.category?.name,
      isArchived: product?.isArchived.toString(),
      createdAt: format(product?.createdAt, "MMMM do, yyyy")

   }));

   return (
      <section className="container">
         <ProductsClient data={formattedData} />
      </section>
   )
}