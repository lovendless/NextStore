import { db } from "@/lib/db";
import StoreClient from "./client";
import { format } from "date-fns";

export type TableColumn = {
   accessorKey: string,
   header?: string,
   cell?: JSX.Element,
   cellOpenUpdate?: (value: boolean) => void,
   cellOpenDelete?: (value: boolean) => void,
   cellId?: (dataId: string) => void,
}

export type StoreColumn = {
   id: string,
   name: string,
   amount: Number,
   updatedAt: string
}

export default async function StorePage() {

   const store = [];

   const cityCount = await db.city.count();

   const productCount = await db.product.count();

   const categoryCount = await db.category.count();

   const cityLastUpdate = await db.city.findFirst({
      orderBy: {
         updatedAt: "desc"
      },
      select: {
         updatedAt: true
      }
   });

   const categoryLastUpdate = await db.category.findFirst({
      orderBy: {
         updatedAt: "desc"
      },
      select: {
         updatedAt: true
      }
   });

   const productLastUpdate = await db.product.findFirst({
      orderBy: {
         updatedAt: "desc"
      },
      select: {
         updatedAt: true
      }
   });


   if (cityCount && cityLastUpdate) {
      store.push({ id: "cities", name: "Cities", amount: cityCount, updatedAt: cityLastUpdate?.updatedAt })
   }

   if (categoryCount && categoryLastUpdate) {
      store.push({ id: "categories", name: "Categories", amount: categoryCount, updatedAt: categoryLastUpdate?.updatedAt })
   }

   if (productCount && productLastUpdate) {
      store.push({ id: "products", name: "Products", amount: productCount, updatedAt: productLastUpdate?.updatedAt })
   }

   const formattedData: StoreColumn[] = store?.map((store) => ({

      id: store?.id,
      name: store?.name,
      amount: store?.amount,
      updatedAt: format(store?.updatedAt, "MMMM do, yyyy")

   }))

   return (
      <section className="container">
         <StoreClient data={formattedData}/>
      </section>
   )
}
