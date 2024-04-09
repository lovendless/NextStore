'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BookImage, BookOpen, Home } from "lucide-react";
import { useMenu } from "@/hooks/useMenu";

export default function MainNav() {

   const { isMenu } = useMenu();

   const pathname = usePathname();

   const routes = [
      {
         href: '/',
         label: 'Home',
         icon: <Home/>,
         active: pathname === '/'
      },
      {
         href: '/c',
         label: 'More',
         icon: <BookImage />,
         active: pathname === '/c'
      },
      {
         href: '#',
         label: 'About',
         icon: <BookOpen />,
         active: pathname === '#'
      },
   ];

   return (
      <nav className="side-menu__nav">
         <ul className="side-menu__list flex">

            {routes.map((route) => (
               <li key={route.href} className="side-menu__item">
                  <Link style={isMenu ? {flexDirection: 'row', fontSize: '18px'} : {flexDirection: 'column'}} className={`side-menu__link ${route.active ? "active" : ""}`} href={route.href}>
                     {route.icon}
                     <span>{route.label}</span>
                  </Link>
               </li>
            ))}
         </ul>
      </nav >
   )
}
