import getCategories from "@/actions/get-categories";
import getCategory from "@/actions/get-category"
import getProducts from "@/actions/get-products";
import { Billboard } from "@/components/Billboard";
import { ProductList } from "@/components/ProductList";
import { getFavIds } from "@/lib/actions";
import { Metadata, ResolvingMetadata } from "next";

interface CategoryPageProps {
   params: {
      category: string
   },
};

export async function generateMetadata(
   { params }: CategoryPageProps,
   parent: ResolvingMetadata
): Promise<Metadata> {

   const category = await getCategory(params.category);

   const previousImages = (await parent).openGraph?.images || [];

   return {
      title: category?.name,
      openGraph: {
         title: category?.name,
         images: [category?.billboard?.imageUrl!, ...previousImages],
      },
   }
};

export async function generateStaticParams() {
   const categories = await getCategories();

   return categories.map((category) => ({
      category: category.name
   }))
};

export default async function CategoryPage(
   {
      params
   }: CategoryPageProps
) {

   const { category } = params;

   const products = await getProducts({ category, take: 4 });
   const categoryByParams = await getCategory(category);
   const favIds = await getFavIds();

   return (
      <section className="container">
         <h2 style={{ textTransform: "capitalize" }}>{categoryByParams?.name}</h2>

         {categoryByParams?.billboard && <Billboard data={categoryByParams?.billboard} />}
         {/*product list*/}
         <ProductList title={`Products for ${categoryByParams?.name}`} favIds={favIds} data={products} category={categoryByParams?.name}/>
      </section>
   )
}
