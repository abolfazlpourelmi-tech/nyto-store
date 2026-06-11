import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

export function calculateDiscount(
  price: number,
  originalPrice: number
): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function persianNumber(num: number | string): string {
  return String(num).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export function truncate(text: string, length: number): string {
  return text.length > length ? text.slice(0, length) + "..." : text;
}

/** Persian (Jalali) date — e.g. "۲۳ خرداد ۱۴۰۳" */
export function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

/** Persian (Jalali) date + time — e.g. "۲۳ خرداد ۱۴۰۳، ۱۴:۳۰" */
export function formatDateTime(iso: string): string {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export const ORDER_STATUS: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  pending:    { label: "در انتظار پرداخت", color: "#b45309", bg: "rgba(245,158,11,0.12)" },
  processing: { label: "در حال پردازش",     color: "#1d4ed8", bg: "rgba(59,130,246,0.12)" },
  shipped:    { label: "ارسال شده",          color: "#7c3aed", bg: "rgba(139,92,246,0.12)" },
  delivered:  { label: "تحویل شده",          color: "#059669", bg: "rgba(16,185,129,0.12)" },
  cancelled:  { label: "لغو شده",            color: "#dc2626", bg: "rgba(239,68,68,0.12)" },
};
