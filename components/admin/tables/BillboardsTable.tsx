'use client'
import Table from "../../UI/table/Table";
import { useParams } from "next/navigation";
import { TableColumn } from "@/app/(admin)/(routes)/admin/[userId]/page";
import { BillboardColumn } from "@/app/(admin)/(routes)/admin/[userId]/(routes)/billboards/page";

export default function BillboardsTable(
   {
      data
   }: {
      data: BillboardColumn[]
   }
) {

   const params = useParams()

   const columns: TableColumn[] = [
      {
         accessorKey: 'label',
         header: 'Label'
      },
      {
         accessorKey: "createdAt",
         header: "Date"
      },
   ]

   return (
      <div className="products-table">
         <Table columns={columns} data={data} href={`/admin/${params.userId}/billboards`} />
      </div>
   )
}