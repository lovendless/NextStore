'use client'
import Separator from "@/components/UI/separator/Separator";
import Heading from "@/components/admin/Heading"
import { OrderColumn } from "./page";
import OrdersTable from "@/components/admin/tables/OrdersTable";

export default function OrdersClient(
   {
      data
   }: {
      data: OrderColumn[]
   }
) {

   return (
      <section style={{ gap: "20px" }} className="flex direction-col">
         <Heading title={`Orders (${data.length})`} description={"Active orders for your store"} />
         <Separator />
         <OrdersTable data={data} />
      </section>
   )
}