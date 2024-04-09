import { db } from "@/lib/db";
import { Billboard } from "@prisma/client";

interface Query {
   isFeatured: boolean,
   isA?: Boolean
}

const getBillboards = async (query: Query): Promise<Billboard[]> => {

   const billboards = await db.billboard.findMany({
      take: query?.isFeatured ? 3 : undefined,
      where: {
         isFeatured: query?.isFeatured ? query?.isFeatured : undefined
      },
      orderBy: {
         createdAt: 'desc'
      },
   });

   return billboards;

};

export default getBillboards