'use client'
import { useInView } from "react-intersection-observer"
import { useCallback, useEffect, useState } from "react"
import loadMoreProducts from "@/actions/load-more-products";
import { Product } from "@/new-types";
import { delay } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

export default function LoadMore({ favIds }: { favIds: string[] }) {
   const [products, setProducts] = useState<Product[]>([]);

   const [pagesLoaded, setPagesLoaded] = useState<number>(0);

   const [loaded, setLoaded] = useState<boolean>(false);

   const perPage = 4;

   const { ref, inView } = useInView();

   const loadMore = useCallback( async () => {
      await delay(2000)
      const nextPage = pagesLoaded + 1;
      const skippedItems = nextPage * perPage;
      const newProducts = await loadMoreProducts({ skip: skippedItems, take: perPage }) ?? [];
      setProducts((prevProducts: Product[]) => {
         return [...prevProducts, ...newProducts]
      });
      setPagesLoaded(nextPage);
      if (!newProducts.length) {
         setLoaded(true);
      }
   }, [pagesLoaded]);

   useEffect(() => {
      if (inView) {
         loadMore();
      }
   }, [inView, loadMore])

   return (
      <>
         <div className="product-list__items">
            {
               products.map((product) => (
                  <ProductCard key={product.id} data={product} favCookie={favIds} />
               ))
            }
         </div>
         {!loaded &&
            <div ref={ref} className="flex" style={{ height: "50px", width: "50px" }}>
               <div className="loader">
               </div>
            </div>
         }
      </>
   )
}
