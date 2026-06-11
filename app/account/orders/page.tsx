"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, ChevronLeft } from "lucide-react";
import { useOrdersStore } from "@/store/orders";
import { formatPrice, persianNumber, formatDateTime, ORDER_STATUS, cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import type { OrderStatus } from "@/types";

const STATUS_ORDER: OrderStatus[] = ["processing", "shipped", "delivered", "pending", "cancelled"];

export default function AccountOrdersPage() {
  const orders      = useOrdersStore((s) => s.orders);
  const cancelOrder = useOrdersStore((s) => s.cancelOrder);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  if (orders.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border/40 shadow-card py-16 flex flex-col items-center text-center gap-4">
        <div className="w-20 h-20 rounded-3xl bg-surface flex items-center justify-center">
          <Package className="h-9 w-9 text-muted-foreground/50" />
        </div>
        <div>
          <h2 className="font-black text-lg mb-1">هنوز سفارشی ثبت نکرده‌اید</h2>
          <p className="text-sm text-muted-foreground">پس از اولین خرید، سفارش‌هایتان اینجا نمایش داده می‌شود.</p>
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

  const handleCancel = (id: string) => {
    cancelOrder(id);
    toast({ title: "سفارش لغو شد", description: "سفارش شما با موفقیت لغو گردید" });
  };

  const counts = STATUS_ORDER.reduce<Record<string, number>>((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {});

  const filteredOrders = statusFilter === "all"
    ? orders
    : orders.filter((o) => o.status === statusFilter);

  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-lg font-black">سفارش‌های من</h1>

      {/* ── Status summary / filter chips ── */}
      <div
        className="flex"
        style={{
          flexDirection: "row", flexWrap: "nowrap",
          overflowX: "auto", gap: "8px",
          paddingTop: "2px", paddingBottom: "4px",
          scrollbarWidth: "none",
        } as React.CSSProperties}
      >
        <button
          onClick={() => setStatusFilter("all")}
          className={cn(
            "flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold border transition-all",
            statusFilter === "all"
              ? "bg-primary text-white border-primary"
              : "bg-card border-border/40 text-foreground"
          )}
        >
          همه سفارش‌ها
          <span
            className={cn(
              "min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-black flex items-center justify-center",
              statusFilter === "all" ? "bg-white/25" : "bg-surface text-muted-foreground"
            )}
          >
            {persianNumber(orders.length)}
          </span>
        </button>

        {STATUS_ORDER.map((s) => {
          const status = ORDER_STATUS[s];
          const active = statusFilter === s;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold border transition-all",
                active ? "border-primary" : "bg-card border-border/40 text-foreground"
              )}
              style={active ? { color: status.color, backgroundColor: status.bg, borderColor: status.color } : undefined}
            >
              {status.label}
              <span
                className="min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-black flex items-center justify-center bg-surface text-muted-foreground"
                style={active ? { backgroundColor: "rgba(255,255,255,0.5)", color: status.color } : undefined}
              >
                {persianNumber(counts[s])}
              </span>
            </button>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="bg-card rounded-2xl border border-border/40 shadow-card py-12 flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 rounded-3xl bg-surface flex items-center justify-center">
            <Package className="h-7 w-7 text-muted-foreground/50" />
          </div>
          <p className="text-sm text-muted-foreground">سفارشی با این وضعیت یافت نشد.</p>
        </div>
      )}

      {filteredOrders.map((order) => {
        const status   = ORDER_STATUS[order.status];
        const cancelable = order.status === "processing" || order.status === "pending";
        return (
          <div key={order.id} className="bg-card rounded-2xl border border-border/40 shadow-card overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 flex-wrap p-4 border-b border-border/40 bg-surface/50">
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ color: status.color, backgroundColor: status.bg }}
                >
                  {status.label}
                </span>
                <span className="text-xs text-muted-foreground">{formatDateTime(order.createdAt)}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                کد پیگیری: <span className="font-bold text-foreground" dir="ltr">{order.trackingCode}</span>
              </div>
            </div>

            {/* Items */}
            <div className="p-4 space-y-3">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="relative w-14 h-14 rounded-xl overflow-hidden bg-surface flex-shrink-0"
                  >
                    <Image src={item.product.images[0]} alt={item.product.name} fill unoptimized className="object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.slug}`} className="text-sm font-semibold line-clamp-1 hover:text-primary transition-colors">
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {persianNumber(item.quantity)} عدد × {formatPrice(item.product.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 flex-wrap p-4 border-t border-border/40">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">
                  {order.paymentMethod === "online" ? "پرداخت آنلاین" : "پرداخت در محل"}
                </span>
                <span className="font-bold">
                  جمع: <span className="text-primary">{formatPrice(order.total)}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                {cancelable && (
                  <button
                    onClick={() => handleCancel(order.id)}
                    className="text-xs font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-xl px-3 py-2 transition-colors"
                  >
                    لغو سفارش
                  </button>
                )}
                <Link
                  href="/products"
                  className="text-xs font-bold text-primary flex items-center gap-0.5 px-2 py-2"
                >
                  خرید مجدد
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
