
import { db } from "@/lib/db";
import { Product } from "@/new-types";

const getProduct = async (productId: string) => {

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

   return product;

};

export default getProduct