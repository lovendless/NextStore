import { db } from "@/lib/db";

const getCategory = async (name: string) => {

   const category = await db.category.findFirst({
    where: {
      name
    },
    include: {
      billboard: true
    }
   });

   return category;

};

export default getCategory