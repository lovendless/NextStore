'use client'
import { useInView } from "react-intersection-observer"
import { useCallback, useEffect, useState } from "react"
import loadMoreProducts from "@/actions/load-more-products";
import { Product } from "@/new-types";
import { delay } from "@/lib/utils";

export type LoadMoreProps = {
   q?: string,
   category?: string,
   productId?: string,
   isLoaded?: boolean,
}

export default function LoadMore(
   {
      q,
      category,
      isLoaded,
      products,
      addProducts,
      productId
   }: LoadMoreProps & {
      products: Product[],
      addProducts: (value: Product[]) => void,
   }
) {

   const [pagesLoaded, setPagesLoaded] = useState(0);

   const [loading, setLoading] = useState<boolean>(false);
   const [loaded, setLoaded] = useState<boolean>(isLoaded ? isLoaded : false);

   const perPage = 4;

   const { ref, inView } = useInView();

   const loadMore = useCallback(async () => {
      setLoading(true)
      //await delay(1000);
      const nextPage = pagesLoaded + 1;
      const skippedItems = nextPage * perPage;
      const newProducts = await loadMoreProducts({ skip: skippedItems, take: perPage, category, q, productId}) ?? [];
      addProducts([...products, ...newProducts]);
      setPagesLoaded(nextPage);
      setLoading(false);
      if (!newProducts.length) {
         setLoaded(true)
      }
   }, [pagesLoaded, addProducts, products, productId, category, q]);

   useEffect(() => {
      if (inView && !loading) {
         loadMore();
      }
   }, [inView, loading, loadMore])

   return (
      !loaded && (
         <div ref={ref} className="flex" style={{ margin: 'auto', height: "50px", width: "50px" }}>
            {loading &&
               <div className="loader">
               </div>
            }
         </div>
      )
   )
}
