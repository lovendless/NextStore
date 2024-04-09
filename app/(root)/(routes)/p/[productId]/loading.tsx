import Separator from "@/components/UI/separator/Separator";
import SkeletonGallery from "@/components/UI/skeleton/SkeletonGallery";
import { SkeletonInfo } from "@/components/UI/skeleton/SkeletonInfo";
import { SkeletonList } from "@/components/UI/skeleton/SkeletonList";


export default function LoadingProductPage() {

   return (
      <section className="container product-page">
         <div className="product-page__inner">
            <div className="product-page__product">
               <SkeletonGallery />
               <SkeletonInfo />
            </div>
            <Separator />
            <SkeletonList />
         </div>
      </section>
   )
}
