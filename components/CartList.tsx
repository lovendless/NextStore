'use client'
import { CartItem } from "./CartItem"
import { useCart } from "@/hooks/useCart"

export const CartList = () => {

   const items = useCart(state => state.items);

   return (
      <div className="cart__list">
         {items.length == 0 &&
            <p>
               No items added to cart
            </p>
         }
         <ul>
            {items.map((item, idx) => (
               <CartItem
                  key={idx}
                  data={item}
               />
            ))}
         </ul>
      </div>
   )
}