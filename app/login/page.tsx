"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Smartphone, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { toast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router  = useRouter();
  const login   = useAuthStore((s) => s.login);

  const [step,  setStep]  = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp,   setOtp]   = useState(["", "", "", ""]);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const phoneValid = /^09\d{9}$/.test(phone);

  const sendCode = () => {
    if (!phoneValid) {
      toast({ title: "شماره نامعتبر", description: "شماره موبایل را درست وارد کنید", variant: "destructive" });
      return;
    }
    setStep("otp");
    toast({ title: "کد ارسال شد", description: `کد تأیید به ${phone} پیامک شد (نمونه: ۱۲۳۴)` });
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (i: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    setOtp((prev) => {
      const next = [...prev];
      next[i] = digit;
      return next;
    });
    if (digit && i < 3) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const verify = () => {
    if (otp.join("").length < 4) {
      toast({ title: "کد ناقص", description: "کد ۴ رقمی را کامل وارد کنید", variant: "destructive" });
      return;
    }
    login({ fullName: "کاربر نیتو", phone });
    toast({ title: "خوش آمدید 👋", description: "با موفقیت وارد شدید" });
    router.push("/account");
  };

  return (
    <div className="container py-10 md:py-16 flex justify-center">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-3xl font-black text-primary tracking-tighter">NYTO</span>
          <p className="text-sm text-muted-foreground mt-1">ورود به حساب کاربری</p>
        </div>

        <div className="bg-card rounded-2xl border border-border/40 shadow-card p-6 animate-scale-in">
          {step === "phone" ? (
            <>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-center font-black text-lg mb-1">شماره موبایل</h1>
              <p className="text-center text-xs text-muted-foreground mb-5">
                کد تأیید برای شما پیامک خواهد شد
              </p>

              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">شماره موبایل</label>
              <input
                type="tel"
                dir="ltr"
                inputMode="numeric"
                placeholder="09123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                onKeyDown={(e) => e.key === "Enter" && sendCode()}
                className="w-full h-12 bg-surface rounded-xl border border-border/60 px-4 text-sm text-center tracking-wider focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
              />

              <button
                onClick={sendCode}
                disabled={!phoneValid}
                className="w-full mt-4 bg-primary text-white font-bold rounded-2xl py-3.5 text-sm active:scale-95 transition-transform shadow-primary disabled:opacity-50"
              >
                ارسال کد تأیید
              </button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                حساب کاربری ندارید؟{" "}
                <Link href="/register" className="text-primary font-bold">ثبت‌نام</Link>
              </p>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep("phone")}
                className="flex items-center gap-1 text-xs font-semibold text-muted-foreground mb-4 hover:text-foreground transition-colors"
              >
                <ArrowRight className="h-3.5 w-3.5" />
                تغییر شماره
              </button>

              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-center font-black text-lg mb-1">کد تأیید</h1>
              <p className="text-center text-xs text-muted-foreground mb-5">
                کد ارسال‌شده به <span className="font-bold text-foreground" dir="ltr">{phone}</span> را وارد کنید
              </p>

              {/* OTP boxes */}
              <div dir="ltr" className="flex justify-center gap-2.5 mb-5">
                {otp.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKey(i, e)}
                    className="w-12 h-14 bg-surface rounded-xl border border-border/60 text-center text-xl font-black focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                ))}
              </div>

              <button
                onClick={verify}
                className="w-full bg-primary text-white font-bold rounded-2xl py-3.5 text-sm active:scale-95 transition-transform shadow-primary"
              >
                ورود
              </button>

              <button
                onClick={() => toast({ title: "کد مجدد ارسال شد", description: "نمونه: ۱۲۳۴" })}
                className="w-full text-center text-xs text-muted-foreground mt-4 hover:text-foreground transition-colors"
              >
                ارسال مجدد کد
              </button>
            </>
          )}
        </div>

        <p className="text-center text-[11px] text-muted-foreground mt-5 leading-relaxed px-4">
          با ورود، {" "}
          <Link href="/terms" className="text-primary">قوانین و مقررات</Link> و{" "}
          <Link href="/privacy" className="text-primary">حریم خصوصی</Link> را می‌پذیرید.
        </p>
      </div>
    </div>
  );
}
