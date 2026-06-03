import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  view?: "grid" | "list";
}

export function ProductGrid({ products, view = "grid" }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg">محصولی یافت نشد</p>
        <p className="text-sm mt-1">فیلترها را تغییر دهید</p>
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} view="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
