"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice, persianNumber } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCartStore();
  const count      = itemCount();
  const cartTotal  = total();
  const shipping   = cartTotal >= 500000 ? 0 : 50000;
  const grandTotal = cartTotal + shipping;

  /* ── Empty state ── */
  if (count === 0) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center text-center gap-5">
        <div className="w-24 h-24 rounded-3xl bg-surface flex items-center justify-center">
          <ShoppingBag className="h-11 w-11 text-muted-foreground/50" />
        </div>
        <div>
          <h1 className="text-xl font-black mb-1">سبد خرید خالی است</h1>
          <p className="text-sm text-muted-foreground">محصولات مورد علاقه‌تان را اضافه کنید</p>
        </div>
        <Link
          href="/products"
          className="bg-primary text-white font-bold rounded-2xl px-6 py-3 text-sm active:scale-95 transition-transform shadow-primary"
        >
          شروع خرید
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4 md:py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/products" className="md:hidden w-9 h-9 rounded-xl bg-surface flex items-center justify-center">
          <ArrowRight className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-black">سبد خرید</h1>
          <p className="text-xs text-muted-foreground">{persianNumber(count)} کالا</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* ── Cart items ── */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-3 p-3 bg-card rounded-2xl border border-border/40 shadow-card"
            >
              {/* Thumbnail */}
              <Link
                href={`/products/${item.product.slug}`}
                className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-surface"
              >
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </Link>

              {/* Info */}
              <div className="flex flex-col flex-1 min-w-0 gap-1.5">
                <Link
                  href={`/products/${item.product.slug}`}
                  className="font-semibold text-sm line-clamp-2 leading-snug hover:text-primary transition-colors"
                >
                  {item.product.name}
                </Link>
                <p className="text-xs text-muted-foreground">{item.product.brand}</p>

                <div className="flex items-center justify-between mt-auto flex-wrap gap-2">
                  {/* Quantity */}
                  <div className="flex items-center bg-surface rounded-xl overflow-hidden border border-border/60">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-base font-bold hover:bg-muted transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{persianNumber(item.quantity)}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                      className="w-8 h-8 flex items-center justify-center text-base font-bold hover:bg-muted transition-colors disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>

                  {/* Price + delete */}
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-primary text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="w-8 h-8 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Free shipping progress */}
          {shipping > 0 && (
            <div className="bg-surface rounded-2xl p-4 border border-border/40 flex items-center gap-3">
              <Truck className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1.5">
                  {formatPrice(500000 - cartTotal)} تا ارسال رایگان
                </p>
                <div className="w-full bg-border/60 rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((cartTotal / 500000) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Order summary ── */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-2xl border border-border/40 shadow-card p-5 space-y-4 sticky top-24">
            <h2 className="font-bold text-base">خلاصه سفارش</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>قیمت کالاها</span>
                <span className="text-foreground font-medium">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>هزینه ارسال</span>
                <span className={shipping === 0 ? "text-emerald-600 font-bold" : "text-foreground font-medium"}>
                  {shipping === 0 ? "رایگان 🎉" : formatPrice(shipping)}
                </span>
              </div>
            </div>

            <div className="border-t border-border/60 pt-4 flex justify-between items-center">
              <span className="font-bold">جمع کل</span>
              <span className="text-xl font-black text-primary">{formatPrice(grandTotal)}</span>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-primary text-white font-bold rounded-2xl py-3.5 flex items-center justify-center text-sm active:scale-95 transition-transform shadow-primary"
            >
              ادامه خرید
            </Link>

            <Link
              href="/products"
              className="w-full bg-surface text-muted-foreground font-semibold rounded-2xl py-2.5 flex items-center justify-center text-xs hover:text-foreground transition-colors"
            >
              ادامه خرید از فروشگاه
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
