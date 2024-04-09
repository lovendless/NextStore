import { create } from "zustand";

interface useFavProducts {
   favProducts: string[],
   setFavProducts: (fav: string[]) => void,
   isRefetch: Boolean,
   setIsRefetch: (v: Boolean) => void
}

export const useFavProducts = create<useFavProducts>((set) => ({
   favProducts: [],
   isRefetch: false,
   setFavProducts: (fav: string[]) => set({ favProducts: fav }),
   setIsRefetch: (v: Boolean) => set({ isRefetch: v }),
}))