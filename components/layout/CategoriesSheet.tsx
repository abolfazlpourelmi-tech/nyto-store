"use client";
import Link from "next/link";
import { X, ChevronLeft } from "lucide-react";
import { categoryGroups } from "@/lib/mock-data";

export function CategoriesSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      {/* Backdrop — tap to close */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Bottom sheet */}
      <div
        className="absolute bottom-0 inset-x-0 bg-card rounded-t-3xl shadow-xl flex flex-col animate-slide-up"
        style={{ maxHeight: "85vh" }}
      >
        {/* Sticky header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-border/40 flex-shrink-0">
          <h3 className="font-extrabold text-sm">دسته‌بندی‌ها</h3>
          <button
            onClick={onClose}
            aria-label="بستن"
            className="w-8 h-8 rounded-xl bg-surface flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-safe">
          {categoryGroups.map((group) => (
            <section
              key={group.id}
              className="bg-surface/50 rounded-2xl border border-border/40 p-3.5"
            >
              <Link
                href={`/products?category=${group.slug}`}
                onClick={onClose}
                className="flex items-center gap-3 pb-3 mb-3 border-b border-border/40"
              >
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg flex-shrink-0">
                  {group.icon}
                </span>
                <span className="font-bold text-sm flex-1 min-w-0">{group.name}</span>
                <span className="flex items-center gap-0.5 text-xs font-bold text-primary flex-shrink-0">
                  همه
                  <ChevronLeft className="h-3.5 w-3.5" />
                </span>
              </Link>

              <div className="flex flex-wrap gap-2">
                {group.subs.map((sub) => (
                  <Link
                    key={sub}
                    href={`/products?category=${group.slug}`}
                    onClick={onClose}
                    className="text-xs font-medium bg-card border border-border/50 rounded-xl px-3 py-2 text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
