import { CartList } from "@/components/CartList";
import { Summary } from "@/components/Summary";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Cart'
};

export default function CartPage() {

   return (
      <section className="container">
         <div className="cart">
            <h1 className="cart__title">Shopping Cart</h1>
            <div className="cart__block">
               <CartList/>
               <Summary/>
            </div>
         </div>
      </section>
   )
}
