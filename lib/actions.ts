'use server'

import { cookies } from "next/headers";

export const getFavIds = async (): Promise<string[]> => {
   let fav = cookies().get('fav')?.value;

   if (!fav) {
      return [];
   }

   let favArray = fav?.split(',');

   return favArray;
}
