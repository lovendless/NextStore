'use client'
import Separator from "@/components/UI/separator/Separator";
import Heading from "@/components/admin/Heading"
import CitiesTable from "@/components/admin/tables/CitiesTable";
import { CityColumn } from "./page";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function CitiesClient(
   {
      data
   }: {
      data: CityColumn[]
   }
) {

   const router = useRouter();
   const params = useParams();

   return (
      <section style={{ gap: "20px" }} className="flex direction-col">
         <div className="flex justify-content-bw">
            <Heading title={`Cities (${data.length})`} description={"Manage cities for your store"} />
            <button className="btn admin flex al-items-center" onClick={() => router.push(`/admin/${params.userId}/cities/new`)}>
               <Plus style={{marginRight: '8px', height: '16px', width: '16px'}}/>
               <span>Add New</span>
            </button>
         </div>
         <Separator />
         <CitiesTable data={data} />
      </section>
   )
}