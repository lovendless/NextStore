import { db } from "@/lib/db";
import { Product } from "@/new-types";

interface Query {
   category?: string
   productId?: string,
   ids?: string[],
   q?: string,
   skip?: number,
   take?: number,
   isA?: Boolean
}

const getProducts = async (query: Query): Promise<Product[]> => {

   const products = await db.product.findMany({
      skip: query.skip ? query.skip : undefined,
      take: query.take? query.take : undefined,
      where: {
         NOT: [
            { id: query?.productId ? query?.productId : undefined },
            { isArchived: true }
         ],
         id: { in: query?.ids ? query?.ids : undefined },
         category: {
            name: query?.category ? query?.category : undefined
         },
         name: {
            startsWith: query?.q ? query?.q : undefined
         }
      },
      
      include: {
         category: true,
         images: true,
         availableCities: true
      },
      orderBy: {
         createdAt: 'desc'
      },
   });

   return JSON.parse(JSON.stringify(products));

};

export default getProducts