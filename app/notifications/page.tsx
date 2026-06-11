"use client";
import Link from "next/link";
import { ArrowRight, Bell } from "lucide-react";
import { notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const typeConfig: Record<string, { color: string; bg: string }> = {
  order:  { color: "text-blue-600",    bg: "bg-blue-50 dark:bg-blue-950/40" },
  promo:  { color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
  system: { color: "text-amber-600",   bg: "bg-amber-50 dark:bg-amber-950/40" },
};

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="container py-4 md:py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <Link
          href="/"
          className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center flex-shrink-0"
        >
          <ArrowRight className="h-4 w-4" />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-black">اعلان‌ها</h1>
          {unreadCount > 0 && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {unreadCount} اعلان خوانده‌نشده
            </p>
          )}
        </div>
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Bell className="h-5 w-5 text-primary" />
        </div>
      </div>

      {/* Notification list */}
      <div className="space-y-2.5">
        {notifications.map((notif) => {
          const cfg = typeConfig[notif.type] ?? typeConfig.system;

          return (
            <Link
              key={notif.id}
              href={`/notifications/${notif.id}`}
              className={cn(
                "block bg-card rounded-2xl border border-border/40 shadow-card p-4 transition-all hover:shadow-card-lg hover:border-primary/30",
                !notif.read && "ring-1 ring-primary/20"
              )}
            >
              <div className="flex gap-3" style={{ flexDirection: "row" }}>
                {/* Icon */}
                <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-xl", cfg.bg)}>
                  {notif.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2" style={{ flexDirection: "row" }}>
                    <h3 className={cn("text-sm font-bold leading-snug", !notif.read && "text-foreground")}>
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{notif.summary}</p>
                  <div className="flex items-center gap-2 mt-2" style={{ flexDirection: "row" }}>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md", cfg.bg, cfg.color)}>
                      {notif.type === "order" ? "سفارش" : notif.type === "promo" ? "تخفیف" : "سیستم"}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
