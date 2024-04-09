import City from "./City";
import { db } from "@/lib/db";
import { MapPin } from "lucide-react";
import { cookies } from "next/headers";

async function currentCity() {

   const cookieCityId = cookies().get('city');

   if (cookieCityId) {

      const city = await db.city.findUnique({
         where: {
            id: cookieCityId.value
         },
         include: {
            availableProducts: {
               include: {
                  product: true
               }
            }
         }
      });

      if (!city) return undefined

      return city

   } else {

      const defaultCity = await db.city.findFirst({
         where: {
            default: true
         },
         include: {
            availableProducts: {
               include: {
                  product: true
               }
            }
         }
      });

      if (!defaultCity) return undefined

      return defaultCity
   }
}

export default async function CurrentCity() {

   const defaultCity = await currentCity()

   return (
      <div className="current-city">
         <MapPin size={20} />
         <span>Your city:</span>
         <City defaultCity={defaultCity} />
      </div>
   )
}
