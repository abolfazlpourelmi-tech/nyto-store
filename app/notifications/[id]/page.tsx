"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Bell, ExternalLink } from "lucide-react";
import { notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const typeBadge: Record<string, { label: string; color: string; bg: string }> = {
  order:  { label: "سفارش", color: "text-blue-600",    bg: "bg-blue-50 dark:bg-blue-950/40" },
  promo:  { label: "تخفیف", color: "text-emerald-600",  bg: "bg-emerald-50 dark:bg-emerald-950/40" },
  system: { label: "سیستم", color: "text-amber-600",    bg: "bg-amber-50 dark:bg-amber-950/40" },
};

export default function NotificationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const notif = notifications.find((n) => n.id === id);

  if (!notif) {
    return (
      <div className="container py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mx-auto mb-4">
          <Bell className="h-7 w-7 text-muted-foreground" />
        </div>
        <h2 className="text-base font-bold mb-2">اعلان یافت نشد</h2>
        <p className="text-sm text-muted-foreground mb-4">این اعلان وجود ندارد یا حذف شده است.</p>
        <Link
          href="/notifications"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary"
        >
          <ArrowRight className="h-4 w-4" />
          بازگشت به اعلان‌ها
        </Link>
      </div>
    );
  }

  const badge = typeBadge[notif.type] ?? typeBadge.system;

  return (
    <div className="container py-4 md:py-8 max-w-2xl">
      {/* Back button */}
      <Link
        href="/notifications"
        className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mb-5"
      >
        <ArrowRight className="h-4 w-4" />
        بازگشت به اعلان‌ها
      </Link>

      {/* Card */}
      <div className="bg-card rounded-2xl border border-border/40 shadow-card overflow-hidden">
        {/* Header band */}
        <div className="bg-primary/5 border-b border-border/40 px-5 py-4">
          <div className="flex items-start gap-3" style={{ flexDirection: "row" }}>
            <span className="w-12 h-12 rounded-xl bg-card border border-border/40 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
              {notif.icon}
            </span>
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-black leading-snug">{notif.title}</h1>
              <div className="flex items-center gap-2 mt-1.5" style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md", badge.bg, badge.color)}>
                  {badge.label}
                </span>
                <span className="text-[10px] text-muted-foreground">{notif.date}</span>
                <span className="text-[10px] text-muted-foreground">• {notif.time}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          <p className="text-sm leading-7 text-foreground/90">{notif.body}</p>
        </div>

        {/* Action link */}
        {notif.link && (
          <div className="px-5 pb-5">
            <Link
              href={notif.link}
              className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-primary text-white text-sm font-bold active:scale-95 transition-transform shadow-primary"
            >
              مشاهده جزئیات
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
