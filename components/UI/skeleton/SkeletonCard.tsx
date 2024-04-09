import Skeleton from "./Skeleton";

export default function SkeletonCard() {
   return (
      <div className="product-card flex direction-col product-card-size-default goods-grid__cell-size">
         <Skeleton square />
         <Skeleton title />
         <Skeleton p />
         <Skeleton p />
         <Skeleton button />
      </div>
   )
}
