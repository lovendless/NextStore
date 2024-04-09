"use client"

import axios from "@/config/axios";
import { headers } from "next/headers";
import React, { createContext, useState } from "react";

export const ThemeContext = createContext<any>(undefined);

const ThemeProvider = (
   {
      themeCookie,
      children
   }: {
      themeCookie: string | undefined,
      children: React.ReactNode
   }
) => {

   const [theme, setTheme] = useState(themeCookie ? themeCookie : 'light');

   const switchDark = async () => {
      try {
         await axios.post('/api/cookie/theme', {
            theme: 'dark'
         }, {
            headers: { 'Content-Type': 'application/json' },
         })
         setTheme('dark');
      } catch (err) {
         console.log(err);
      }
   };

   const switchLight = async () => {
      try {
         await axios.post('/api/cookie/theme', {
            theme: 'light'
         }, {
            headers: { 'Content-Type': 'application/json' },
         }
         )
         setTheme('light');
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <ThemeContext.Provider value={{ switchDark, switchLight, theme }}>
         <body className={`${theme} anim`}>
            {children}
         </body>
      </ThemeContext.Provider>
   )
};

export default ThemeProvider;