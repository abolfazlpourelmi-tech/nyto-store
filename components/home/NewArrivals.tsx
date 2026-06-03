import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/mock-data";

export function NewArrivals() {
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1 h-5 bg-emerald-500 rounded-full inline-block" />
          <h2 className="text-base font-bold">جدیدترین محصولات</h2>
        </div>
        <Link
          href="/products?sort=newest"
          className="flex items-center gap-0.5 text-xs font-semibold text-primary hover:opacity-80 transition-opacity"
        >
          همه
          <ChevronLeft className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {newProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
