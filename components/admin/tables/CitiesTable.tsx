'use client'
import Table from "../../UI/table/Table";
import { useParams } from "next/navigation";
import { CityColumn } from "@/app/(admin)/(routes)/admin/[userId]/(routes)/cities/page";
import { TableColumn } from "@/app/(admin)/(routes)/admin/[userId]/page";

export default function CitiesTable(
   {
      data
   }: {
      data: CityColumn[]
   }
) {

   const params = useParams()

   const columns: TableColumn[] = [
      {
         accessorKey: 'name',
         header: 'Name'
      },
      {
         accessorKey: 'availableProducts',
         header: 'Available Products'
      },
      {
         accessorKey: "createdAt",
         header: "Date"
      },
   ]

   return (
      <div className="products-table">
         <Table columns={columns} data={data} href={`/admin/${params.userId}/cities`} />
      </div>
   )
}