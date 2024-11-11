import axios from "@/config/axios";
import qs from "query-string";

interface LoadMoreProps {
   skip: number,
   take: number,
   productId?: string,
   category?: string,
   q?: string,
}

const loadMoreProducts = async (
   {
      skip,
      take,
      productId,
      category,
      q,
   }: LoadMoreProps
) => {

   const url = qs.stringifyUrl({
      url: '/api/products',
      query: {
         skip,
         take,
         productId: productId ? productId : undefined,
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