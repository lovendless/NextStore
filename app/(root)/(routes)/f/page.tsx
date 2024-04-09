
import getProducts from "@/actions/get-products";
import { ProductCard } from "@/components/ProductCard";
import { ProductList } from "@/components/ProductList";
import { getFavIds } from "@/lib/actions";
import { Metadata } from "next";


export const metadata: Metadata = {
   title: 'Favorite products'
}

export default async function FavoritePage() {

   const favIds = await getFavIds();
   const products = await getProducts({ ids: favIds });

   return (
      <section className="container">
         {/*product list*/}
         <div className="product-list">
            <h2 className="product-list__title">
               Favorite Products
            </h2>
            <div className="product-list__items">
               {!products.length && <p>No Results.</p>}
               {
                  products.map((product) => (
                     <ProductCard key={product.id} data={product} favCookie={favIds} />
                  ))
               }
            </div>
         </div>
      </section>
   )
}
