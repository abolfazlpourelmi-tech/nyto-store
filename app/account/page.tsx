"use client";
import Link from "next/link";
import {
  Package,
  Heart,
  MapPin,
  UserCog,
  ChevronLeft,
  Wallet,
  Clock,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useOrdersStore } from "@/store/orders";
import { useFavoritesStore } from "@/store/favorites";
import { useAddressStore } from "@/store/address";
import { formatPrice, persianNumber, formatDate, ORDER_STATUS } from "@/lib/utils";

export default function AccountDashboardPage() {
  const user      = useAuthStore((s) => s.user);
  const orders    = useOrdersStore((s) => s.orders);
  const favCount  = useFavoritesStore((s) => s.items.length);
  const addrCount = useAddressStore((s) => s.addresses.length);

  const totalSpent = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { icon: Package, label: "سفارش‌ها",       value: persianNumber(orders.length),  href: "/account/orders",    color: "#3b82f6" },
    { icon: Heart,   label: "علاقه‌مندی‌ها", value: persianNumber(favCount),       href: "/account/favorites", color: "#ec4899" },
    { icon: MapPin,  label: "آدرس‌ها",        value: persianNumber(addrCount),      href: "/account/addresses", color: "#22c55e" },
    { icon: Wallet,  label: "مجموع خرید",     value: formatPrice(totalSpent),       href: "/account/orders",    color: "#f59e0b" },
  ];

  const quickLinks = [
    { icon: Package, label: "پیگیری سفارش‌ها",   desc: "وضعیت و تاریخچه سفارش‌های شما", href: "/account/orders"    },
    { icon: Heart,   label: "لیست علاقه‌مندی‌ها", desc: "محصولات ذخیره‌شده",            href: "/account/favorites" },
    { icon: MapPin,  label: "آدرس‌های من",         desc: "مدیریت آدرس‌های تحویل",        href: "/account/addresses" },
    { icon: UserCog, label: "اطلاعات حساب",        desc: "ویرایش مشخصات فردی",            href: "/account/profile"   },
  ];

  const recent = orders[0];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Greeting */}
      <div className="bg-gradient-to-l from-primary to-orange-400 rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-white/10" />
        <p className="text-sm opacity-90 mb-1">سلام 👋</p>
        <h1 className="text-xl font-black">{user?.fullName ?? "کاربر نیتو"}</h1>
        <p className="text-xs opacity-80 mt-1" dir="ltr">{user?.phone}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(({ icon: Icon, label, value, href, color }) => (
          <Link
            key={label}
            href={href}
            className="bg-card rounded-2xl border border-border/40 shadow-card p-4 hover:shadow-card-lg transition-shadow"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-2.5"
              style={{ backgroundColor: `${color}1a` }}
            >
              <Icon className="h-[18px] w-[18px]" style={{ color }} />
            </div>
            <p className="text-base font-black leading-tight">{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
          </Link>
        ))}
      </div>

      {/* Recent order */}
      {recent && (
        <div className="bg-card rounded-2xl border border-border/40 shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-sm">آخرین سفارش</h2>
            <Link href="/account/orders" className="text-xs font-bold text-primary flex items-center gap-0.5">
              مشاهده همه
              <ChevronLeft className="h-3.5 w-3.5" />
            </Link>
          </div>
          <Link href="/account/orders" className="block">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold" dir="ltr">{recent.trackingCode}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(recent.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ color: ORDER_STATUS[recent.status].color, backgroundColor: ORDER_STATUS[recent.status].bg }}
                >
                  {ORDER_STATUS[recent.status].label}
                </span>
                <span className="text-sm font-bold text-primary">{formatPrice(recent.total)}</span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickLinks.map(({ icon: Icon, label, desc, href }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 bg-card rounded-2xl border border-border/40 shadow-card p-4 hover:shadow-card-lg transition-shadow"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
            <ChevronLeft className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
