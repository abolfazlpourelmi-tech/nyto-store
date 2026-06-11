"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const channels = [
  { icon: Phone, title: "تلفن پشتیبانی", value: "۰۲۱-۱۲۳۴۵۶۷۸", dir: "ltr" },
  { icon: Mail,  title: "ایمیل",          value: "info@nytostore.ir", dir: "ltr" },
  { icon: MapPin, title: "آدرس",          value: "تهران، خیابان ولیعصر، پلاک ۱۲۳", dir: "rtl" },
  { icon: Clock, title: "ساعات کاری",    value: "شنبه تا پنجشنبه، ۹ تا ۱۸", dir: "rtl" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const updateField = (key: keyof typeof form, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const canSend = form.name.trim() && form.message.trim();

  const handleSend = () => {
    if (!canSend) {
      toast({ title: "اطلاعات ناقص", description: "نام و متن پیام را وارد کنید", variant: "destructive" });
      return;
    }
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    toast({ title: "پیام ارسال شد ✓", description: "به‌زودی با شما تماس می‌گیریم" });
  };

  return (
    <div className="container py-6 md:py-10 max-w-4xl">
      <div className="mb-7">
        <h1 className="text-2xl font-black mb-2">تماس با ما</h1>
        <p className="text-sm text-muted-foreground">
          سوال یا پیشنهادی دارید؟ از راه‌های زیر با ما در ارتباط باشید.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Channels */}
        <div className="lg:col-span-2 space-y-3">
          {channels.map(({ icon: Icon, title, value, dir }) => (
            <div key={title} className="flex items-center gap-3 bg-card rounded-2xl border border-border/40 shadow-card p-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">{title}</p>
                <p className="font-bold text-sm" dir={dir}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-2xl border border-border/40 shadow-card p-5">
            {sent ? (
              <div className="py-10 flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="h-8 w-8 text-white stroke-[2.5]" />
                </div>
                <h2 className="font-black text-lg">پیام شما ثبت شد</h2>
                <p className="text-sm text-muted-foreground">کارشناسان ما در اسرع وقت پاسخ می‌دهند.</p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm font-bold text-primary mt-1"
                >
                  ارسال پیام جدید
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-bold text-base mb-4">ارسال پیام</h2>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">نام شما</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className="w-full h-11 bg-surface rounded-xl border border-border/60 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">ایمیل</label>
                      <input
                        type="email"
                        dir="ltr"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="w-full h-11 bg-surface rounded-xl border border-border/60 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">موضوع</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => updateField("subject", e.target.value)}
                      className="w-full h-11 bg-surface rounded-xl border border-border/60 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">متن پیام</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className="w-full bg-surface rounded-xl border border-border/60 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/50 transition-all resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    className="w-full bg-primary text-white font-bold rounded-2xl py-3.5 text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-primary"
                  >
                    <Send className="h-4 w-4" />
                    ارسال پیام
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
