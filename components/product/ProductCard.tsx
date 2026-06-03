"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, Plus, Star } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice, persianNumber } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  view?: "grid" | "list";
}

export function ProductCard({ product, view = "grid" }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({ title: "به سبد اضافه شد ✓", description: product.name });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /* ── List view ── */
  if (view === "list") {
    return (
      <Link href={`/products/${product.slug}`} className="block">
        <div className="flex gap-3 p-3 rounded-2xl bg-card shadow-card hover:shadow-card-lg transition-all duration-200 border border-border/40">
          <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-surface">
            <Image src={product.images[0]} alt={product.name} fill unoptimized className="object-cover" />
            {product.discount && (
              <div className="absolute top-1.5 right-1.5 bg-primary text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                {product.discount}٪
              </div>
            )}
          </div>
          <div className="flex flex-col flex-1 min-w-0 gap-1 py-0.5">
            <p className="text-xs text-muted-foreground">{product.brand}</p>
            <h3 className="font-semibold text-sm line-clamp-2 leading-snug">{product.name}</h3>
            <div className="flex items-center gap-1 mt-auto mb-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({persianNumber(product.reviewCount)})</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                {product.originalPrice && (
                  <p className="text-xs text-muted-foreground line-through leading-none">
                    {formatPrice(product.originalPrice)}
                  </p>
                )}
                <p className="text-sm font-bold text-primary">{formatPrice(product.price)}</p>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="bg-primary text-white rounded-xl px-3 py-1.5 text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform disabled:opacity-50 shadow-primary"
              >
                <Plus className="h-3.5 w-3.5" />
                افزودن
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  /* ── Grid view ── */
  return (
    <Link href={`/products/${product.slug}`} className="block group">
      <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-lg transition-all duration-300 border border-border/40 flex flex-col h-full">

        {/* Image */}
        <div className="relative aspect-square bg-surface overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Discount badge — top-right (start in RTL) */}
          {product.discount && (
            <div className="absolute top-2 right-2 bg-primary text-white text-[11px] font-black px-2 py-0.5 rounded-full shadow-sm leading-5">
              {persianNumber(product.discount)}٪
            </div>
          )}

          {/* New badge — top-left (end in RTL) */}
          {product.isNew && (
            <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm leading-5">
              جدید
            </div>
          )}

          {/* Wishlist — bottom-left */}
          <button
            onClick={handleWishlist}
            className={cn(
              "absolute bottom-2 left-2 w-7 h-7 bg-card/85 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-all duration-200",
              "opacity-0 group-hover:opacity-100"
            )}
          >
            <Heart className="h-3.5 w-3.5 text-muted-foreground" />
          </button>

          {/* Out of stock overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] flex items-center justify-center">
              <span className="text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-full">
                ناموجود
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col flex-1 gap-1.5">
          <p className="text-xs text-muted-foreground leading-none">{product.brand}</p>
          <h3 className="text-sm font-semibold line-clamp-2 leading-snug flex-1">
            {product.name}
          </h3>

          {/* Stars */}
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400 flex-shrink-0" />
            <span className="text-xs font-semibold">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({persianNumber(product.reviewCount)})</span>
          </div>

          {/* Price */}
          <div>
            {product.originalPrice && (
              <p className="text-xs text-muted-foreground line-through leading-none">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className="text-sm font-bold text-primary mt-0.5">{formatPrice(product.price)}</p>
          </div>

          {/* Add button — soft outlined */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full rounded-xl py-2 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform disabled:opacity-50 mt-0.5"
            style={{
              background: "hsl(var(--primary) / 0.08)",
              color: "hsl(var(--primary))",
              border: "1px solid hsl(var(--primary) / 0.25)",
            }}
          >
            <Plus className="h-3.5 w-3.5" />
            افزودن به سبد
          </button>
        </div>
      </div>
    </Link>
  );
}
