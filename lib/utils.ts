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
