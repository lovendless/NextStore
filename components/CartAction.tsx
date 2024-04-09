'use client'
import { useCart } from "@/hooks/useCart";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartAction() {
   const router = useRouter();
   const cart = useCart();

   return (
      <div className="cart-action">
         <button onClick={() => router.push('/cart')} className="btn cart-action__btn">
            <ShoppingBag
               size={20}
               color="white"
            />
            {cart.items.length > 0 &&
               <span className="cart-action__amount">
                  {cart.items.length}
               </span>
            }
         </button>
      </div>
   )
}
