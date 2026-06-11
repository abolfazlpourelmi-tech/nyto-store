import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Address } from "@/types";

interface AddressStore {
  addresses: Address[];
  addAddress: (address: Omit<Address, "id">) => Address;
  updateAddress: (id: string, patch: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefault: (id: string) => void;
  getDefault: () => Address | undefined;
}

export const useAddressStore = create<AddressStore>()(
  persist(
    (set, get) => ({
      addresses: [],

      addAddress: (address) => {
        const newAddress: Address = {
          ...address,
          id: Math.random().toString(36).slice(2, 10),
        };
        set((state) => {
          // first address becomes default automatically
          const isFirst = state.addresses.length === 0;
          const next = { ...newAddress, isDefault: newAddress.isDefault || isFirst };
          const addresses = next.isDefault
            ? [...state.addresses.map((a) => ({ ...a, isDefault: false })), next]
            : [...state.addresses, next];
          return { addresses };
        });
        return newAddress;
      },

      updateAddress: (id, patch) => {
        set((state) => ({
          addresses: state.addresses.map((a) =>
            a.id === id ? { ...a, ...patch } : a
          ),
        }));
      },

      removeAddress: (id) => {
        set((state) => {
          const filtered = state.addresses.filter((a) => a.id !== id);
          // if we removed the default, promote the first remaining one
          if (!filtered.some((a) => a.isDefault) && filtered.length > 0) {
            filtered[0] = { ...filtered[0], isDefault: true };
          }
          return { addresses: filtered };
        });
      },

      setDefault: (id) => {
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        }));
      },

      getDefault: () =>
        get().addresses.find((a) => a.isDefault) ?? get().addresses[0],
    }),
    { name: "nyto-addresses" }
  )
);
