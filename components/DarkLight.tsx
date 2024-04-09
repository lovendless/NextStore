'use client'

import { ThemeContext } from "@/context/theme-provider"
import { Moon, Sun } from "lucide-react"
import { useContext } from "react";

export const DarkLight = () => {

   const {switchDark, switchLight, theme} = useContext(ThemeContext);

   return (

      <button
      className="themebtn" 
      onClick={theme === "dark" ? switchLight : switchDark}
      >
         {theme === "dark" ? <Sun /> : <Moon />}
      </button>

   )
}