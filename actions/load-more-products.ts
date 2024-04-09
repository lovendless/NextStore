import axios from "@/config/axios";
import qs from "query-string";

const loadMoreProducts = async (
   {
      skip,
      take,
      category,
      q,
   }: {
      skip: number,
      take: number,
      category?: string,
      q?: string,
   }
) => {

   const url = qs.stringifyUrl({
      url: '/api/products',
      query: {
         skip,
         take,
         category: category ? category : undefined,
         q: q ? q : undefined
      }
   });

   try {
      const res = await axios.get(url);
      return res?.data?.products;
   } catch (err) {
      console.log(err);
      return null;
   }

};


export default loadMoreProducts