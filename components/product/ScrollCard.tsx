"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus, ImageOff } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice, persianNumber } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import type { Product } from "@/types";

export interface CardBadge {
  label: string;
  bg: string;
  color: string;
}

interface ScrollCardProps {
  product: Product;
  badge?: CardBadge;
}

/*
  Fixed card anatomy — mobile 162×320 px, desktop (md+) 210×410 px:
  ┌────────────────────────┐  ← card top
  │  IMAGE   148/190 px    │  flexShrink: 0
  ├────────────────────────┤
  │  brand   ~14/17 px     │  padding-top
  │  title   38/48 px      │  overflow hidden, line-clamp 2
  │  stars   ~14/17 px     │
  │  price   32/42 px      │  old-price always rendered (visibility:hidden if none)
  │  ──────  auto spacer   │  pushes button to bottom
  │  [+ افزودن]            │
  └────────────────────────┘
*/

export function ScrollCard({ product, badge }: ScrollCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({ title: "به سبد اضافه شد ✓", description: product.name });
  };

  return (
    <Link href={`/products/${product.slug}`} style={{ display: "block", textDecoration: "none", flexShrink: 0 }}>
      <div
        className="w-[162px] h-[320px] md:w-[210px] md:h-[410px] hover:shadow-card-lg hover:-translate-y-0.5"
        style={{
          borderRadius: "16px",
          border: "1px solid hsl(var(--border) / 0.4)",
          background: "hsl(var(--card))",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "box-shadow 0.2s, transform 0.2s",
        }}
      >
        {/* ── Image — fixed 148/190 px ── */}
        <div
          className="w-[162px] h-[148px] md:w-[210px] md:h-[190px]"
          style={{
            position: "relative",
            flexShrink: 0,
            background: "hsl(var(--surface))",
            overflow: "hidden",
          }}
        >
          {imgFailed ? (
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              <ImageOff style={{ width: "28px", height: "28px", color: "hsl(var(--border))" }} />
            </div>
          ) : (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              unoptimized
              style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
              className="hover:scale-105"
              onError={() => setImgFailed(true)}
            />
          )}

          {/* Section badge — TOP-RIGHT */}
          {badge && (
            <div
              className="text-[10px] md:text-xs px-2 md:px-2.5"
              style={{
                position: "absolute", top: "8px", right: "8px",
                background: badge.bg, color: badge.color,
                fontWeight: 800, borderRadius: "999px",
                lineHeight: "16px", whiteSpace: "nowrap",
              }}
            >
              {badge.label}
            </div>
          )}

          {/* Discount badge — TOP-LEFT */}
          {product.discount && (
            <div
              className="text-[10px] md:text-xs px-[7px] md:px-2.5"
              style={{
                position: "absolute", top: "8px", left: "8px",
                background: "#FF6B00", color: "#fff",
                fontWeight: 800, borderRadius: "999px",
                lineHeight: "16px",
              }}
            >
              {persianNumber(product.discount)}٪
            </div>
          )}

          {product.stock === 0 && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="text-xs md:text-sm" style={{ color: "#fff", fontWeight: 700, background: "rgba(0,0,0,0.5)", padding: "4px 12px", borderRadius: "999px" }}>ناموجود</span>
            </div>
          )}
        </div>

        {/* ── Content — fills remaining space ── */}
        <div
          className="p-[10px_12px_12px] md:p-4"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          {/* Brand */}
          <p className="text-[10px] md:text-xs" style={{ color: "hsl(var(--muted-foreground))", margin: 0, lineHeight: 1.4, flexShrink: 0 }}>
            {product.brand}
          </p>

          {/* Title — FIXED height, never grows */}
          <p
            className="text-xs md:text-sm h-[38px] md:h-[48px] line-clamp-2"
            style={{
              fontWeight: 600, lineHeight: 1.45,
              margin: "3px 0 0", flexShrink: 0,
            }}
          >
            {product.name}
          </p>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "3px", marginTop: "5px", flexShrink: 0 }}>
            <Star className="h-2.5 w-2.5 md:h-3 md:w-3" style={{ fill: "#fbbf24", color: "#fbbf24", flexShrink: 0 }} />
            <span className="text-[10px] md:text-xs" style={{ fontWeight: 700 }}>{product.rating}</span>
            <span className="text-[10px] md:text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>({persianNumber(product.reviewCount)})</span>
          </div>

          {/* Price block — FIXED height, old-price always occupies space */}
          <div className="h-8 md:h-[42px]" style={{ marginTop: "5px", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {/* Always rendered — invisible when no originalPrice so height stays the same */}
            <p
              className="text-[10px] md:text-xs"
              style={{
                color: "hsl(var(--muted-foreground))", textDecoration: "line-through",
                margin: 0, lineHeight: 1.4,
                visibility: product.originalPrice ? "visible" : "hidden",
              }}
            >
              {product.originalPrice ? formatPrice(product.originalPrice) : "—"}
            </p>
            <p className="text-xs md:text-base" style={{ fontWeight: 800, color: "hsl(var(--primary))", margin: 0, lineHeight: 1.3 }}>
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Spacer — pushes button to bottom */}
          <div style={{ flex: 1 }} />

          {/* Add-to-cart button — always at bottom */}
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="text-[11px] md:text-sm py-[7px] md:py-2.5"
            style={{
              width: "100%",
              background: "hsl(var(--primary) / 0.07)",
              color: "hsl(var(--primary))",
              border: "1px solid hsl(var(--primary) / 0.25)",
              borderRadius: "10px",
              fontWeight: 700,
              cursor: product.stock === 0 ? "not-allowed" : "pointer",
              opacity: product.stock === 0 ? 0.5 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              flexShrink: 0,
            }}
          >
            <Plus className="h-[11px] w-[11px] md:h-3.5 md:w-3.5" />
            افزودن
          </button>
        </div>
      </div>
    </Link>
  );
}
