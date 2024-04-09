
import axios from "@/config/axios";

const updateFavCookie = async (productId: string) => {
   
      await axios.post(`api/cookie/fav/${productId}`,
         {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
         }
      );

};


export default updateFavCookie
