"use client";
// Ensures Zustand's persist middleware hydrates on the client
export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
