'use client'

import { MouseEventHandler } from "react"

interface IconButtonProps {
   onClick: MouseEventHandler<HTMLButtonElement>,
   icon: React.ReactElement,
   className?: string,
   disabled?: boolean | undefined
}

const IconButton: React.FC<IconButtonProps> = (
   {
      onClick,
      icon,
      className,
      disabled
   }
) => {

   return (
      <button
         onClick={onClick}
         className={className}
         disabled={disabled}
      >
         {icon}
      </button>

   )
}

export default IconButton;