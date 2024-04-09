'use client'
import { Search } from "lucide-react";

export default function SearchInput(
   {
      placeholder,
      onChange
   }: {
      placeholder: string,
      onChange: (value: any) => void
      }
) {
   return (
      <div className="search-input flex al-items-center">
         <Search style={{ color: "#696969", height: "20px", width: "20px" }} />
         <input
            id="search-input"
            type="text"
            placeholder={placeholder}
            autoComplete='on'
            onChange={(e) => onChange(e.target.value.toLowerCase())}
         />
      </div>
   )
}
