'use client'
import { useCart } from "@/hooks/useCart"
import { Currency } from "./UI/currency/Currency"

export const Summary = () => {

   const items = useCart(state => state.items);

   const totalPrice = items.reduce((total, item) => {
      return total + Number(item.price * item.quantity);
   }, 0)

   return (
      <div className="summary">
         <h2 className="summary__title">Order Summary</h2>
         <div className="summary__block">
            <div className="order-total">
               <div className="order-total__title">
                  Order total
               </div>
               <Currency value={totalPrice} />
            </div>
         </div>   
         <button className="summary__btn">
            <span>Checkout</span>
         </button>
      </div>
   )
}