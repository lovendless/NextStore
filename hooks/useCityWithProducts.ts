import axios from "@/config/axios";
import { useEffect } from "react";
import { useCurrentCity } from "./useCurrentCity";
import { useRouter } from "next/navigation";
import { City } from "@/new-types";

export const useCityWithProducts = (cityId: String | null): City | undefined => {

   const router = useRouter()

   const { currentCity, setCurrentCity } = useCurrentCity();

   useEffect(() => {

      if (cityId) {
         const getProductsByCurrentCity = async () => {

            try {

               const res = await axios.post('/api/currentcity', JSON.stringify({ cityId }));

               setCurrentCity(res?.data)

               router.refresh()

            } catch (err: any) {

               console.log(err)

            }
         }

         getProductsByCurrentCity();
      }

   }, [cityId])

   return currentCity;

}