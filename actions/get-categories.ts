import { db } from "@/lib/db";
import { Category } from "@/new-types";

const getCategories = async (): Promise<Category[]> => {

   const categories = await db.category.findMany();

   return JSON.parse(JSON.stringify(categories));

};

export default getCategories