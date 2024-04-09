'use client'
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export const SearchHeader = () => {

   const router = useRouter();

   const params = useSearchParams();
   const selectedValue = params.get('q');

   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [query, setQuery] = useState<string>(selectedValue || '');

   const onSearch = () => {
      setIsLoading(true);

      if (!query) {
         router.push('/c');
         setIsLoading(false);
      }

      const url = qs.stringifyUrl({
         url: '/c',
         query: {
            q: query
         }
      });

      window.location.assign(url);
      setIsLoading(false);
   }

   return (
      <>
         <div className="search">
            <Search className="search__icon" size={15} />
            <input
               className="search__input"
               type="search"
               id="search"
               placeholder="Product name"
               onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
            <button
               className="search__btn"
               disabled={isLoading}
               onClick={() => onSearch()}
            >
               <span>Search</span>
            </button>

         </div>
      </>
   )
}