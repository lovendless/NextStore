import { useMemo } from "react";

export const useSort = (items: any[], sort?: string): any[] => {

   const sortedPlaces = useMemo(() => {

      if (sort) {

         if (sort === 'asc') return [...items].sort((a, b) => Number(a.price) - Number(b.price));

         if (sort === 'desc') return [...items].sort((a, b) => Number(b.price) - Number(a.price));

         return [...items].sort(function (a, b) {
            if (a.sort < b.sort) { return -1; }
            if (a.sort > b.sort) { return 1; }
            return 0;
         });
      }

      return items;

   }, [items, sort]);

   return sortedPlaces;

};
