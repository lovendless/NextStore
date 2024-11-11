import getCategories from "@/actions/get-categories";
import getProducts from "@/actions/get-products";
import { ProductList } from "@/components/ProductList";
import { getFavIds } from "@/lib/actions";
import { Filter } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

interface CategoryPageProps {
   searchParams: {
      q: string
   },
};

export const metadata: Metadata = {
   title: 'Catalog'
}

export default async function CPage(
   {
      searchParams
   }: CategoryPageProps
) {

   const q = searchParams.q;

   const products = await getProducts({ q, take: 4 });
   const categories = await getCategories();
   const favIds = await getFavIds();

   return (
      <section className="container">
         <div className="catalog">
            <div className="catalog__titles">
               <h1>{q ? `'${q}' - search results` : 'Catalog'}</h1>
               <p>{products.length} products found</p>
            </div>
            <div className="catalog__info">
               <aside className="catalog__side">
                  <div className="catalog__side-title">
                     <Filter />
                     <h3>Filter</h3>
                  </div>
                  <div className="catalog__side-categories">
                  <h3>Category</h3>
                  <ul className="catalog__side-list"> 
                     {categories.map((category, idx) => (
                        <li key={idx}>
                           <Link href={`/c/${category.name}`}>
                              {category.name}
                           </Link>
                        </li>
                     ))}
                  </ul>
                  </div>
               </aside>
               
               {/*product list*/}
               <ProductList favIds={favIds} filter={true} data={products} q={q} />
               
            </div>
         </div>
      </section>
   )
}
