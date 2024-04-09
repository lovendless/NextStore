'use client'

import Modal from "@/components/UI/modals/Modal";
import { useEffect, useState } from "react";

//IF HYDRATION ERROR

export interface AlertModalProps {
   isOpen: Boolean,
   isLoading: boolean,
   onClose: () => void,
   onConfirm: (e: any) => void
}

export default function AlertModal(
   {
      isOpen,
      isLoading,
      onClose,
      onConfirm
   }: AlertModalProps
) {
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {

      setIsMounted(true)

   }, [])

   if (!isMounted) return null

   return (
      <Modal
         title={'Are you sure?'}
         isOpen={isOpen}
         onClose={onClose}
      >
         <div className="flex align-items-center justify-end" style={{ paddingTop: "1.5rem", gap: "10px" }}>
            <button className="btn admin" disabled={isLoading} onClick={onClose}>
               Cancel
            </button>
            <button className="btn delete" disabled={isLoading} onClick={onConfirm}>
               Continue
            </button>
         </div>
      </Modal>
   )
}
