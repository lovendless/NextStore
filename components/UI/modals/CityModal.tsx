'use client'
import SearchPlace from "@/components/SearchPlace";
import Modal from "@/components/UI/modals/Modal";
import { useCityModal } from "@/hooks/useCityModal";

export default function CityModal() {
   const { isOpen, onClose } = useCityModal();

   return (
      <Modal
         title={"Choose your city"}
         isOpen={isOpen}
         onClose={onClose}
      >
         <SearchPlace />
      </Modal>
   )
}
