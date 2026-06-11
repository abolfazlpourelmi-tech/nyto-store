import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container py-20 flex flex-col items-center justify-center text-center gap-6">
      <p className="text-7xl md:text-8xl font-black text-primary/20 leading-none select-none">
        ۴۰۴
      </p>
      <div>
        <h1 className="text-xl font-black mb-2">صفحه مورد نظر پیدا نشد</h1>
        <p className="text-sm text-muted-foreground max-w-xs">
          ممکن است آدرس را اشتباه وارد کرده باشید یا این صفحه حذف شده باشد.
        </p>
      </div>
      <div className="flex gap-3">
        <Link
          href="/"
          className="bg-primary text-white font-bold rounded-2xl px-5 py-3 text-sm flex items-center gap-2 active:scale-95 transition-transform shadow-primary"
        >
          <Home className="h-4 w-4" />
          بازگشت به خانه
        </Link>
        <Link
          href="/products"
          className="bg-surface border border-border/60 font-semibold rounded-2xl px-5 py-3 text-sm flex items-center gap-2 active:scale-95 transition-transform"
        >
          <Search className="h-4 w-4" />
          جستجوی محصولات
        </Link>
      </div>
    </div>
  );
}
