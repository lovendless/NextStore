import axios from "@/config/axios";
import { useEffect, useState } from "react"

export const usePlaces = (query: string): any[] => {

   const [isLoading, setIsLoading] = useState(false);
   const [isError, setIsError] = useState(false);
   const [places, setPlaces] = useState([]);

   useEffect(() => {

      if (query && !isLoading) {
         setIsError(false)
         setIsLoading(true)

         const placesByQuery = async () => {
            try {
               const res = await axios.post('/api/places', { query });

               const resData = res?.data?.searchedPlaces;

               setPlaces(resData);

            } catch (err: any) {
               setIsError(true);

            } finally {
               setIsLoading(false);
            }
         }

         placesByQuery()

      }

   }, [query])

   return [places, isLoading, isError]

}