'use client'
import Table from "../../UI/table/Table";
import { useParams } from "next/navigation";
import { CategoryColumn } from "@/app/(admin)/(routes)/admin/[userId]/(routes)/categories/page";
import { TableColumn } from "@/app/(admin)/(routes)/admin/[userId]/page";

export default function CategoriesTable(
   {
      data
   }: {
      data: CategoryColumn[]
   }
) {

   const params = useParams()

   const columns: TableColumn[] = [
      {
         accessorKey: 'name',
         header: 'Name'
      },
      {
         accessorKey: 'products',
         header: 'Amount Of Products'
      },
      {
         accessorKey: "createdAt",
         header: "Date"
      },
   ]

   return (
      <div className="products-table">
         <Table columns={columns} data={data} href={`/admin/${params.userId}/categories`} />
      </div>
   )
}