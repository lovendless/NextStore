import getBillboards from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import { BillboardList } from "@/components/BillboardsList";
import LoadMore from "@/components/LoadMore";
import { ProductList } from "@/components/ProductList";
import { siteConfig } from "@/config/site";
import { getFavIds } from "@/lib/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Home',
   description: siteConfig.description
};

export default async function Home() {

   const products = await getProducts({ take: 4 });
   const featuredBillboards = await getBillboards({ isFeatured: true });
   const favIds = await getFavIds();

   return (
      <section className="container">

         {featuredBillboards && <BillboardList data={featuredBillboards} />}

         <ProductList title={'Our New Products!'} favIds={favIds} data={products} />
      </section>
   )
}
