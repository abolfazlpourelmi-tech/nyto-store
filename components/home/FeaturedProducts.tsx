"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Star, ImageOff } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice, persianNumber } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { products } from "@/lib/mock-data";
import type { Product } from "@/types";

/* ── Countdown — dir="ltr" forces digit order in RTL pages ── */
const INITIAL = 6 * 3600;

function CountdownTimer() {
  const [secs, setSecs] = useState(INITIAL);

  useEffect(() => {
    const id = setInterval(
      () => setSecs((s) => (s <= 1 ? INITIAL : s - 1)),
      1000
    );
    return () => clearInterval(id);
  }, []);

  const hh = String(Math.floor(secs / 3600)).padStart(2, "0");
  const mm = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  const seg: React.CSSProperties = {
    background: "rgba(255,255,255,0.22)",
    borderRadius: "6px",
    padding: "2px 6px",
    fontFamily: "monospace",
    fontWeight: 900,
    fontSize: "13px",
    color: "#fff",
    minWidth: "28px",
    textAlign: "center",
    letterSpacing: "1px",
  };

  return (
    <div dir="ltr" style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      <span style={seg}>{hh}</span>
      <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 900, fontSize: "14px" }}>:</span>
      <span style={seg}>{mm}</span>
      <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 900, fontSize: "14px" }}>:</span>
      <span style={seg}>{ss}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   White card that pops against the gradient background.
   Dimensions match ScrollCard exactly (162 × 320 px) so rows
   align when both appear on the same page.
   Text uses hardcoded dark values so the card reads correctly
   on both light and dark OS themes (background is always #fff).
────────────────────────────────────────────────────────────── */
function MiniCard({ product }: { product: Product }) {
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
          height: "320px",
          borderRadius: "16px",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 4px 18px rgba(0,0,0,0.14)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        className="hover:-translate-y-0.5 hover:shadow-xl"
      >
        {/* Image — 148 px fixed */}
        <div style={{ position: "relative", width: "162px", height: "148px", flexShrink: 0, background: "#f5f5f5", overflow: "hidden" }}>
          {imgFailed ? (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ImageOff style={{ width: "28px", height: "28px", color: "#ccc" }} />
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
          {product.discount && (
            <div style={{
              position: "absolute", top: "8px", right: "8px",
              background: "#FF6B00", color: "#fff",
              fontSize: "10px", fontWeight: 800, borderRadius: "999px",
              padding: "2px 7px", lineHeight: "16px",
            }}>
              {persianNumber(product.discount)}٪
            </div>
          )}
          {product.stock === 0 && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.38)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "12px", background: "rgba(0,0,0,0.45)", padding: "4px 12px", borderRadius: "999px" }}>ناموجود</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "10px 12px 12px", minHeight: 0 }}>

          {/* Brand */}
          <p style={{ fontSize: "10px", color: "#999", margin: 0, lineHeight: 1.4, flexShrink: 0 }}>{product.brand}</p>

          {/* Title — 38 px fixed, never grows */}
          <p style={{
            fontSize: "12px", fontWeight: 600, lineHeight: 1.45,
            margin: "3px 0 0", flexShrink: 0, color: "#1a1a1a",
            height: "38px", overflow: "hidden",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const,
          }}>
            {product.name}
          </p>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "3px", marginTop: "5px", flexShrink: 0 }}>
            <Star style={{ width: "10px", height: "10px", fill: "#fbbf24", color: "#fbbf24", flexShrink: 0 }} />
            <span style={{ fontSize: "10px", fontWeight: 700, color: "#555" }}>{product.rating}</span>
            <span style={{ fontSize: "10px", color: "#aaa" }}>({persianNumber(product.reviewCount)})</span>
          </div>

          {/* Price block — 32 px fixed; old-price always rendered for uniform height */}
          <div style={{ marginTop: "5px", flexShrink: 0, height: "32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{
              fontSize: "10px", color: "#bbb", textDecoration: "line-through",
              margin: 0, lineHeight: 1.4,
              visibility: product.originalPrice ? "visible" : "hidden",
            }}>
              {product.originalPrice ? formatPrice(product.originalPrice) : "—"}
            </p>
            <p style={{ fontSize: "12px", fontWeight: 800, color: "#FF6B00", margin: 0, lineHeight: 1.3 }}>
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Spacer — pins button to bottom */}
          <div style={{ flex: 1 }} />

          {/* Add-to-cart — filled orange on white card */}
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            style={{
              width: "100%",
              background: "#FF6B00",
              color: "#fff",
              border: "none",
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

/* ── Main section — one unified gradient container ── */
export function FeaturedProducts() {
  const featured = products.filter((p) => p.isFeatured);

  return (
    <section
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        background: "linear-gradient(135deg, #c0392b 0%, #e55f00 45%, #FF6B00 100%)",
        boxShadow: "0 8px 32px rgba(255, 107, 0, 0.32)",
      }}
    >
      {/* ── Header row: title (RTL-right) + see-all pill (RTL-left) ── */}
      <div
        style={{
          padding: "14px 16px 8px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "15px", margin: 0 }}>
          🔥 پیشنهاد ویژه
        </h2>
        <Link
          href="/products"
          style={{
            background: "rgba(255,255,255,0.18)",
            color: "#fff",
            borderRadius: "999px",
            padding: "4px 14px",
            fontSize: "11px",
            fontWeight: 700,
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.35)",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          مشاهده همه
        </Link>
      </div>

      {/* ── Countdown row ── */}
      <div style={{ padding: "0 16px 14px", display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "11px", fontWeight: 600, flexShrink: 0 }}>
          ⏱ تا پایان تخفیف:
        </span>
        <CountdownTimer />
      </div>

      {/* ── Horizontal card scroll — transparent so gradient shows through/around cards ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          overflowX: "auto",
          gap: "12px",
          padding: "0 16px 20px",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        } as React.CSSProperties}
      >
        {featured.map((p) => (
          <MiniCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
