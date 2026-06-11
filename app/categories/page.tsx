import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { categoryGroups } from "@/lib/mock-data";

export const metadata: Metadata = { title: "دسته‌بندی محصولات" };

export default function CategoriesPage() {
  return (
    <div className="container py-4 md:py-8">
      <div className="mb-4 md:mb-6">
        <h1 className="text-lg md:text-xl font-black">دسته‌بندی محصولات</h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          از میان دسته‌بندی‌های زیر، محصول مورد نظرتان را پیدا کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {categoryGroups.map((group) => (
          <section
            key={group.id}
            className="bg-card rounded-2xl border border-border/40 shadow-card p-4"
          >
            {/* Group header → filtered products */}
            <Link
              href={`/products?category=${group.slug}`}
              className="flex items-center gap-3 pb-3 mb-3 border-b border-border/40"
            >
              <span className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                {group.icon}
              </span>
              <span className="font-bold text-sm flex-1 min-w-0">{group.name}</span>
              <span className="flex items-center gap-0.5 text-xs font-bold text-primary flex-shrink-0">
                مشاهده همه
                <ChevronLeft className="h-3.5 w-3.5" />
              </span>
            </Link>

            {/* Sub-categories */}
            <div className="flex flex-wrap gap-2">
              {group.subs.map((sub) => (
                <Link
                  key={sub}
                  href={`/products?category=${group.slug}`}
                  className="text-xs font-medium bg-surface border border-border/50 rounded-xl px-3 py-2 text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                >
                  {sub}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
