'use client'
import { TableColumn } from "@/app/(admin)/(routes)/admin/[userId]/page";
import Table from "../../UI/table/Table";
import { ProductColumn } from "@/app/(admin)/(routes)/admin/[userId]/(routes)/products/page";
import { useParams } from "next/navigation";

export default function ProductsTable(
   {
      data
   }: {
      data: ProductColumn[]
   }
) {

   const params = useParams();

   const columns: TableColumn[] = [
      {
         accessorKey: 'name',
         header: 'Name'
      },
      {
         accessorKey: 'price',
         header: 'Price'
      },
      {
         accessorKey: 'category',
         header: 'Category'
      },
      {
         accessorKey: 'isArchived',
         header: 'Archived'
      },
      {
         accessorKey: "createdAt",
         header: "Date"
      },
   ]

   return (
      <div className="products-table">
         <Table columns={columns} data={data} href={`/admin/${params.userId}/products`} />
      </div>
   )
}