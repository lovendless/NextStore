'use client'
import Separator from "@/components/UI/separator/Separator";
import Heading from "@/components/admin/Heading"
import { ProductColumn } from "./page";
import ProductsTable from "@/components/admin/tables/ProductsTable";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function ProductsClient(
   {
      data
   }: {
      data: ProductColumn[]
   }
) {

   const router = useRouter();
   const params = useParams();

   return (
      <section style={{ gap: "20px" }} className="flex direction-col">
         <div className="flex justify-content-bw">
            <Heading title={`Products (${data.length})`} description={"Manage products for your store"} />
            <button className="btn admin flex al-items-center" onClick={() => router.push(`/admin/${params.userId}/products/new`)}>
               <Plus style={{ marginRight: '8px', height: '16px', width: '16px' }} />
               <span>Add New</span>
            </button>
         </div>
         <Separator />
         <ProductsTable data={data} />
      </section>
   )
}