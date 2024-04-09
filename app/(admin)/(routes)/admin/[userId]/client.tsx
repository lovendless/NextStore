'use client'
import Heading from "@/components/admin/Heading"
import Separator from "@/components/UI/separator/Separator";
import StoreDataTable from "@/components/admin/tables/StoreDataTable";
import { StoreColumn } from "./page";

export default function StoreClient(
   {
      data
   }: {
      data: StoreColumn[]
   }
) {

   return (
      <div style={{ gap: "20px" }} className="flex direction-col">
         <Heading title={`Store Data (${data.length})`} description={'Basic store information'} />
         <Separator />
         <StoreDataTable data={data}/>
      </div>
   )
}
