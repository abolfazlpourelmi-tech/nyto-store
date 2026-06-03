"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, CreditCard, Banknote, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice, persianNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

const steps = ["ارسال", "پرداخت", "تأیید"];

export default function CheckoutPage() {
  const [step,          setStep]          = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [ordered,       setOrdered]       = useState(false);
  const [form,          setForm]          = useState({
    fullName: "", phone: "", province: "", city: "", address: "", postalCode: "",
  });

  const { items, total, clearCart, itemCount } = useCartStore();
  const count      = itemCount();
  const cartTotal  = total();
  const shipping   = cartTotal >= 500000 ? 0 : 50000;
  const grandTotal = cartTotal + shipping;

  const updateForm = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = () => { clearCart(); setOrdered(true); };

  if (count === 0 && !ordered) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground mb-4 text-sm">سبد خرید شما خالی است</p>
        <Link href="/products" className="bg-primary text-white font-bold rounded-2xl px-6 py-3 text-sm">
          برگشت به فروشگاه
        </Link>
      </div>
    );
  }

  if (ordered) {
    return (
      <div className="container py-20 flex flex-col items-center text-center gap-5 animate-scale-in">
        <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <Check className="h-12 w-12 text-white stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-2xl font-black mb-2">سفارش ثبت شد!</h1>
          <p className="text-sm text-muted-foreground max-w-xs">
            سفارش شما با موفقیت ثبت گردید. کد پیگیری به زودی ارسال می‌شود.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/"
            className="bg-primary text-white font-bold rounded-2xl px-5 py-3 text-sm active:scale-95 transition-transform"
          >
            بازگشت به خانه
          </Link>
          <Link href="/products"
            className="bg-surface border border-border/60 font-semibold rounded-2xl px-5 py-3 text-sm active:scale-95 transition-transform"
          >
            ادامه خرید
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 md:py-8">
      {/* Back */}
      <Link href="/cart" className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground mb-5 w-fit hover:text-foreground transition-colors">
        <ArrowRight className="h-4 w-4" />
        سبد خرید
      </Link>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-0 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300",
                i < step  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                : i === step ? "bg-primary text-white shadow-md shadow-primary/30"
                : "bg-surface border-2 border-border text-muted-foreground"
              )}>
                {i < step ? <Check className="h-4.5 w-4.5 stroke-[2.5]" /> : persianNumber(i + 1)}
              </div>
              <span className={cn(
                "text-[11px] font-semibold whitespace-nowrap",
                i === step ? "text-primary" : "text-muted-foreground"
              )}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn(
                "h-0.5 w-14 sm:w-20 mx-2 -mt-5 rounded-full transition-all duration-300",
                i < step ? "bg-emerald-500" : "bg-border"
              )} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── Step forms ── */}
        <div className="lg:col-span-2">

          {/* Step 0: Address */}
          {step === 0 && (
            <div className="bg-card rounded-2xl border border-border/40 shadow-card p-5 space-y-4 animate-fade-in">
              <h2 className="font-bold text-base">اطلاعات ارسال</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: "fullName",   label: "نام و نام خانوادگی", placeholder: "علی احمدی",    dir: "rtl" },
                  { key: "phone",      label: "شماره موبایل",       placeholder: "۰۹۱۲...",       dir: "ltr" },
                  { key: "province",   label: "استان",              placeholder: "تهران",         dir: "rtl" },
                  { key: "city",       label: "شهر",                placeholder: "تهران",         dir: "rtl" },
                  { key: "postalCode", label: "کد پستی",            placeholder: "۱۲۳۴۵...",      dir: "ltr" },
                ].map(({ key, label, placeholder, dir }) => (
                  <div key={key} className={key === "postalCode" ? "" : ""}>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">{label}</label>
                    <input
                      type="text"
                      placeholder={placeholder}
                      dir={dir}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => updateForm(key, e.target.value)}
                      className="w-full h-11 bg-surface rounded-xl border border-border/60 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/50 transition-all placeholder:text-muted-foreground/60"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">آدرس کامل</label>
                  <input
                    type="text"
                    placeholder="خیابان، کوچه، پلاک"
                    value={form.address}
                    onChange={(e) => updateForm("address", e.target.value)}
                    className="w-full h-11 bg-surface rounded-xl border border-border/60 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/50 transition-all placeholder:text-muted-foreground/60"
                  />
                </div>
              </div>
              <button
                onClick={() => setStep(1)}
                disabled={!form.fullName || !form.phone || !form.address}
                className="w-full bg-primary text-white font-bold rounded-2xl py-3.5 text-sm active:scale-95 transition-transform shadow-primary disabled:opacity-50 mt-2"
              >
                ادامه
              </button>
            </div>
          )}

          {/* Step 1: Payment */}
          {step === 1 && (
            <div className="bg-card rounded-2xl border border-border/40 shadow-card p-5 space-y-4 animate-fade-in">
              <h2 className="font-bold text-base">روش پرداخت</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: "online", icon: CreditCard, title: "پرداخت آنلاین",  sub: "درگاه امن بانکی" },
                  { key: "cod",    icon: Banknote,   title: "پرداخت در محل",  sub: "هنگام تحویل سفارش" },
                ].map(({ key, icon: Icon, title, sub }) => (
                  <button
                    key={key}
                    onClick={() => setPaymentMethod(key as "online" | "cod")}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 text-right",
                      paymentMethod === key
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border/60 hover:border-primary/30 bg-surface"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                      paymentMethod === key ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{title}</p>
                      <p className="text-xs text-muted-foreground">{sub}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(0)}
                  className="flex-1 bg-surface border border-border/60 font-semibold rounded-2xl py-3 text-sm"
                >
                  برگشت
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-primary text-white font-bold rounded-2xl py-3 text-sm active:scale-95 transition-transform shadow-primary"
                >
                  ادامه
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Confirm */}
          {step === 2 && (
            <div className="bg-card rounded-2xl border border-border/40 shadow-card p-5 space-y-4 animate-fade-in">
              <h2 className="font-bold text-base">تأیید سفارش</h2>

              <div className="bg-surface rounded-xl p-4 space-y-1.5 text-sm">
                <p className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-2">آدرس تحویل</p>
                <p className="font-semibold">{form.fullName} — {form.phone}</p>
                <p className="text-muted-foreground">{form.province}، {form.city}، {form.address}</p>
                {form.postalCode && <p className="text-muted-foreground text-xs">کد پستی: {form.postalCode}</p>}
              </div>

              <div className="bg-surface rounded-xl p-4 text-sm">
                <p className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-2">روش پرداخت</p>
                <p className="font-semibold">
                  {paymentMethod === "online" ? "پرداخت آنلاین (درگاه بانکی)" : "پرداخت در محل"}
                </p>
              </div>

              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.product.name} × {persianNumber(item.quantity)}</span>
                    <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(1)} className="flex-1 bg-surface border border-border/60 font-semibold rounded-2xl py-3 text-sm">
                  برگشت
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-primary text-white font-bold rounded-2xl py-3 text-sm active:scale-95 transition-transform shadow-primary"
                >
                  {paymentMethod === "online" ? "پرداخت آنلاین" : "ثبت سفارش"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Order summary sidebar ── */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-2xl border border-border/40 shadow-card p-5 space-y-3 sticky top-24">
            <h3 className="font-bold text-sm text-muted-foreground">خلاصه سفارش</h3>
            <div className="space-y-2 text-sm max-h-40 overflow-y-auto no-scrollbar">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between gap-2">
                  <span className="text-muted-foreground line-clamp-1 text-xs">{item.product.name}</span>
                  <span className="flex-shrink-0 text-xs font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border/60 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>کالاها</span><span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>ارسال</span>
                <span className={shipping === 0 ? "text-emerald-600 font-bold" : ""}>
                  {shipping === 0 ? "رایگان" : formatPrice(shipping)}
                </span>
              </div>
            </div>
            <div className="border-t border-border/60 pt-3 flex justify-between items-center">
              <span className="font-bold text-sm">جمع کل</span>
              <span className="font-black text-primary text-lg">{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
