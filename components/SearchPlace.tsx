'use client'

import { useCityModal } from "@/hooks/useCityModal";
import { useCityWithProducts } from "@/hooks/useCityWithProducts";
import { useCurrentCity } from "@/hooks/useCurrentCity";
import { usePlaces } from "@/hooks/usePlaces";
import { useSort } from "@/hooks/useSort";
import { useState } from "react"
import SearchInput from "./UI/input/searchInput";
import Separator from "./UI/separator/Separator";
import { CityList } from "./CityList";

export default function SearchPlace() {

   const { onClose } = useCityModal();

   const [query, setQuery] = useState('');

   const [currentCityId, setCurrentCityId] = useState<String>(null!)

   const cityWithProducts = useCityWithProducts(currentCityId);

   const [places, isLoading, isError] = usePlaces(query);

   const sortedPlaces = useSort(places, 'name');

   return (
      <section className="search-place flex align-items-center direction-col" style={{ gap: "10px" }}>
         <div className="search-place__input" >
            <SearchInput
               placeholder={"Search your city..."}
               onChange={(value) => setQuery(value)}
            />
         </div>
         <Separator />
         {isLoading ?
            <div className="flex " style={{ height: "50px", width: "50px" }}>
               <div className="loader">
               </div>
            </div> :
            isError ?
               <p className="errmsg">
                  No Server Response
               </p> :
               <div className="search-place__cities">
                  <CityList data={sortedPlaces} onClick={(id: string) => { setCurrentCityId(id), onClose() }}/>
               </div>
         }

      </section >
   )
}
