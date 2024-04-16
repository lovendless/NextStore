
import { Product } from "@/new-types"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface CartStore {
   items: (Product & { quantity: number })[],
   addItem: (data: Product) => void,
   removeItem: (id: string) => void,
   removeOne: (id: string) => void,
   addOne: (id: string) => void,
   removeAll: () => void
}

export const useCart = create(
   persist<CartStore>((set, get) => ({
      items: [],
      addItem: (data: Product) => {
         const currentItems = get().items;
         const exsistItem = currentItems.find(item => item.id === data.id);

         if (exsistItem) {
            return;
         }

         return set({ items: [...get().items, { ...data, quantity: 1 }] });

      },
      removeItem: (id: string) => {
         return set({ items: [...get().items.filter(item => item.id !== id)] });
      },
      addOne: (id: string) => {
         const currentItems = get().items;
         const exsistItem = currentItems.find(item => item.id === id);
         const filteredItems = currentItems.filter(item => item.id !== id);

         if (!exsistItem) {
            return;
         }

         return set({ items: [...filteredItems, { ...exsistItem, quantity: exsistItem.quantity + 1 }] });

      },
      removeOne: (id: string) => {
         const currentItems = get().items;
         const exsistItem = currentItems.find(item => item.id === id);
         const filteredItems = currentItems.filter(item => item.id !== id);

         if (exsistItem && exsistItem.quantity > 1) {
            return set({ items: [...filteredItems, { ...exsistItem, quantity: exsistItem.quantity - 1 }] });
         }

         return set({ items: [...filteredItems] });

      },
      removeAll: () => {
         return set({ items: [] });
      }
   }), {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage)
   })
)

