import { useMemo, useState } from "react";

export const useFindValue = ( initialValue: string, initialData: any[] | undefined, id: string, value: string) => {

   const [state, setState] = useState<string>(initialValue);

   useMemo(() => {

      const object = initialData?.find((item) => item.id == id);

      if (object){
          setState(object[value]);
      } else {
         setState(initialValue);
      }
      
   }, [id, initialData, value]);

   return [state, setState];

};
