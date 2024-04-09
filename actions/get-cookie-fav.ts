import axios from "@/config/axios";

const getFavCookie = async () => {

   const res = await axios.get(`api/cookie/fav`,
      {
         headers: { "Content-Type": "application/json" },
         withCredentials: true
      }
   );

   return res?.data?.fav;

};


export default getFavCookie