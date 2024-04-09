import { Billboard as BillboardType } from "@/new-types";

interface BillboardProps {
   data: BillboardType | undefined
}

export const Billboard = (
   {
      data
   }: BillboardProps
) => {

   return (
      <div className="billboard">
         <div style={{backgroundImage: `url(${data?.imageUrl})`}} className="billboard__inner">
            <div className="billboard__label">
               <span>
                  {data?.label}
               </span>
            </div>
         </div>
      </div>


   )
};