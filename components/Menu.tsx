'use client'

import { useMenu } from "@/hooks/useMenu";
import { AlignJustify } from "lucide-react";

export default function Menu() {

   const { isMenu, setIsMenu } = useMenu();

   return (
      <button className="menu" onClick={() => setIsMenu(!isMenu)}>
         <AlignJustify />
      </button>
   )
}
