"use client";
import { useState } from "react";
import { MapPin, Plus, Trash2, Pencil, Check, X, Star } from "lucide-react";
import { useAddressStore } from "@/store/address";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import type { Address } from "@/types";

const emptyForm = {
  fullName: "", phone: "", province: "", city: "", address: "", postalCode: "",
};

type FormState = typeof emptyForm;

export default function AccountAddressesPage() {
  const addresses    = useAddressStore((s) => s.addresses);
  const addAddress   = useAddressStore((s) => s.addAddress);
  const updateAddress = useAddressStore((s) => s.updateAddress);
  const removeAddress = useAddressStore((s) => s.removeAddress);
  const setDefault   = useAddressStore((s) => s.setDefault);

  const [showForm, setShowForm] = useState(false);
  const [editId,   setEditId]   = useState<string | null>(null);
  const [form,     setForm]     = useState<FormState>(emptyForm);

  const updateField = (key: keyof FormState, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (a: Address) => {
    setForm({
      fullName: a.fullName, phone: a.phone, province: a.province,
      city: a.city, address: a.address, postalCode: a.postalCode,
    });
    setEditId(a.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.fullName || !form.phone || !form.address) {
      toast({ title: "اطلاعات ناقص", description: "نام، موبایل و آدرس الزامی است", variant: "destructive" });
      return;
    }
    if (editId) {
      updateAddress(editId, form);
      toast({ title: "ویرایش شد", description: "آدرس با موفقیت به‌روزرسانی شد" });
    } else {
      addAddress(form);
      toast({ title: "اضافه شد", description: "آدرس جدید ثبت شد" });
    }
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
  };

  const handleRemove = (id: string) => {
    removeAddress(id);
    toast({ title: "حذف شد", description: "آدرس حذف گردید" });
  };

  const fields: { key: keyof FormState; label: string; placeholder: string; dir: "rtl" | "ltr"; full?: boolean }[] = [
    { key: "fullName",   label: "نام و نام خانوادگی", placeholder: "علی احمدی",   dir: "rtl" },
    { key: "phone",      label: "شماره موبایل",       placeholder: "۰۹۱۲...",      dir: "ltr" },
    { key: "province",   label: "استان",              placeholder: "تهران",        dir: "rtl" },
    { key: "city",       label: "شهر",                placeholder: "تهران",        dir: "rtl" },
    { key: "postalCode", label: "کد پستی",            placeholder: "۱۲۳۴۵...",     dir: "ltr" },
    { key: "address",    label: "آدرس کامل",          placeholder: "خیابان، کوچه، پلاک", dir: "rtl", full: true },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-black">آدرس‌های من</h1>
        {!showForm && (
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-primary text-white font-bold rounded-xl px-3.5 py-2 text-xs active:scale-95 transition-transform shadow-primary"
          >
            <Plus className="h-4 w-4" />
            افزودن آدرس
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-card rounded-2xl border border-border/40 shadow-card p-5 space-y-4 animate-scale-in">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base">{editId ? "ویرایش آدرس" : "آدرس جدید"}</h2>
            <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-xl bg-surface flex items-center justify-center">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fields.map(({ key, label, placeholder, dir, full }) => (
              <div key={key} className={full ? "sm:col-span-2" : ""}>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">{label}</label>
                <input
                  type="text"
                  dir={dir}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => updateField(key, e.target.value)}
                  className="w-full h-11 bg-surface rounded-xl border border-border/60 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/50 transition-all placeholder:text-muted-foreground/60"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-primary text-white font-bold rounded-2xl py-3 text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-primary"
            >
              <Check className="h-4 w-4" />
              ذخیره آدرس
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-surface border border-border/60 font-semibold rounded-2xl px-5 py-3 text-sm"
            >
              انصراف
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {addresses.length === 0 && !showForm && (
        <div className="bg-card rounded-2xl border border-border/40 shadow-card py-16 flex flex-col items-center text-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-surface flex items-center justify-center">
            <MapPin className="h-9 w-9 text-muted-foreground/50" />
          </div>
          <div>
            <h2 className="font-black text-lg mb-1">آدرسی ثبت نشده است</h2>
            <p className="text-sm text-muted-foreground">برای تحویل سریع‌تر سفارش، آدرس خود را اضافه کنید.</p>
          </div>
          <button
            onClick={openAdd}
            className="bg-primary text-white font-bold rounded-2xl px-6 py-3 text-sm flex items-center gap-2 active:scale-95 transition-transform shadow-primary"
          >
            <Plus className="h-4 w-4" />
            افزودن آدرس
          </button>
        </div>
      )}

      {/* Address list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {addresses.map((a) => (
          <div
            key={a.id}
            className={cn(
              "bg-card rounded-2xl border shadow-card p-4 relative",
              a.isDefault ? "border-primary/50" : "border-border/40"
            )}
          >
            {a.isDefault && (
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                <Star className="h-3 w-3 fill-primary" />
                پیش‌فرض
              </span>
            )}
            <div className="flex items-start gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center flex-shrink-0">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm">{a.fullName}</p>
                <p className="text-xs text-muted-foreground" dir="ltr">{a.phone}</p>
              </div>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {a.province}، {a.city}، {a.address}
            </p>
            {a.postalCode && (
              <p className="text-xs text-muted-foreground mt-1">کد پستی: {a.postalCode}</p>
            )}

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/40">
              {!a.isDefault && (
                <button
                  onClick={() => setDefault(a.id)}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  انتخاب به‌عنوان پیش‌فرض
                </button>
              )}
              <div className="flex items-center gap-1.5 mr-auto">
                <button
                  onClick={() => openEdit(a)}
                  className="w-8 h-8 rounded-xl bg-surface flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="ویرایش"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleRemove(a.id)}
                  className="w-8 h-8 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                  aria-label="حذف"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
