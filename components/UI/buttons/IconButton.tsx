'use client'

interface IconButtomProps {
   title?: string,
   icon: React.ReactElement,
   onClick: () => void,
   className?: string
}

export default function IconButton(
   {
      title,
      icon,
      onClick,
      className
   }: IconButtomProps
) {
   return (
      <button className={`btn ${className}`} onClick={onClick}>
         {icon}
         {title && <span>{title}</span>}
      </button>
   )
}
