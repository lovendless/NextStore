'use client'

import { useCart } from "@/hooks/useCart";
import { Product } from "@/new-types";
import { Minus, Plus, X } from "lucide-react"

interface AvailableButtonsProps {
   data: Product & { quantity: number }
}

export const AvailableButtons: React.FC<AvailableButtonsProps> = (
   {
      data
   }
) => {
   const removeItem = useCart(state => state.removeItem);
   const addOne = useCart(state => state.addOne);
   const removeOne = useCart(state => state.removeOne);
   return (
      <div className="available-btns">
         <div className="minus-plus">
         <button className="btn" onClick={() => removeOne(data.id)}>
            <Minus />
         </button>
         <span style={{ fontSize: '24px' }}>{data.quantity}</span>
         <button className="btn" onClick={() => addOne(data.id)}>
            <Plus />
         </button>
         </div>
         <button className="btn" onClick={() => removeItem(data.id)}>
            <X/>
         </button>
      </div>
   )
}