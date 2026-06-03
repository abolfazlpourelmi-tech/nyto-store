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
  Fixed card anatomy (total 320 px):
  ┌────────────────────────┐  ← card top
  │  IMAGE   148 px        │  flexShrink: 0
  ├────────────────────────┤
  │  brand   ~14 px        │  padding-top: 10px
  │  title   38 px fixed   │  overflow hidden, line-clamp 2
  │  stars   ~14 px        │
  │  price   32 px fixed   │  old-price always rendered (visibility:hidden if none)
  │  ──────  auto spacer   │  pushes button to bottom
  │  [+ افزودن]  30 px     │  padding-bottom: 12px
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
        style={{
          width: "162px",
          height: "320px",          /* ← FIXED total height */
          borderRadius: "16px",
          border: "1px solid hsl(var(--border) / 0.4)",
          background: "hsl(var(--card))",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "box-shadow 0.2s, transform 0.2s",
        }}
        className="hover:shadow-card-lg hover:-translate-y-0.5"
      >
        {/* ── Image — fixed 148 px ── */}
        <div
          style={{
            position: "relative",
            width: "162px",
            height: "148px",        /* ← FIXED image height */
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
            <div style={{
              position: "absolute", top: "8px", right: "8px",
              background: badge.bg, color: badge.color,
              fontSize: "10px", fontWeight: 800, borderRadius: "999px",
              padding: "2px 8px", lineHeight: "16px", whiteSpace: "nowrap",
            }}>
              {badge.label}
            </div>
          )}

          {/* Discount badge — TOP-LEFT */}
          {product.discount && (
            <div style={{
              position: "absolute", top: "8px", left: "8px",
              background: "#FF6B00", color: "#fff",
              fontSize: "10px", fontWeight: 800, borderRadius: "999px",
              padding: "2px 7px", lineHeight: "16px",
            }}>
              {persianNumber(product.discount)}٪
            </div>
          )}

          {product.stock === 0 && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "12px", background: "rgba(0,0,0,0.5)", padding: "4px 12px", borderRadius: "999px" }}>ناموجود</span>
            </div>
          )}
        </div>

        {/* ── Content — fills remaining 172 px ── */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "10px 12px 12px",
          minHeight: 0,
        }}>
          {/* Brand */}
          <p style={{ fontSize: "10px", color: "hsl(var(--muted-foreground))", margin: 0, lineHeight: 1.4, flexShrink: 0 }}>
            {product.brand}
          </p>

          {/* Title — FIXED 38px, never grows */}
          <p style={{
            fontSize: "12px", fontWeight: 600, lineHeight: 1.45,
            margin: "3px 0 0", flexShrink: 0,
            height: "38px",           /* ← FIXED: exactly 2 lines at 13px/1.45 */
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
          }}>
            {product.name}
          </p>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "3px", marginTop: "5px", flexShrink: 0 }}>
            <Star style={{ width: "10px", height: "10px", fill: "#fbbf24", color: "#fbbf24", flexShrink: 0 }} />
            <span style={{ fontSize: "10px", fontWeight: 700 }}>{product.rating}</span>
            <span style={{ fontSize: "10px", color: "hsl(var(--muted-foreground))" }}>({persianNumber(product.reviewCount)})</span>
          </div>

          {/* Price block — FIXED 32px, old-price always occupies space */}
          <div style={{ marginTop: "5px", flexShrink: 0, height: "32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {/* Always rendered — invisible when no originalPrice so height stays the same */}
            <p style={{
              fontSize: "10px", color: "hsl(var(--muted-foreground))", textDecoration: "line-through",
              margin: 0, lineHeight: 1.4,
              visibility: product.originalPrice ? "visible" : "hidden",
            }}>
              {product.originalPrice ? formatPrice(product.originalPrice) : "—"}
            </p>
            <p style={{ fontSize: "12px", fontWeight: 800, color: "hsl(var(--primary))", margin: 0, lineHeight: 1.3 }}>
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Spacer — pushes button to bottom */}
          <div style={{ flex: 1 }} />

          {/* Add-to-cart button — always at bottom */}
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            style={{
              width: "100%",
              background: "hsl(var(--primary) / 0.07)",
              color: "hsl(var(--primary))",
              border: "1px solid hsl(var(--primary) / 0.25)",
              borderRadius: "10px",
              padding: "7px 0",
              fontSize: "11px",
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
            <Plus style={{ width: "11px", height: "11px" }} />
            افزودن
          </button>
        </div>
      </div>
    </Link>
  );
}
