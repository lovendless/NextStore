import Skeleton from "./Skeleton";
import SkeletonCard from "./SkeletonCard";

export const SkeletonList = async () => {

   return (
      <div className="skeleton-list">
         <Skeleton title />
         <div className="skeleton-list__items">

            {Array.from({ length: 8 }).fill('').map((_, idx) => (
               <SkeletonCard key={idx} />
            ))}

         </div>
      </div>
   )
};