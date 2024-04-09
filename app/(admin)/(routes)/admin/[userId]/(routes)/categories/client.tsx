'use client'
import Separator from "@/components/UI/separator/Separator";
import Heading from "@/components/admin/Heading"
import CategoriesTable from "@/components/admin/tables/CategoriesTable";
import { CategoryColumn } from "./page";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function CategoriesClient(
   {
      data
   }: {
      data: CategoryColumn[]
   }
) {

   const router = useRouter();
   const params = useParams();

   return (
      <section style={{ gap: "20px" }} className="flex direction-col">
         <div className="flex justify-content-bw">
            <Heading title={`Categories (${data.length})`} description={"Manage categories for your store"} />
            <button className="btn admin flex al-items-center" onClick={() => router.push(`/admin/${params.userId}/categories/new`)}>
               <Plus style={{marginRight: '8px', height: '16px', width: '16px'}}/>
               <span>Add New</span>
            </button>
         </div>
         <Separator />
         <CategoriesTable data={data} />
      </section>
   )
}