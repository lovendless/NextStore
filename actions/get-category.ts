import { db } from "@/lib/db";
import { Category } from "@/new-types";

const getCategory = async (name: string): Promise<Category> => {

   const category = await db.category.findFirst({
    where: {
      name
    },
    include: {
      billboard: true
    }
   });

   return JSON.parse(JSON.stringify(category));
};

export default getCategory