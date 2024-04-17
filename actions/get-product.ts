
import { db } from "@/lib/db";
import { Product } from "@/new-types";

const getProduct = async (productId: string): Promise<Product | null> => {

   const product = await db.product.findUnique({
      where: {
         NOT: {
            isArchived: true
         },
         id: productId
      },
      include: {
         category: true,
         images: true,
         availableCities: true
      }
   });

   if (product) return product;
   
   return null;
};

export default getProduct