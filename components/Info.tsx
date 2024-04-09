'use client'

import { Product } from "@/new-types";
import { Currency } from "./UI/currency/Currency";
import Separator from "./UI/separator/Separator";
import { useCurrentCity } from "@/hooks/useCurrentCity";
import { Available } from "./available/Available";

interface InfoProps {
   data: Product 
}

export const Info = (
   {
      data
   }: InfoProps
) => {

   const { currentCity } = useCurrentCity();

   const availableProduct = currentCity?.availableProducts.find((item) => {
      return item.productId === data?.id && item.available
   });

   return (
      <div className="info">
         <h1 className="info__title">{data?.name}</h1>
         <div className="info__price">
            <Currency value={data?.price} />
         </div>
         <div className="info__available">
            <p>{availableProduct ? `Available (${availableProduct?.quantity})` : "Product is not available"}</p>
         </div>
         <Separator />
         <div className="info__description">
            <p>{data?.description}</p>
         </div>
         <div className="info__shopping-cart">
           <Available data={data}/>
         </div>
      </div>


   )
};