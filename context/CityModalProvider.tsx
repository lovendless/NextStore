'use client'

import CityModal from "@/components/UI/modals/CityModal";
import { useEffect, useState } from "react";

//IF HYDRATION ERROR

export default function CityModalProvider() {
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {

      setIsMounted(true)

   }, [])

   if (!isMounted) return null

   return (
      <>
      <CityModal/>
      </>
   )
}
