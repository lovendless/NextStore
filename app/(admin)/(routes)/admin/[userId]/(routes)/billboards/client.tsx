'use client'
import Separator from "@/components/UI/separator/Separator";
import Heading from "@/components/admin/Heading"
import BillboardsTable from "@/components/admin/tables/BillboardsTable";
import { BillboardColumn } from "./page";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function BillboardsClient(
   {
      data
   }: {
      data: BillboardColumn[]
   }
) {

   const router = useRouter();
   const params = useParams();

   return (
      <section style={{ gap: "20px" }} className="flex direction-col">
         <div className="flex justify-content-bw">
            <Heading title={`Billboards (${data.length})`} description={"Manage billboards for your store"} />
            <button className="btn admin flex al-items-center" onClick={() => router.push(`/admin/${params.userId}/billboards/new`)}>
               <Plus style={{marginRight: '8px', height: '16px', width: '16px'}}/>
               <span>Add New</span>
            </button>
         </div>
         <Separator />
         <BillboardsTable data={data} />
      </section>
   )
}