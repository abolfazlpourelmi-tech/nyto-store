import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Address, OrderStatus } from "@/types";

export interface StoredOrder {
  id: string;
  trackingCode: string;
  items: CartItem[];
  address: Address;
  paymentMethod: "online" | "cod";
  status: OrderStatus;
  itemsTotal: number;
  shipping: number;
  total: number;
  createdAt: string; // ISO string
}

interface OrdersStore {
  orders: StoredOrder[];
  addOrder: (order: Omit<StoredOrder, "id" | "trackingCode" | "createdAt" | "status">) => StoredOrder;
  cancelOrder: (id: string) => void;
  clear: () => void;
}

function makeTrackingCode(): string {
  return "NY" + Math.floor(10_000_000 + Math.random() * 89_999_999).toString();
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set) => ({
      orders: [],

      addOrder: (order) => {
        const newOrder: StoredOrder = {
          ...order,
          id: Math.random().toString(36).slice(2, 10),
          trackingCode: makeTrackingCode(),
          status: "processing",
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ orders: [newOrder, ...state.orders] }));
        return newOrder;
      },

      cancelOrder: (id) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, status: "cancelled" as OrderStatus } : o
          ),
        }));
      },

      clear: () => set({ orders: [] }),
    }),
    { name: "nyto-orders" }
  )
);
