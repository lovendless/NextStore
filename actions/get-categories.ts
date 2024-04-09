import { db } from "@/lib/db";

const getCategories = async () => {

   const categories = await db.category.findMany();

   return categories;

};

export default getCategories