import Skeleton from "@/components/UI/skeleton/Skeleton";
import SkeletonCard from "@/components/UI/skeleton/SkeletonCard";
import { SkeletonList } from "@/components/UI/skeleton/SkeletonList";


export default function LoadingCategoryPage() {

   return (
      <section className="container">
         {/*skeleton list*/}
         <Skeleton p />
         <SkeletonList />
      </section>
   )
}
