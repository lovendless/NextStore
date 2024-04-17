'use client'
import { Product } from "@/new-types";
import { ProductCard } from "./ProductCard";
import Select from "./UI/select/Select";
import { useState } from "react";
import { useSort } from "@/hooks/useSort";
import LoadMore, { LoadMoreProps } from "./LoadMore";

type ProductListProps = {
   favIds: string[],
   data: Product[],
   filter?: boolean,
   title?: string,
} & LoadMoreProps

export const ProductList: React.FC<ProductListProps> = (
   {
      favIds,
      data,
      filter,
      title,
      productId,
      category,
      q,
      isLoaded,
   }
) => {

   const [products, setProducts] = useState<Product[]>(data);

   const [sort, setSort] = useState('');

   const sortedData = useSort(products, sort);

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
         <LoadMore
            products={products}
            addProducts={(value: Product[]) => setProducts(value)}
            productId={productId}
            q={q}
            category={category}
            isLoaded={isLoaded}
         />
      </div>
   )
};