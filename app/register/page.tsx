"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { toast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const router = useRouter();
  const login  = useAuthStore((s) => s.login);

  const [form, setForm] = useState({ fullName: "", phone: "", email: "" });

  const phoneValid = /^09\d{9}$/.test(form.phone);
  const canSubmit  = form.fullName.trim().length > 2 && phoneValid;

  const updateField = (key: keyof typeof form, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = () => {
    if (!canSubmit) {
      toast({ title: "اطلاعات ناقص", description: "نام و شماره موبایل معتبر را وارد کنید", variant: "destructive" });
      return;
    }
    login({ fullName: form.fullName.trim(), phone: form.phone, email: form.email || undefined });
    toast({ title: "ثبت‌نام موفق 🎉", description: "حساب شما ایجاد شد" });
    router.push("/account");
  };

  return (
    <div className="container py-10 md:py-16 flex justify-center">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-3xl font-black text-primary tracking-tighter">NYTO</span>
          <p className="text-sm text-muted-foreground mt-1">ساخت حساب کاربری</p>
        </div>

        <div className="bg-card rounded-2xl border border-border/40 shadow-card p-6 animate-scale-in">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-center font-black text-lg mb-5">ثبت‌نام در نیتو</h1>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">نام و نام خانوادگی</label>
              <input
                type="text"
                placeholder="علی احمدی"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                className="w-full h-12 bg-surface rounded-xl border border-border/60 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">شماره موبایل</label>
              <input
                type="tel"
                dir="ltr"
                inputMode="numeric"
                placeholder="09123456789"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, "").slice(0, 11))}
                className="w-full h-12 bg-surface rounded-xl border border-border/60 px-4 text-sm text-center tracking-wider focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                ایمیل <span className="text-muted-foreground/70">(اختیاری)</span>
              </label>
              <input
                type="email"
                dir="ltr"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full h-12 bg-surface rounded-xl border border-border/60 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full mt-5 bg-primary text-white font-bold rounded-2xl py-3.5 text-sm active:scale-95 transition-transform shadow-primary disabled:opacity-50"
          >
            ثبت‌نام
          </button>

          <p className="text-center text-xs text-muted-foreground mt-4">
            قبلاً ثبت‌نام کرده‌اید؟{" "}
            <Link href="/login" className="text-primary font-bold">ورود</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
