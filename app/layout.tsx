import type { Metadata } from 'next'
import "@/styles/main.css"
import AuthProvider from '@/context/AuthProvider'
import ThemeProvider from '@/context/theme-provider'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
   title: 'NextStore',
   description: 'NextStore',
}

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {

   const nextCookie = cookies();

   const themeCookie = nextCookie.get('theme')?.value;

   return (
      <AuthProvider>
         <html lang="en">
            <ThemeProvider themeCookie={themeCookie}>
               {children}
            </ThemeProvider>
         </html>
      </AuthProvider>
   )
}
