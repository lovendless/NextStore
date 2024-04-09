import { db } from "@/lib/db";
import OrdersClient from "./client";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

export type OrderColumn = {
   id: string,
   phone: string,
   address: string,
   products: string,
   totalPrice: string,
   createdAt: string
}

export default async function ProductsPage() {

   const orders = await db.order.findMany({
      select: {
         id: true,
         customer: true,
         phone: true,
         address: true,
         orderItems: {
            select: {
               product: true
            }
         },
         createdAt: true
      },
      orderBy: {
         createdAt: 'desc'
      }
   })

   const formattedData: OrderColumn[] = orders?.map((order) => ({

      id: order?.id,
      customer: order?.customer,
      phone: order?.phone,
      address: order?.address,
      products: order?.orderItems.map((orderItem) => orderItem.product.name).join(', '),
      totalPrice: formatter.format(order?.orderItems.reduce((total, item) => {
         return total + Number(item.product.price)
      }, 0)),
      createdAt: format(order?.createdAt, "MMMM do, yyyy")

   }))

   return (
      <section className="container">
         <OrdersClient data={formattedData} />
      </section>
   )
}