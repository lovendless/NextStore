import { db } from "@/lib/db";
import { format } from "date-fns";
import BillboardsClient from "./client";

export type BillboardColumn = {
   id: string,
   label: string,
   createdAt: string
}

export default async function BillboardsPage() {

   const billboards = await db.billboard.findMany({

      select: {
         id: true,
         label: true,
         createdAt: true,
      },
      orderBy: {
         createdAt: 'desc'
      },

   })

   const formattedData: BillboardColumn[] = billboards?.map((billboard) => ({

      id: billboard?.id,
      label: billboard?.label,
      createdAt: format(billboard?.createdAt, "MMMM do, yyyy"),

   }))

   return (
      <section className="container">
        <BillboardsClient data={formattedData}/>
      </section>
   )
}