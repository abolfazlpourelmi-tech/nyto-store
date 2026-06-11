import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Shield, Target, Heart } from "lucide-react";

export const metadata: Metadata = { title: "درباره ما" };

const stats = [
  { value: "+۱۰۰۰", label: "محصول متنوع"   },
  { value: "+۵۰هزار", label: "مشتری راضی"  },
  { value: "۹۸٪",   label: "رضایت خرید"    },
  { value: "۲۴/۷",  label: "پشتیبانی"      },
];

const values = [
  { icon: Target,  title: "اصالت کالا",       desc: "تمام محصولات اورجینال و دارای گارانتی رسمی هستند." },
  { icon: Truck,   title: "ارسال سریع",       desc: "تحویل سفارش‌ها در کمتر از ۴۸ ساعت به سراسر کشور." },
  { icon: Shield,  title: "خرید امن",         desc: "پرداخت از طریق درگاه‌های بانکی معتبر و امن." },
  { icon: Heart,   title: "رضایت مشتری",      desc: "تیم پشتیبانی همیشه در کنار شماست." },
];

export default function AboutPage() {
  return (
    <div className="container py-6 md:py-10 max-w-4xl">
      {/* Hero */}
      <div className="bg-gradient-to-l from-primary to-orange-400 rounded-3xl p-7 md:p-10 text-white relative overflow-hidden mb-8">
        <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 left-20 w-28 h-28 rounded-full bg-white/5" />
        <span className="text-3xl font-black tracking-tighter">NYTO</span>
        <h1 className="text-2xl md:text-3xl font-black mt-3 mb-2">داستان نیتو استور</h1>
        <p className="text-sm md:text-base opacity-90 leading-relaxed max-w-xl">
          نیتو با هدف ساده‌تر کردن خرید آنلاین و دسترسی همه به کالای اصل با قیمت منصفانه راه‌اندازی شد.
        </p>
      </div>

      {/* Intro */}
      <section className="bg-card rounded-2xl border border-border/40 shadow-card p-6 mb-6">
        <h2 className="font-black text-lg mb-3">ما که هستیم؟</h2>
        <p className="text-sm text-muted-foreground leading-loose">
          فروشگاه اینترنتی نیتو از سال ۱۳۹۸ فعالیت خود را آغاز کرد و امروز به یکی از مراجع خرید آنلاین
          در حوزه کالای دیجیتال، لوازم خانگی، پوشاک و زیبایی تبدیل شده است. ما باور داریم که خرید آنلاین
          باید سریع، مطمئن و لذت‌بخش باشد؛ به همین دلیل تمام تلاش خود را برای ارائه بهترین تجربه به مشتریان
          به کار می‌گیریم.
        </p>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-2xl border border-border/40 shadow-card p-5 text-center">
            <p className="text-2xl font-black text-primary">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Values */}
      <h2 className="font-black text-lg mb-4">ارزش‌های ما</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {values.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3 bg-card rounded-2xl border border-border/40 shadow-card p-5">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-bold text-sm mb-1">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-surface rounded-2xl border border-border/40 p-6 text-center">
        <h3 className="font-black text-lg mb-2">آماده خرید هستید؟</h3>
        <p className="text-sm text-muted-foreground mb-4">هزاران محصول اصل با بهترین قیمت منتظر شماست.</p>
        <Link
          href="/products"
          className="inline-flex bg-primary text-white font-bold rounded-2xl px-7 py-3 text-sm active:scale-95 transition-transform shadow-primary"
        >
          مشاهده محصولات
        </Link>
      </div>
    </div>
  );
}
