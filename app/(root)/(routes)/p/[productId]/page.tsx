import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import { Info } from "@/components/Info";
import { ProductList } from "@/components/ProductList";
import Separator from "@/components/UI/separator/Separator";
import Gallery from "@/components/gallery";
import { getFavIds } from "@/lib/actions";
import { Product } from "@/new-types";
import { Metadata, ResolvingMetadata } from "next";

interface ProductPageProps {
   params: {
      productId: string
   },
};

export async function generateMetadata(
   { params }: ProductPageProps,
   parent: ResolvingMetadata
): Promise<Metadata> {

   const productId = params.productId;

   const product = await getProduct(productId);

   const previousImages = (await parent).openGraph?.images || [];

   return {
      title: product?.name,
      description: product?.description,
      openGraph: {
         title: product?.name,
         description: product?.description,
         url: `https://localhost:3000/p/${product?.id}`,
         images: [product?.images[0]?.url!, ...previousImages],
      },
   }
};

export async function generateStaticParams() {
   const products = await getProducts({ isA: true });

   return products.map((product) => ({
      productId: product.id
   }))
};

export default async function ProductPage(
   {
      params
   }: ProductPageProps
) {
   const { productId } = params

   const product = await getProduct(productId);

   const favIds = await getFavIds();

   const suggestedProducts = await getProducts({
      take: 4,
      productId: product?.id,
      category: product?.category?.name,
   });

   return (
      <section className="container product-page">
         <div className="product-page__inner">
            <div className="product-page__product">
               <Gallery images={product?.images} />
               <Info data={product!} />
            </div>
            <Separator />
            <ProductList title={'Related items'} favIds={favIds} data={suggestedProducts} productId={product?.id} category={product?.category?.name}/>
         </div>
      </section>
   )
}
