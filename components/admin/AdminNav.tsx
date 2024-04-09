'use client'
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminNav() {

   const params = useParams()

   const pathname = usePathname()

   const routes = [
      {
         href: '/billboards',
         label: 'Billboards',
         active: pathname === `/admin/${params.userId}/billboards`
      },
      {
         href: '/cities',
         label: 'Cities',
         active: pathname === `/admin/${params.userId}/cities`
      },
      {
         href: '/categories',
         label: 'Categories',
         active: pathname === `/admin/${params.userId}/categories`
      },
      {
         href: '/products',
         label: 'Products',
         active: pathname === `/admin/${params.userId}/products`
      },
      {
         href: '/orders',
         label: 'Orders',
         active: pathname === `/admin/${params.userId}/orders`
      },
   ]

   return (
      <nav className="admin-menu__nav">
         <ul className="admin-menu__list flex">
            {routes.map((route) => (
               <li key={route.href} className="admin-menu__item">
                 <Link className={`admin-menu__link ${route.active ? "active" : ""}`} href={`/admin/${params.userId}${route.href}`}>{route.label}</Link>
               </li>
            ))}
         </ul>
      </nav >
   )
}
