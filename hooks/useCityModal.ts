import { create } from "zustand"

interface useCityModalCity {
   isOpen: Boolean,
   onOpen: () => void,
   onClose: () => void
}

export const useCityModal = create<useCityModalCity>((set) => ({
   isOpen: false,
   onOpen: () => set({ isOpen: true }),
   onClose: () => set({ isOpen: false }),
}))

