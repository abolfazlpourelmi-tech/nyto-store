import { HeroBanner }      from "@/components/home/HeroBanner";
import { CategorySlider }  from "@/components/home/CategorySlider";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ProductRow }      from "@/components/home/ProductRow";
import { AboutSection }    from "@/components/home/AboutSection";
import { ProductCard }     from "@/components/product/ProductCard";
import { products }        from "@/lib/mock-data";
import Link                from "next/link";
import { ChevronLeft, Truck, Shield, RotateCcw, Headphones } from "lucide-react";

const perks = [
  { icon: Truck,      title: "ارسال سریع",     desc: "کمتر از ۴۸ ساعت"   },
  { icon: Shield,     title: "ضمانت اصالت",    desc: "محصولات ۱۰۰٪ اصل"  },
  { icon: RotateCcw,  title: "۷ روز مرجوعی",  desc: "بازگشت بدون دردسر" },
  { icon: Headphones, title: "پشتیبانی ۲۴/۷", desc: "همیشه در کنار شما" },
];

export default function HomePage() {
  return (
    <div className="container py-4 md:py-8 space-y-7 md:space-y-10">

      {/* ── Hero ── */}
      <HeroBanner />

      {/* ── Categories ── */}
      <CategorySlider />

      {/* ── Special offers (orange header + countdown + horizontal cards) ── */}
      <FeaturedProducts />

      {/* ── Promo banners strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-2xl bg-gradient-to-l from-orange-500 to-rose-500 p-5 text-white relative overflow-hidden">
          <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-white/10" />
          <p className="text-xs font-semibold opacity-80 mb-1">تا ۳۰٪ تخفیف</p>
          <h3 className="font-black text-lg leading-snug">فروش ویژه<br />گوشی و لپ‌تاپ</h3>
        </div>
        <div className="rounded-2xl bg-gradient-to-l from-violet-600 to-blue-600 p-5 text-white relative overflow-hidden">
          <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-white/10" />
          <p className="text-xs font-semibold opacity-80 mb-1">ارسال رایگان</p>
          <h3 className="font-black text-lg leading-snug">خریدهای<br />بالای ۵۰۰ هزار تومان</h3>
        </div>
      </div>

      {/* ── 1. جدیدترین محصولات ── */}
      <ProductRow
        title="جدیدترین محصولات"
        products={products.filter((p) => p.isNew)}
        viewAllHref="/products?sort=newest"
        accentColor="#22c55e"
        badge={{ label: "جدید", bg: "#22c55e", color: "#fff" }}
      />

      {/* ── 2. پرفروش‌ترین‌ها ── */}
      <ProductRow
        title="پرفروش‌ترین‌ها"
        products={[...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 10)}
        viewAllHref="/products?sort=bestselling"
        accentColor="#ef4444"
        badge={{ label: "پرفروش 🔥", bg: "linear-gradient(to left,#e55f00,#ef4444)", color: "#fff" }}
      />

      {/* ── 3. محبوب‌ترین‌ها ── */}
      <ProductRow
        title="محبوب‌ترین‌ها"
        products={[...products].sort((a, b) => b.rating - a.rating).slice(0, 10)}
        viewAllHref="/products?sort=rating"
        accentColor="#a855f7"
        badge={{ label: "♡ محبوب", bg: "linear-gradient(to left,#7c3aed,#ec4899)", color: "#fff" }}
      />

      {/* ── 4. ویژه شما ── */}
      <ProductRow
        title="ویژه شما"
        products={products.filter((p) => p.isFeatured)}
        viewAllHref="/products"
        accentColor="#3b82f6"
        badge={{ label: "پیشنهاد ویژه", bg: "linear-gradient(to left,#1d4ed8,#0ea5e9)", color: "#fff" }}
      />

      {/* ── 5. همه محصولات (grid) ── */}
      <section>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "4px", height: "22px", background: "hsl(var(--primary))", borderRadius: "3px" }} />
            <h2 style={{ fontSize: "15px", fontWeight: 800, margin: 0 }}>همه محصولات</h2>
          </div>
          <Link
            href="/products"
            style={{ display: "flex", alignItems: "center", gap: "2px", fontSize: "12px", fontWeight: 700, color: "hsl(var(--muted-foreground))", textDecoration: "none" }}
          >
            مشاهده همه
            <ChevronLeft style={{ width: "14px", height: "14px" }} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── Perks strip — 2-col mobile / 4-col desktop ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {perks.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-card border border-border/40 rounded-2xl shadow-card"
            style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", padding: "12px" }}
          >
            <div
              style={{
                flexShrink: 0, width: "36px", height: "36px", borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                backgroundColor: "hsl(var(--primary) / 0.1)",
              }}
            >
              <Icon style={{ width: "16px", height: "16px", color: "hsl(var(--primary))" }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: "12px", fontWeight: 700, lineHeight: 1.3, margin: 0 }}>{title}</p>
              <p
                className="hidden md:block"
                style={{ fontSize: "11px", color: "hsl(var(--muted-foreground))", margin: 0, marginTop: "2px" }}
              >
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── About + trust badges ── */}
      <AboutSection />

    </div>
  );
}
