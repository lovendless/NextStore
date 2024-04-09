import { create } from "zustand"

interface UseMenu {
   isMenu: Boolean,
   setIsMenu: (value: boolean) => void,
}

export const useMenu = create<UseMenu>((set) => ({
   isMenu: false,
   setIsMenu: (value: boolean) => set({ isMenu: value }),
}))

