"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Star, ShoppingCart, Heart, Truck, Shield, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart";
import { formatPrice, persianNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { products } from "@/lib/mock-data";
import { ProductCard } from "@/components/product/ProductCard";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.slug === params.id);
  if (!product) notFound();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity,      setQuantity]      = useState(1);
  const [activeTab,     setActiveTab]     = useState<"desc" | "spec">("desc");
  const addItem = useCartStore((s) => s.addItem);

  const related = products
    .filter((p) => p.category.id === product.category.id && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({ title: "به سبد اضافه شد ✓", description: product.name });
  };

  return (
    <div className="pb-36 md:pb-8">
      {/* ── Breadcrumb (desktop) / Back (mobile) ── */}
      <div className="container pt-3 pb-2">
        <nav className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">خانه</Link>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <Link href="/products" className="hover:text-foreground transition-colors">محصولات</Link>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <Link href={`/products?category=${product.category.slug}`} className="hover:text-foreground transition-colors">
            {product.category.name}
          </Link>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <span className="text-foreground font-medium truncate max-w-[180px]">{product.name}</span>
        </nav>
        <Link href="/products" className="md:hidden flex items-center gap-1 text-sm font-semibold text-muted-foreground w-fit hover:text-foreground transition-colors">
          <ArrowRight className="h-4 w-4" />
          بازگشت
        </Link>
      </div>

      {/* ── Image + Info grid ── */}
      <div className="md:container">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 md:items-start">

          {/* ── Images ── */}
          <div className="-mx-4 md:mx-0">
            {/* Main image — full-bleed on mobile */}
            <div className="relative h-72 sm:h-80 md:h-auto md:aspect-square md:rounded-2xl overflow-hidden bg-surface">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                unoptimized
                className="object-cover"
                priority
              />
              {product.discount && (
                <div className="absolute top-4 right-4 bg-primary text-white text-sm font-black px-3 py-1 rounded-full shadow-primary">
                  {persianNumber(product.discount)}٪ تخفیف
                </div>
              )}
              {product.isNew && (
                <div className="absolute top-4 left-4 bg-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  جدید
                </div>
              )}
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 px-4 md:px-0 mt-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200",
                      i === selectedImage
                        ? "border-primary scale-105 shadow-primary"
                        : "border-border/60 hover:border-primary/40"
                    )}
                  >
                    <Image src={img} alt="" fill unoptimized className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product info ── */}
          <div className="container md:px-0 pt-4 md:pt-0 space-y-4">
            <div>
              <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-2">
                {product.brand}
              </span>
              <h1 className="text-xl md:text-2xl font-black leading-snug">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={cn(
                      "h-4 w-4",
                      s <= Math.round(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-border text-border"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-bold">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({persianNumber(product.reviewCount)} نظر)</span>
            </div>

            <Separator />

            {/* Price */}
            <div>
              {product.originalPrice && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {persianNumber(product.discount ?? 0)}٪ تخفیف
                  </span>
                </div>
              )}
              <p className="text-3xl font-black text-primary">{formatPrice(product.price)}</p>
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-xl",
                  product.stock > 0
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "bg-red-500/10 text-red-500"
                )}
              >
                <span className={cn(
                  "w-2 h-2 rounded-full",
                  product.stock > 0 ? "bg-emerald-500 animate-pulse" : "bg-red-500"
                )} />
                {product.stock > 0
                  ? `موجود در انبار — ${persianNumber(product.stock)} عدد`
                  : "ناموجود"}
              </span>
            </div>

            {/* Perks */}
            <div className="flex gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-surface rounded-xl px-3 py-2">
                <Truck className="h-3.5 w-3.5 text-primary" />
                ارسال سریع
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-surface rounded-xl px-3 py-2">
                <Shield className="h-3.5 w-3.5 text-primary" />
                ضمانت اصالت
              </div>
            </div>

            {/* Desktop add to cart */}
            {product.stock > 0 && (
              <div className="hidden md:flex items-center gap-3 pt-2">
                <div className="flex items-center bg-surface rounded-xl border border-border/60 overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-11 flex items-center justify-center text-lg font-bold hover:bg-muted transition-colors"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-bold">{persianNumber(quantity)}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-10 h-11 flex items-center justify-center text-lg font-bold hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white font-bold rounded-2xl h-11 flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-primary"
                >
                  <ShoppingCart className="h-4 w-4" />
                  افزودن به سبد خرید
                </button>
                <button className="w-11 h-11 rounded-2xl border-2 border-border flex items-center justify-center hover:border-primary/50 transition-colors">
                  <Heart className="h-4.5 w-4.5 text-muted-foreground" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Tabs: description & specs ── */}
      <div className="container mt-8 space-y-4">
        {/* Tab bar */}
        <div className="flex gap-1 bg-surface rounded-2xl p-1 w-fit">
          {[
            { key: "desc", label: "توضیحات" },
            { key: "spec", label: "مشخصات فنی" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as "desc" | "spec")}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                activeTab === key
                  ? "bg-card shadow-card text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "desc" && (
          <div className="bg-card rounded-2xl p-5 shadow-card border border-border/40 animate-fade-in">
            <p className="text-sm text-muted-foreground leading-loose">{product.description}</p>
          </div>
        )}

        {activeTab === "spec" && product.specifications && (
          <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/40 animate-fade-in">
            {Object.entries(product.specifications).map(([key, val], i) => (
              <div
                key={key}
                className={cn(
                  "flex justify-between items-center px-5 py-3 text-sm",
                  i % 2 === 0 ? "bg-surface/60" : ""
                )}
              >
                <span className="text-muted-foreground">{key}</span>
                <span className="font-semibold">{val}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Related products ── */}
      {related.length > 0 && (
        <div className="container mt-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-5 bg-primary rounded-full inline-block" />
            <h2 className="text-base font-bold">محصولات مشابه</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* ── Floating CTA (mobile only) ── */}
      <div className="fixed bottom-16 inset-x-0 z-40 md:hidden bg-card/95 backdrop-blur-md border-t border-border/50 px-4 py-3 animate-slide-up">
        <div className="flex items-center gap-3">
          {product.stock > 0 ? (
            <>
              <div className="flex items-center bg-surface rounded-xl border border-border/60 overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-11 flex items-center justify-center text-xl font-bold"
                >
                  −
                </button>
                <span className="w-9 text-center text-sm font-bold">{persianNumber(quantity)}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="w-10 h-11 flex items-center justify-center text-xl font-bold"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white font-bold rounded-2xl h-12 flex items-center justify-center gap-2 text-sm active:scale-95 transition-transform shadow-primary"
              >
                <ShoppingCart className="h-4 w-4" />
                افزودن — {formatPrice(product.price * quantity)}
              </button>
            </>
          ) : (
            <div className="flex-1 bg-muted text-muted-foreground font-bold rounded-2xl h-12 flex items-center justify-center text-sm">
              این محصول ناموجود است
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
