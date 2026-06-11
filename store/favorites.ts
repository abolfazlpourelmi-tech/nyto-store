import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

interface FavoritesStore {
  items: Product[];
  toggle: (product: Product) => void;
  remove: (productId: string) => void;
  clear: () => void;
  has: (productId: string) => boolean;
  count: () => number;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (product) => {
        set((state) => {
          const exists = state.items.some((p) => p.id === product.id);
          return exists
            ? { items: state.items.filter((p) => p.id !== product.id) }
            : { items: [product, ...state.items] };
        });
      },

      remove: (productId) => {
        set((state) => ({
          items: state.items.filter((p) => p.id !== productId),
        }));
      },

      clear: () => set({ items: [] }),

      has: (productId) => get().items.some((p) => p.id === productId),

      count: () => get().items.length,
    }),
    { name: "nyto-favorites" }
  )
);
