'use client'
import { useCart } from "@/hooks/useCart";
import { useCurrentCity } from "@/hooks/useCurrentCity";
import { Product } from "@/new-types";
import { Bell, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import { AvailableButtons } from "./AvailableButtons";
import NotifyModal from "../UI/modals/NotifyModal";

interface AvailableProps {
   data: Product
}

export const Available = (
   {
      data
   }: AvailableProps
) => {

   const [isOpen, setIsOpen] = useState(false);

   const currentCity = useCurrentCity(state => state.currentCity);

   const items = useCart(state => state.items);
   const addItem = useCart(state => state.addItem);
   
   const availableProduct = useMemo(() => {
     return currentCity?.availableProducts.find((item) => {
         return item.productId === data?.id && item?.available
      });
   }, [currentCity, data]);

   const findItem = useMemo(() => {
      return items.find(item => item.id === data.id);
   }, [items, data]);

   return (
      availableProduct ?
         findItem ?
            <AvailableButtons data={findItem} /> :
            <button onClick={() => addItem(data)} className="available-btn btn flex al-items-center justify-content-bw">
               <span>Add to cart</span>
               <ShoppingCart />
            </button>
         :
         <>
            <NotifyModal data={data} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <button onClick={() => setIsOpen(true)} className="available-btn btn flex al-items-center justify-content-bw">
               <Bell />
               <span>Notify when product is available</span>
            </button>
         </>

   )
};