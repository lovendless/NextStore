
import Separator from "../separator/Separator";
import Skeleton from "./Skeleton";


export const SkeletonInfo = () => {

   return (
      <div className="info">
         <Skeleton title/>
         <Skeleton p/>
         <Skeleton p/>
         <Separator />
         <Skeleton desc/>
         <Skeleton button/>
      </div>


   )
};