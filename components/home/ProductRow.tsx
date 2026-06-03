import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ScrollCard, type CardBadge } from "@/components/product/ScrollCard";
import type { Product } from "@/types";

interface ProductRowProps {
  title: string;
  products: Product[];
  viewAllHref: string;
  accentColor: string;  // e.g. "#22c55e"
  badge: CardBadge;
}

export function ProductRow({ title, products, viewAllHref, accentColor, badge }: ProductRowProps) {
  if (products.length === 0) return null;

  return (
    <section>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "14px",
        }}
      >
        {/* Title group — accent bar + text (RTL: bar appears to the right of text) */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "4px",
              height: "22px",
              background: accentColor,
              borderRadius: "3px",
              flexShrink: 0,
            }}
          />
          <h2 style={{ fontSize: "15px", fontWeight: 800, margin: 0 }}>{title}</h2>
        </div>

        {/* "See all" link */}
        <Link
          href={viewAllHref}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            fontSize: "12px",
            fontWeight: 700,
            color: "hsl(var(--muted-foreground))",
            textDecoration: "none",
          }}
        >
          مشاهده همه
          <ChevronLeft style={{ width: "14px", height: "14px" }} />
        </Link>
      </div>

      {/* Horizontal scroll row */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          overflowX: "auto",
          gap: "12px",
          paddingBottom: "6px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties}
      >
        {products.map((p) => (
          <ScrollCard key={p.id} product={p} badge={badge} />
        ))}
      </div>
    </section>
  );
}
