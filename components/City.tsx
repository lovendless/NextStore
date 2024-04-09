'use client'

import { useCityModal } from "@/hooks/useCityModal";
import { useCurrentCity } from "@/hooks/useCurrentCity";
import { City as CityType } from "@/new-types";
import { useEffect } from "react";

export default function City({ defaultCity }: { defaultCity: CityType | undefined }) {

   const { currentCity, setCurrentCity } = useCurrentCity();
   
   const { onOpen } = useCityModal();

   useEffect(() => {
      if (!currentCity && defaultCity) {
         
         setCurrentCity(defaultCity)
          
      }
   }, [currentCity, setCurrentCity, defaultCity])

   return (
      <a onClick={() => onOpen()}>
         <span style={{ textDecoration: "underline 1px dashed ",textTransform: 'capitalize', cursor: 'pointer' }}>
            {defaultCity?.name}
         </span>
      </a>
   )
}
