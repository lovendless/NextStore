'use client'
import { TableColumn } from "@/app/(admin)/(routes)/admin/[userId]/page";
import Table from "../../UI/table/Table";
import { OrderColumn } from "@/app/(admin)/(routes)/admin/[userId]/(routes)/orders/page";

export default function OrdersTable(
   {
      data
   }: {
      data: OrderColumn[]
   }
) {

   const columns: TableColumn[] = [
      {
         accessorKey: 'products',
         header: 'Products'
      },
      {
         accessorKey: 'customer',
         header: 'Customer'
      },
      {
         accessorKey: 'phone',
         header: 'Phone'
      },
      {
         accessorKey: "address",
         header: "Address"
      },
      {
         accessorKey: "totalPrice",
         header: "Total price"
      },
      {
         accessorKey: "createdAt",
         header: "Date"
      },
   ]

   return (
      <div className="products-table">
         <Table columns={columns} data={data} href={undefined} />
      </div>
   )
}