'use client'
import { AlignLeft, ChevronDown } from "lucide-react";
import { StyleHTMLAttributes, useRef, useState } from "react"

interface OptionProp {
   value: string | undefined,
   name: string | undefined
}

interface SelectProps {
   id: string,
   name: string
   options: OptionProp[],
   placeholder: string,
   value: string | undefined,
   defaultName?: string | undefined,
   onChange: (value: any) => void,
   style?: React.CSSProperties
}

function Select(
   {
      id,
      name,
      options,
      placeholder,
      value,
      defaultName,
      onChange,
      style
   }: SelectProps
) {

   const [open, setOpen] = useState(false);

   const selectRef = useRef<HTMLDivElement>(null!);
   const selectListRef = useRef<HTMLUListElement>(null!);

   const [currentName, setCurrentName] = useState(defaultName);

   const handleClick = (value: string | undefined, name: string | undefined) => {
      onChange(value);
      setCurrentName(name);
      setOpen(false);
   }

   return (

      <div style={style} className={open ? "select active" : "select"}>
         <input id={id} className="select__input" type="hidden" name={name} value={value} />
         <div ref={selectRef} className="select__head flex al-items-center justify-content-bw" onClick={() => setOpen((prev) => !prev)} style={{ textTransform: 'capitalize' }}>
            <AlignLeft size={18} />
            <span>{currentName ? currentName : placeholder}</span>
            <ChevronDown className="select-arrow" />
         </div>
         <ul ref={selectListRef} className="select__list">
            {options.map(option =>
               <li className="select__item" key={option.value} value={option.value} onClick={() => handleClick(option.value, option.name)}>{option.name}</li>
            )}
            {!options.length && <li className="select__item">No items</li>}
         </ul>
      </div>
   )
}

export default Select