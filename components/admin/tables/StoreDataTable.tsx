'use client'
import { StoreColumn, TableColumn } from "@/app/(admin)/(routes)/admin/[userId]/page";
import Table from "../../UI/table/Table";
import { useParams } from "next/navigation";

export default function StoreDataTable(
   {
      data
   }: {
      data: StoreColumn[]
   }
) {

   const params = useParams();

   const columns: TableColumn[] = [
      {
         accessorKey: 'name',
         header: 'Name'
      },
      {
         accessorKey: "amount",
         header: "Amount"
      },
      {
         accessorKey: "updatedAt",
         header: "Last Update"
      },
   ]

   return (
      <div className="store-data-table">
         <Table columns={columns} data={data} href={`/admin/${params.userId}`} />
      </div>
   )
}