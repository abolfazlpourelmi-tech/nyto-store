"use client";
import { useState } from "react";
import { Check, UserCog } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { toast } from "@/hooks/use-toast";

export default function AccountProfilePage() {
  const user          = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  const [form, setForm] = useState({
    fullName:   user?.fullName ?? "",
    phone:      user?.phone ?? "",
    email:      user?.email ?? "",
    nationalId: user?.nationalId ?? "",
    birthDate:  user?.birthDate ?? "",
  });

  const updateField = (key: keyof typeof form, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    updateProfile(form);
    toast({ title: "ذخیره شد ✓", description: "اطلاعات حساب به‌روزرسانی شد" });
  };

  const fields: { key: keyof typeof form; label: string; placeholder: string; dir: "rtl" | "ltr"; disabled?: boolean }[] = [
    { key: "fullName",   label: "نام و نام خانوادگی", placeholder: "علی احمدی",      dir: "rtl" },
    { key: "phone",      label: "شماره موبایل",       placeholder: "۰۹۱۲...",        dir: "ltr", disabled: true },
    { key: "email",      label: "ایمیل",              placeholder: "you@example.com", dir: "ltr" },
    { key: "nationalId", label: "کد ملی",             placeholder: "۰۰۱۲۳۴۵۶۷۸",     dir: "ltr" },
    { key: "birthDate",  label: "تاریخ تولد",         placeholder: "۱۳۷۰/۰۱/۰۱",     dir: "ltr" },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-lg font-black">اطلاعات حساب</h1>

      <div className="bg-card rounded-2xl border border-border/40 shadow-card p-5">
        {/* Avatar header */}
        <div className="flex items-center gap-3 pb-5 mb-5 border-b border-border/40">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl flex-shrink-0">
            {form.fullName?.charAt(0) || <UserCog className="h-6 w-6" />}
          </div>
          <div>
            <p className="font-bold">{form.fullName || "کاربر نیتو"}</p>
            <p className="text-xs text-muted-foreground" dir="ltr">{form.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fields.map(({ key, label, placeholder, dir, disabled }) => (
            <div key={key}>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                {label}
                {disabled && <span className="text-[10px] text-muted-foreground/70 mr-1">(غیرقابل تغییر)</span>}
              </label>
              <input
                type="text"
                dir={dir}
                placeholder={placeholder}
                disabled={disabled}
                value={form[key]}
                onChange={(e) => updateField(key, e.target.value)}
                className="w-full h-11 bg-surface rounded-xl border border-border/60 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/50 transition-all placeholder:text-muted-foreground/60 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full sm:w-auto mt-5 bg-primary text-white font-bold rounded-2xl px-8 py-3 text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-primary"
        >
          <Check className="h-4 w-4" />
          ذخیره تغییرات
        </button>
      </div>
    </div>
  );
}
