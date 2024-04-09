'use client'

import { LegacyRef } from "react"

export default function Checkbox(
   {
      id, name, checkboxRef, label, checked, onChange
   }: {
      id: string,
      name: string,
      checkboxRef: LegacyRef<HTMLInputElement>,
      label: string,
      checked: boolean | undefined,
      onChange?: () => void
   }
) {
   return (
      <label className='input flex' style={{ gap: "10px", cursor: 'pointer' }}>
         <input
            ref={checkboxRef}
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            onChange={onChange}
         />
         {label}
      </label>
   )
}
