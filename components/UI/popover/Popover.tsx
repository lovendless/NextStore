'use client'

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react"
import Separator from "../separator/Separator";
import SearchInput from "@/components/UI/input/searchInput"

interface PopoverProps {
   initialData: any[] | undefined,
   searchedData: any[],
   id: string,
   name: string,
   value: string,
   title: string,
   defaultName: string,
   placeholder: string,
   isLoading: Boolean,
   isError: Boolean,
   onSearch: (value: string) => void,
   onChange: (value: any) => void
}

export default function Popover(
   {
      initialData,
      searchedData,
      id,
      name,
      value,
      title,
      defaultName,
      placeholder,
      isLoading,
      isError,
      onSearch,
      onChange,
   }: PopoverProps
) {

   const [open, setOpen] = useState(false);

   const [currentName, setCurrentName] = useState(defaultName);

   useEffect(() => {

      if (defaultName) setCurrentName(defaultName);

   }, [defaultName])

   const handleClick = (value: string | undefined, name: string) => {
      onChange(value);
      setCurrentName(name);
      setOpen(false);
   }

   return (

      <div className={open ? "popover active" : "popover"}>
         <input id={id} className="popover__input" type="hidden" name={name} value={value} />
         <div className="popover__head flex al-items-center justify-content-bw" onClick={() => setOpen((prev) => !prev)} style={{ textTransform: 'capitalize' }}>
            <span>{currentName ? currentName : placeholder}</span>
            <ChevronDown className="popover-arrow" />
         </div>
         <div className="popover__body flex direction-col">
            <SearchInput
               placeholder={placeholder}
               onChange={(value) => onSearch(value)}
            />
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
                  <div className="flex direction-col" style={{ paddingLeft: "5px", paddingRight: "5px", gap: "5px" }}>
                     <p style={{ color: "#696969" }}>{title}</p>
                     <ul className="popover__list">
                        {searchedData.map((item) => (
                           <li className="popover__item" key={item.id} onClick={() => handleClick(item.id, item.name)}>
                              <a className="popover__link">
                                 <span>
                                    {item.name}
                                 </span>
                              </a>
                           </li>
                        ))}
                     </ul>
                     <Separator />
                     <ul className="popover__list">
                        {initialData?.map((item) => (
                           <li className="popover__item" key={item.id} onClick={() => handleClick(item.id, item.name)}>
                              <a className="popover__link flex al-items-center justify-content-bw">
                                 <span>
                                    {item.name}
                                 </span>
                                 <span>
                                    {item.quantity}
                                 </span>
                              </a>
                           </li>
                        ))}

                     </ul>
                  </div>
            }
         </div>
      </div>
   )
}
