import { Billboard as BillboardType } from "@/new-types";
import { Billboard } from "./Billboard";

interface BillboardListProps {
   data: BillboardType[] | undefined
}

export const BillboardList = (
   {
      data
   }: BillboardListProps
) => {

   return (
      <div className="billboard-list">
         {data?.map((billboard, idx) => (
           <Billboard key={idx} data={billboard}/>
         ))
         }
      </div>
   )
};