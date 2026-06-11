"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/store/favorites";
import { ProductCard } from "@/components/product/ProductCard";
import { persianNumber } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export default function AccountFavoritesPage() {
  const items = useFavoritesStore((s) => s.items);
  const clear = useFavoritesStore((s) => s.clear);

  if (items.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border/40 shadow-card py-16 flex flex-col items-center text-center gap-4">
        <div className="w-20 h-20 rounded-3xl bg-surface flex items-center justify-center">
          <Heart className="h-9 w-9 text-muted-foreground/50" />
        </div>
        <div>
          <h2 className="font-black text-lg mb-1">لیست علاقه‌مندی‌ها خالی است</h2>
          <p className="text-sm text-muted-foreground">با زدن آیکن قلب، محصولات مورد علاقه‌تان را ذخیره کنید.</p>
        </div>
        <Link
          href="/products"
          className="bg-primary text-white font-bold rounded-2xl px-6 py-3 text-sm active:scale-95 transition-transform shadow-primary"
        >
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  const handleClear = () => {
    clear();
    toast({ title: "پاک شد", description: "لیست علاقه‌مندی‌ها خالی شد" });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-black">
          علاقه‌مندی‌ها <span className="text-sm font-medium text-muted-foreground">({persianNumber(items.length)})</span>
        </h1>
        <button
          onClick={handleClear}
          className="text-xs font-bold text-red-500 hover:underline"
        >
          پاک کردن همه
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
