"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { categories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const allItems = [
  { slug: null as string | null, name: "همه", icon: "🏪" },
  ...categories,
];

function CategorySliderContent() {
  const searchParams   = useSearchParams();
  const activeCategory = searchParams.get("category");

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1 h-5 bg-primary rounded-full inline-block flex-shrink-0" />
        <h2 className="text-base font-bold">دسته‌بندی‌ها</h2>
      </div>

      {/*
        Explicit inline styles guarantee horizontal scroll in RTL context:
        - flexDirection: row  → always left-to-right, regardless of dir attribute
        - flexWrap: nowrap    → prevents items from wrapping to a second line
        - overflowX: auto     → enables horizontal scroll when items overflow
        - WebkitOverflowScrolling: touch → smooth momentum scroll on iOS
      */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          gap: "1rem",
          paddingBottom: "0.25rem",
        }}
      >
        {allItems.map((cat) => {
          const isActive =
            cat.slug === null ? !activeCategory : activeCategory === cat.slug;
          const href =
            cat.slug === null ? "/products" : `/products?category=${cat.slug}`;

          return (
            <Link
              key={cat.slug ?? "all"}
              href={href}
              style={{ flexShrink: 0 }}
              className="flex flex-col items-center gap-2"
            >
              {/* Circle */}
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-200",
                  isActive
                    ? "bg-primary shadow-lg shadow-primary/40 scale-105"
                    : "bg-surface hover:bg-muted"
                )}
              >
                {cat.icon}
              </div>
              {/* Label */}
              <span
                className={cn(
                  "text-[11px] font-semibold whitespace-nowrap text-center",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function CategorySlider() {
  return (
    <Suspense fallback={<div className="h-28" />}>
      <CategorySliderContent />
    </Suspense>
  );
}
