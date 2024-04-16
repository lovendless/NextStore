'use client'
import { Product } from "@/new-types";
import { ProductCard } from "./ProductCard";
import Select from "./UI/select/Select";
import { useCallback, useEffect, useState } from "react";
import { useSort } from "@/hooks/useSort";
import loadMoreProducts from "@/actions/load-more-products";
import { delay } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

interface ProductListProps {
   filter?: boolean,
   title?: string,
   category?: string,
   q?: string,
   favIds: string[],
   data: Product[]
}

export const ProductList: React.FC<ProductListProps> = (
   {
      filter,
      title,
      favIds,
      category,
      q,
      data
   }
) => {

   const [products, setProducts] = useState<Product[]>(data);

   const [sort, setSort] = useState('');

   const sortedData = useSort(products, sort);

   const [pagesLoaded, setPagesLoaded] = useState(0);

   const [loading, setLoading] = useState<boolean>(false);
   const [loaded, setLoaded] = useState<boolean>(false);

   const perPage = 4;

   const { ref, inView } = useInView();

   const loadMore = useCallback(async () => {
      setLoading(true)
      //await delay(1000);
      const nextPage = pagesLoaded + 1;
      const skippedItems = nextPage * perPage;
      const newProducts = await loadMoreProducts({ skip: skippedItems, take: perPage, category, q }) ?? [];
      setProducts((prevProducts: Product[]) => {
         return [...prevProducts, ...newProducts]
      });
      setPagesLoaded(nextPage);
      setLoading(false);
      if (!newProducts.length) {
         setLoaded(true)
      }
   }, [pagesLoaded, category, q]);

   useEffect(() => {
      if (inView && !loading) {
         loadMore();
      }
   }, [inView, loading, loadMore])

   return (
      <div className="product-list">
         {title &&
            <h2 className="product-list__title">
               {title}
            </h2>
         }
         {filter &&
            <Select
               id={'sort'}
               name={'sort'}
               options={
                  [
                     { value: 'name', name: 'By name' },
                     { value: 'asc', name: 'Ascending by price' },
                     { value: 'desc', name: 'Descending by price' },
                  ]
               }
               placeholder="Select filter"
               value={sort}
               onChange={(value) => setSort(value)}
            />
         }
         <div className="product-list__items">
            {!sortedData.length && <p>No Results.</p>}
            {
               sortedData.map((product) => (
                  <ProductCard key={product.id} data={product} favCookie={favIds} />
               ))
            }
         </div>

         {!loaded && (
            <div ref={ref} className="flex" style={{ margin: 'auto', height: "50px", width: "50px" }}>
               {loading &&
                  <div className="loader">
                  </div>
               }
            </div>
         )
         }

      </div>
   )
};