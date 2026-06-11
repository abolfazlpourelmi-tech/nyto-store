"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { UserCircle, LogIn } from "lucide-react";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { useAuthStore } from "@/store/auth";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((s) => s.user);
  // Avoid hydration mismatch: persisted state is only correct after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="container py-20 flex justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  /* ── Not logged in → login gate ── */
  if (!user) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center text-center gap-5">
        <div className="w-24 h-24 rounded-3xl bg-surface flex items-center justify-center">
          <UserCircle className="h-12 w-12 text-muted-foreground/50" />
        </div>
        <div>
          <h1 className="text-xl font-black mb-1">وارد حساب کاربری شوید</h1>
          <p className="text-sm text-muted-foreground max-w-xs">
            برای مشاهده سفارش‌ها، علاقه‌مندی‌ها و اطلاعات حساب، ابتدا وارد شوید.
          </p>
        </div>
        <Link
          href="/login"
          className="bg-primary text-white font-bold rounded-2xl px-6 py-3 text-sm flex items-center gap-2 active:scale-95 transition-transform shadow-primary"
        >
          <LogIn className="h-4 w-4" />
          ورود / ثبت‌نام
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4 md:py-8">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <AccountSidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
