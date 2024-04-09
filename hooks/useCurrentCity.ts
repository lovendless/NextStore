import { City } from "@/new-types";
import { create } from "zustand";

interface useCurrentCity {
   currentCity: City | undefined,
   setCurrentCity: (city: City) => void
}

export const useCurrentCity = create<useCurrentCity>((set) => ({
   currentCity: undefined,
   setCurrentCity: (city: City) => set({ currentCity: city })
}))