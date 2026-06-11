"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Heart,
  MapPin,
  UserCog,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const navItems = [
  { href: "/account",           icon: LayoutDashboard, label: "داشبورد"        },
  { href: "/account/orders",    icon: Package,         label: "سفارش‌ها"       },
  { href: "/account/favorites", icon: Heart,           label: "علاقه‌مندی‌ها" },
  { href: "/account/addresses", icon: MapPin,          label: "آدرس‌ها"        },
  { href: "/account/profile",   icon: UserCog,         label: "اطلاعات حساب"   },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const user     = useAuthStore((s) => s.user);
  const logout   = useAuthStore((s) => s.logout);

  const isActive = (href: string) =>
    href === "/account" ? pathname === "/account" : pathname.startsWith(href);

  const handleLogout = () => {
    logout();
    toast({ title: "خروج موفق", description: "از حساب کاربری خارج شدید" });
    router.push("/");
  };

  return (
    <aside className="lg:w-64 lg:flex-shrink-0">
      {/* User header — desktop only */}
      <div className="hidden lg:flex items-center gap-3 bg-card rounded-2xl border border-border/40 shadow-card p-4 mb-3">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg flex-shrink-0">
          {user?.fullName?.charAt(0) ?? "ن"}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm truncate">{user?.fullName ?? "کاربر نیتو"}</p>
          <p className="text-xs text-muted-foreground" dir="ltr">{user?.phone ?? "—"}</p>
        </div>
      </div>

      {/* Nav — vertical on desktop, horizontal scroll on mobile */}
      <nav className="bg-card lg:rounded-2xl lg:border lg:border-border/40 lg:shadow-card lg:p-2">
        <div className="flex lg:flex-col gap-1 overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground"
                )}
              >
                <Icon className="h-[18px] w-[18px] flex-shrink-0" />
                {label}
              </Link>
            );
          })}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap flex-shrink-0 text-red-500 hover:bg-red-500/10 transition-colors lg:mt-1"
          >
            <LogOut className="h-[18px] w-[18px] flex-shrink-0" />
            خروج
          </button>
        </div>
      </nav>
    </aside>
  );
}
