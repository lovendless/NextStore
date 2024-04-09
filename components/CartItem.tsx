'use client'
import { useCart } from "@/hooks/useCart";
import { Product } from "@/new-types";
import { X } from "lucide-react";
import Image from "next/image";
import { Currency } from "./UI/currency/Currency";
import { AvailableButtons } from "./available/AvailableButtons";
import { useMemo } from "react";

interface CartItemProps {
   data: Product
}

export const CartItem: React.FC<CartItemProps> = (
   { data }
) => {

   const items = useCart(state => state.items);
   const removeItem = useCart(state => state.removeItem);

   const findItem = useMemo(() => {
      return items.find(item => item.id === data.id);
   }, [items, data]);

   return (
      <li className="cart__item">
         <div className="cart__item-img">
            <Image
               fill
               src={data.images[0].url}
               alt=""
               style={{ objectFit: 'cover', objectPosition: "center" }} />
         </div>
         <div className="cart__item-description">
            {/*<button className="cart-delete-btn" onClick={() => { removeItem(data.id) }} >
               <X size={15} style={{ margin: 'auto' }} />
            </button>*/}
            <div className="cart__item-info">
               <div className="flex justify-content-bw">
                  <p style={{textTransform: 'capitalize'}}>
                     {data.name}
                  </p>
               </div>
               {findItem && <AvailableButtons data={findItem} />}
               <Currency value={data.price} />
            </div>
         </div>

      </li>
   )
}
