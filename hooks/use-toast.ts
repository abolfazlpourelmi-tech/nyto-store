"use client";
import { useState, useCallback } from "react";

type ToastVariant = "default" | "destructive";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
}

let toastListeners: Array<(toasts: Toast[]) => void> = [];
let toastList: Toast[] = [];

function notifyListeners() {
  toastListeners.forEach((l) => l([...toastList]));
}

export function toast(opts: Omit<Toast, "id">) {
  const id = Math.random().toString(36).slice(2);
  toastList = [...toastList, { ...opts, id }];
  notifyListeners();
  setTimeout(() => {
    toastList = toastList.filter((t) => t.id !== id);
    notifyListeners();
  }, 4000);
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>(toastList);

  const subscribe = useCallback(() => {
    const listener = (t: Toast[]) => setToasts(t);
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  // Subscribe on mount
  useState(() => {
    const unsub = subscribe();
    return unsub;
  });

  const dismiss = useCallback((id: string) => {
    toastList = toastList.filter((t) => t.id !== id);
    notifyListeners();
  }, []);

  return { toasts, dismiss };
}
