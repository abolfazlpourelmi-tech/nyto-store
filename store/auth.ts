import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  fullName: string;
  phone: string;
  email?: string;
  nationalId?: string;
  birthDate?: string;
}

interface AuthStore {
  user: User | null;
  isLoggedIn: () => boolean;
  login: (user: User) => void;
  updateProfile: (patch: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,

      isLoggedIn: () => get().user !== null,

      login: (user) => set({ user }),

      updateProfile: (patch) =>
        set((state) =>
          state.user ? { user: { ...state.user, ...patch } } : state
        ),

      logout: () => set({ user: null }),
    }),
    { name: "nyto-auth" }
  )
);
