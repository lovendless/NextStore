'use server'

import { cookies } from "next/headers";

export const getFavIds = async () => {
   let fav = cookies().get('fav')?.value;

   if (!fav) {
      return [];
   }

   let favArray = fav?.split(',');

   return favArray;
}
