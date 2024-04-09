'use client'
import { City } from "@/new-types";

interface CityListProps {
   data: City[],
   onClick: (id: string) => void
}

export const CityList: React.FC<CityListProps> = (
   {
      data,
      onClick
   }
) => {

   return (
      <ul className="search-place__list">
         {data.map((city) => (
            <li key={city.id} onClick={() => onClick(city.id)}>
               <a>
                  <span style={{ textTransform: 'capitalize', cursor: 'pointer' }}>
                     {city.name}
                  </span>
               </a>
            </li>
         ))}
      </ul>
   )
};