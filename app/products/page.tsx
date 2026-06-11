"use client";
import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  LayoutGrid, List, ChevronDown, X,
  ArrowUpDown, Zap, SlidersHorizontal, Check,
} from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { products } from "@/lib/mock-data";
import type { SortOption } from "@/types";
import { cn } from "@/lib/utils";
import { persianNumber } from "@/lib/utils";

/* ── Static filter data ── */
const ALL_BRANDS = Array.from(new Set(products.map((p) => p.brand))).sort();

const COLORS: { label: string; hex: string; outlined?: boolean }[] = [
  { label: "مشکی",  hex: "#1a1a1a" },
  { label: "سفید",  hex: "#f0f0f0", outlined: true },
  { label: "آبی",   hex: "#3b82f6" },
  { label: "قرمز",  hex: "#ef4444" },
  { label: "سبز",   hex: "#22c55e" },
  { label: "طلایی", hex: "#f59e0b" },
];

const STORAGE_OPTIONS = ["۶۴ گیگابایت", "۱۲۸ گیگابایت", "۲۵۶ گیگابایت", "۵۱۲ گیگابایت", "۱ ترابایت"];
const OS_OPTIONS      = ["Android", "iOS", "Windows", "HarmonyOS"];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "مرتبط‌ترین",    value: "relevant"    },
  { label: "پربازدیدترین",   value: "mostviewed"  },
  { label: "جدیدترین",       value: "newest"      },
  { label: "ارزان‌ترین",     value: "price-asc"   },
  { label: "گران‌ترین",      value: "price-desc"  },
  { label: "پرفروش‌ترین",    value: "bestselling" },
  { label: "بیشترین امتیاز", value: "rating"      },
];

/* ── Reusable collapsible group wrapper ── */
function FilterGroup({
  title, isOpen, onToggle, children,
}: {
  title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div style={{ borderBottom: "1px solid hsl(var(--border) / 0.45)" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%", display: "flex", flexDirection: "row",
          alignItems: "center", justifyContent: "space-between",
          padding: "11px 0", background: "none", border: "none",
          cursor: "pointer", fontSize: "13px", fontWeight: 700,
          color: "hsl(var(--foreground))",
        }}
      >
        {title}
        <ChevronDown style={{
          width: "14px", height: "14px",
          color: "hsl(var(--muted-foreground))",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
          flexShrink: 0,
        }} />
      </button>
      {isOpen && <div style={{ paddingBottom: "12px" }}>{children}</div>}
    </div>
  );
}

/* ── Toggle switch shared between sidebar and drawer ── */
function ToggleSwitch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={() => onChange(!on)}
      style={{
        width: "36px", height: "20px", borderRadius: "999px",
        background: on ? "hsl(var(--primary))" : "hsl(var(--border))",
        position: "relative", cursor: "pointer",
        transition: "background 0.2s", flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute", top: "2px",
        right: on ? "2px" : "16px",
        width: "16px", height: "16px", borderRadius: "50%",
        background: "#fff", transition: "right 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </div>
  );
}

/* ── Checkbox row ── */
function CheckRow({
  label, checked, onToggle,
}: { label: string; checked: boolean; onToggle: () => void }) {
  return (
    <label
      style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", padding: "3px 0" }}
      onClick={onToggle}
    >
      <div style={{
        width: "16px", height: "16px", borderRadius: "4px", flexShrink: 0,
        border: `1.5px solid ${checked ? "hsl(var(--primary))" : "hsl(var(--border))"}`,
        background: checked ? "hsl(var(--primary))" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {checked && <Check style={{ width: "10px", height: "10px", color: "#fff" }} />}
      </div>
      <span style={{ fontSize: "12px" }}>{label}</span>
    </label>
  );
}

/* ── Filter panel content (no header — header is rendered by caller) ── */
interface FilterState {
  fastDelivery: boolean;     setFastDelivery:   (v: boolean) => void;
  inStockOnly:  boolean;     setInStockOnly:    (v: boolean) => void;
  selectedBrands:  string[]; toggleBrand:       (b: string) => void;
  priceMin: string;          setPriceMin:       (v: string) => void;
  priceMax: string;          setPriceMax:       (v: string) => void;
  selectedColors:  string[]; toggleColor:       (c: string) => void;
  selectedStorage: string[]; toggleStorage:     (s: string) => void;
  selectedOS:      string[]; toggleOS:          (o: string) => void;
  openGroups: Record<string, boolean>; toggleGroup: (k: string) => void;
}

function FilterPanel(fs: FilterState) {
  return (
    <div>
      {/* ارسال سریع */}
      <div style={{ borderBottom: "1px solid hsl(var(--border) / 0.45)", padding: "11px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Zap style={{ width: "13px", height: "13px", color: "#f59e0b" }} />
          <span style={{ fontSize: "13px", fontWeight: 700 }}>ارسال سریع</span>
        </div>
        <ToggleSwitch on={fs.fastDelivery} onChange={fs.setFastDelivery} />
      </div>

      {/* فقط موجود */}
      <div style={{ borderBottom: "1px solid hsl(var(--border) / 0.45)", padding: "11px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "13px", fontWeight: 700 }}>فقط کالاهای موجود</span>
        <ToggleSwitch on={fs.inStockOnly} onChange={fs.setInStockOnly} />
      </div>

      {/* برند */}
      <FilterGroup title="برند" isOpen={fs.openGroups.brand} onToggle={() => fs.toggleGroup("brand")}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", maxHeight: "200px", overflowY: "auto" }}>
          {ALL_BRANDS.map((b) => (
            <CheckRow key={b} label={b} checked={fs.selectedBrands.includes(b)} onToggle={() => fs.toggleBrand(b)} />
          ))}
        </div>
      </FilterGroup>

      {/* محدوده قیمت */}
      <FilterGroup title="محدوده قیمت" isOpen={fs.openGroups.price} onToggle={() => fs.toggleGroup("price")}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <input
              type="number" placeholder="از" value={fs.priceMin}
              onChange={(e) => fs.setPriceMin(e.target.value)}
              style={{ flex: 1, padding: "7px 8px", borderRadius: "8px", border: "1px solid hsl(var(--border))", background: "hsl(var(--surface))", fontSize: "11px", color: "hsl(var(--foreground))", outline: "none", direction: "ltr", textAlign: "center" }}
            />
            <span style={{ fontSize: "11px", color: "hsl(var(--muted-foreground))", flexShrink: 0 }}>تا</span>
            <input
              type="number" placeholder="تا" value={fs.priceMax}
              onChange={(e) => fs.setPriceMax(e.target.value)}
              style={{ flex: 1, padding: "7px 8px", borderRadius: "8px", border: "1px solid hsl(var(--border))", background: "hsl(var(--surface))", fontSize: "11px", color: "hsl(var(--foreground))", outline: "none", direction: "ltr", textAlign: "center" }}
            />
          </div>
          <p style={{ fontSize: "10px", color: "hsl(var(--muted-foreground))", margin: 0 }}>مبلغ به تومان</p>
        </div>
      </FilterGroup>

      {/* رنگ */}
      <FilterGroup title="رنگ" isOpen={fs.openGroups.color} onToggle={() => fs.toggleGroup("color")}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {COLORS.map((c) => (
            <button
              key={c.label} onClick={() => fs.toggleColor(c.label)} title={c.label}
              style={{
                width: "24px", height: "24px", borderRadius: "50%",
                background: c.hex, cursor: "pointer",
                border: fs.selectedColors.includes(c.label)
                  ? "2.5px solid hsl(var(--primary))"
                  : c.outlined ? "1.5px solid hsl(var(--border))" : "none",
                outline: fs.selectedColors.includes(c.label) ? "2px solid hsl(var(--primary) / 0.28)" : "none",
                outlineOffset: "2px",
              }}
            />
          ))}
        </div>
      </FilterGroup>

      {/* ظرفیت حافظه */}
      <FilterGroup title="ظرفیت حافظه داخلی" isOpen={fs.openGroups.storage} onToggle={() => fs.toggleGroup("storage")}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {STORAGE_OPTIONS.map((s) => (
            <CheckRow key={s} label={s} checked={fs.selectedStorage.includes(s)} onToggle={() => fs.toggleStorage(s)} />
          ))}
        </div>
      </FilterGroup>

      {/* سیستم عامل */}
      <FilterGroup title="سیستم عامل" isOpen={fs.openGroups.os} onToggle={() => fs.toggleGroup("os")}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {OS_OPTIONS.map((o) => (
            <CheckRow key={o} label={o} checked={fs.selectedOS.includes(o)} onToggle={() => fs.toggleOS(o)} />
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}

/* ════════════════════════════════════════════════
   Main content (needs Suspense for useSearchParams)
═══════════════════════════════════════════════ */
function ProductsContent() {
  const searchParams   = useSearchParams();
  const query          = searchParams.get("q");
  const categoryParam  = searchParams.get("category");
  const filterParam    = searchParams.get("filter");
  const sortParam      = searchParams.get("sort") as SortOption | null;

  /* ── view / sort ── */
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<SortOption>(
    sortParam && SORT_OPTIONS.some((o) => o.value === sortParam) ? sortParam : "relevant"
  );

  /* ── filter state ── */
  const [selectedCategory] = useState<string | null>(categoryParam);
  const [inStockOnly,   setInStockOnly]   = useState(false);
  const [fastDelivery,  setFastDelivery]  = useState(false);
  const [selectedBrands,  setSelectedBrands]  = useState<string[]>([]);
  const [priceMin,      setPriceMin]      = useState("");
  const [priceMax,      setPriceMax]      = useState("");
  const [selectedColors,  setSelectedColors]  = useState<string[]>([]);
  const [selectedStorage, setSelectedStorage] = useState<string[]>([]);
  const [selectedOS,    setSelectedOS]    = useState<string[]>([]);

  /* ── drawer state ── */
  const [filtersOpen,    setFiltersOpen]    = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

  /* ── which filter groups are open ── */
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    brand: true, price: false, color: false, storage: false, os: false,
  });

  /* ── helpers ── */
  const toggleBrand   = (b: string) => setSelectedBrands((p)  => p.includes(b) ? p.filter((x) => x !== b) : [...p, b]);
  const toggleColor   = (c: string) => setSelectedColors((p)  => p.includes(c) ? p.filter((x) => x !== c) : [...p, c]);
  const toggleStorage = (s: string) => setSelectedStorage((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  const toggleOS      = (o: string) => setSelectedOS((p)      => p.includes(o) ? p.filter((x) => x !== o) : [...p, o]);
  const toggleGroup   = (k: string) => setOpenGroups((p) => ({ ...p, [k]: !p[k] }));

  const clearFilters = () => {
    setInStockOnly(false); setFastDelivery(false);
    setSelectedBrands([]); setPriceMin(""); setPriceMax("");
    setSelectedColors([]); setSelectedStorage([]); setSelectedOS([]);
  };

  const activeFilterCount = [
    fastDelivery, inStockOnly,
    selectedBrands.length > 0,
    priceMin !== "" || priceMax !== "",
    selectedColors.length > 0,
    selectedStorage.length > 0,
    selectedOS.length > 0,
  ].filter(Boolean).length;

  /* ── filtered + sorted list ── */
  const filtered = useMemo(() => {
    let r = [...products];
    if (query) {
      const q = query.toLowerCase();
      r = r.filter((p) =>
        p.name.includes(query) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(query))
      );
    }
    if (selectedCategory) r = r.filter((p) => p.category.slug === selectedCategory);
    if (filterParam === "new")      r = r.filter((p) => p.isNew);
    if (filterParam === "featured") r = r.filter((p) => p.isFeatured);
    if (inStockOnly)       r = r.filter((p) => p.stock > 0);
    if (fastDelivery)      r = r.filter((p) => p.stock > 5);
    if (selectedBrands.length > 0) r = r.filter((p) => selectedBrands.includes(p.brand));
    if (priceMin !== "")   r = r.filter((p) => p.price >= Number(priceMin));
    if (priceMax !== "")   r = r.filter((p) => p.price <= Number(priceMax));
    if (selectedOS.length > 0) {
      r = r.filter((p) => {
        const os = p.specifications?.["سیستم‌عامل"] ?? "";
        return selectedOS.some((o) => os.toLowerCase().includes(o.toLowerCase()));
      });
    }
    switch (sort) {
      case "price-asc":    r.sort((a, b) => a.price       - b.price);       break;
      case "price-desc":   r.sort((a, b) => b.price       - a.price);       break;
      case "rating":       r.sort((a, b) => b.rating      - a.rating);      break;
      case "bestselling":
      case "mostviewed":   r.sort((a, b) => b.reviewCount - a.reviewCount); break;
      case "newest":       r.sort((a, b) => Number(b.id)  - Number(a.id));  break;
    }
    return r;
  }, [query, selectedCategory, filterParam, inStockOnly, fastDelivery, selectedBrands, priceMin, priceMax, selectedOS, sort]);

  const pageTitle = query
    ? `نتایج جستجو: «${query}»`
    : filterParam === "new"      ? "جدیدترین محصولات"
    : filterParam === "featured" ? "پیشنهادهای ویژه"
    : sort === "bestselling"      ? "پرفروش‌ترین‌ها"
    : sort === "rating"           ? "محبوب‌ترین‌ها"
    : "همه محصولات";

  const fs: FilterState = {
    fastDelivery,  setFastDelivery,
    inStockOnly,   setInStockOnly,
    selectedBrands, toggleBrand,
    priceMin,      setPriceMin,
    priceMax,      setPriceMax,
    selectedColors, toggleColor,
    selectedStorage, toggleStorage,
    selectedOS,    toggleOS,
    openGroups,    toggleGroup,
  };

  /* ── shared sort bar item styles (pill buttons) ── */
  const sortItemStyle = (active: boolean): React.CSSProperties => ({
    padding: "6px 13px", fontSize: "12px",
    fontWeight: active ? 800 : 500,
    color: active ? "#fff" : "hsl(var(--muted-foreground))",
    background: active ? "hsl(var(--primary))" : "transparent",
    border: "none", borderRadius: "999px", cursor: "pointer",
    flexShrink: 0, whiteSpace: "nowrap",
    transition: "background 0.15s, color 0.15s",
  });

  return (
    <div className="container py-4 md:py-6">

      {/* ── Page title ── */}
      <h1 className="text-base font-bold mb-3">{pageTitle}</h1>

      {/* ════════════════════════════════════════
          MOBILE: quick chip bar  (hidden on md+)
      ════════════════════════════════════════ */}
      <div
        className="flex md:hidden"
        style={{
          flexDirection: "row", flexWrap: "nowrap",
          overflowX: "auto", gap: "8px",
          // top/side padding so the absolute filter-count badge isn't clipped
          // by the scroll container (overflow-x:auto also clips overflow-y)
          paddingTop: "8px", paddingBottom: "10px", paddingInline: "2px",
          scrollbarWidth: "none", marginBottom: "2px",
        } as React.CSSProperties}
      >
        {/* Sort chip — shows active sort label, opens sort sheet */}
        <button
          onClick={() => setMobileSortOpen(true)}
          className={cn(
            "flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all",
            sort !== "relevant"
              ? "text-primary border-primary/50 bg-primary/10"
              : "bg-surface border-border/60 text-foreground"
          )}
        >
          <ArrowUpDown className="h-3 w-3" />
          {SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "مرتب‌سازی"}
          <ChevronDown className="h-3 w-3" />
        </button>

        {/* Filter chip with active-count badge */}
        <button
          onClick={() => setFiltersOpen(true)}
          className="flex-shrink-0 relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border bg-surface border-border/60 text-foreground transition-all"
        >
          <SlidersHorizontal className="h-3 w-3" />
          فیلتر
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -left-1 bg-primary text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center leading-none">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Fast delivery chip */}
        <button
          onClick={() => setFastDelivery(!fastDelivery)}
          className={cn(
            "flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all",
            fastDelivery
              ? "text-amber-600 border-amber-400 bg-amber-50 dark:bg-amber-900/20"
              : "bg-surface border-border/60 text-muted-foreground"
          )}
        >
          <Zap className="h-3 w-3" />
          ارسال سریع
        </button>

        {/* In-stock chip */}
        <button
          onClick={() => setInStockOnly(!inStockOnly)}
          className={cn(
            "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all",
            inStockOnly
              ? "text-primary border-primary/50 bg-primary/10"
              : "bg-surface border-border/60 text-muted-foreground"
          )}
        >
          فقط موجود
        </button>

        {/* Brand chip — opens filter drawer */}
        <button
          onClick={() => setFiltersOpen(true)}
          className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border bg-surface border-border/60 text-muted-foreground"
        >
          برند
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      {/* ════════════════════════════════════════
          Main layout: sidebar (right in RTL) + content
      ════════════════════════════════════════ */}
      <div style={{ display: "flex", flexDirection: "row", gap: "20px", alignItems: "flex-start" }}>

        {/* ── Desktop filter sidebar (first in DOM = RIGHT in RTL) ── */}
        <aside
          className="hidden md:block"
          style={{ width: "216px", flexShrink: 0, position: "sticky", top: "76px" }}
        >
          {/* Sidebar header */}
          <div style={{
            display: "flex", flexDirection: "row",
            alignItems: "center", justifyContent: "space-between",
            paddingBottom: "10px", marginBottom: "2px",
            borderBottom: "2px solid hsl(var(--border) / 0.5)",
          }}>
            <h2 style={{ fontSize: "14px", fontWeight: 800, margin: 0 }}>فیلترها</h2>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                style={{ fontSize: "11px", color: "hsl(var(--primary))", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}
              >
                حذف فیلترها
              </button>
            )}
          </div>
          <FilterPanel {...fs} />
        </aside>

        {/* ── Content column ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* ── Sort bar (desktop + tablet, hidden on mobile) ── */}
          <div
            className="hidden md:flex"
            style={{
              flexDirection: "row", alignItems: "center", flexWrap: "nowrap",
              overflowX: "auto", scrollbarWidth: "none",
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border) / 0.5)",
              borderRadius: "14px", padding: "7px 10px",
              marginBottom: "16px", gap: "4px",
            } as React.CSSProperties}
          >
            {/* Icon + label */}
            <div style={{ display: "flex", alignItems: "center", gap: "5px", flexShrink: 0, marginLeft: "6px" }}>
              <ArrowUpDown style={{ width: "13px", height: "13px", color: "hsl(var(--muted-foreground))" }} />
              <span style={{ fontSize: "12px", fontWeight: 700, color: "hsl(var(--foreground))", whiteSpace: "nowrap" }}>
                مرتب‌سازی:
              </span>
            </div>

            {/* Sort options — pill buttons */}
            {SORT_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => setSort(opt.value)} style={sortItemStyle(sort === opt.value)}>
                {opt.label}
              </button>
            ))}

            {/* Spacer */}
            <div style={{ flex: 1, minWidth: "8px" }} />

            {/* Product count + divider + view toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              <span style={{ fontSize: "12px", color: "hsl(var(--muted-foreground))", whiteSpace: "nowrap" }}>
                {persianNumber(filtered.length)} کالا
              </span>
              <div style={{ width: "1px", height: "18px", background: "hsl(var(--border)/0.5)", flexShrink: 0 }} />
              <div className="flex items-center bg-surface rounded-lg overflow-hidden p-0.5 gap-0.5">
                <button
                  onClick={() => setView("grid")}
                  className={cn(
                    "w-7 h-7 flex items-center justify-center rounded-md transition-all",
                    view === "grid" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={cn(
                    "w-7 h-7 flex items-center justify-center rounded-md transition-all",
                    view === "list" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product grid */}
          <ProductGrid products={filtered} view={view} />
        </div>
      </div>

      {/* ════════════════════════════════════════
          MOBILE: sort bottom sheet
      ════════════════════════════════════════ */}
      {mobileSortOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileSortOpen(false)}
          />
          <div className="absolute bottom-0 inset-x-0 bg-card rounded-t-3xl shadow-xl pb-safe">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 12px", borderBottom: "1px solid hsl(var(--border)/0.4)" }}>
              <h3 style={{ fontWeight: 800, fontSize: "14px", margin: 0 }}>مرتب‌سازی</h3>
              <button
                onClick={() => setMobileSortOpen(false)}
                className="w-8 h-8 rounded-xl bg-surface flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div style={{ padding: "4px 20px 32px" }}>
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setSort(opt.value); setMobileSortOpen(false); }}
                  style={{
                    width: "100%", display: "flex", flexDirection: "row",
                    alignItems: "center", justifyContent: "space-between",
                    padding: "13px 0",
                    borderTop: "none", borderLeft: "none", borderRight: "none",
                    borderBottom: "1px solid hsl(var(--border)/0.35)",
                    background: "none",
                    cursor: "pointer", fontSize: "13px",
                    fontWeight: sort === opt.value ? 700 : 400,
                    color: sort === opt.value ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                  }}
                >
                  {opt.label}
                  {sort === opt.value && (
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "hsl(var(--primary))", flexShrink: 0 }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          MOBILE: filter bottom drawer
      ════════════════════════════════════════ */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setFiltersOpen(false)}
          />
          <div
            className="absolute bottom-0 inset-x-0 bg-card rounded-t-3xl shadow-xl flex flex-col"
            style={{ maxHeight: "88vh" }}
          >
            {/* Sticky drawer header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "15px 20px 12px", flexShrink: 0,
              borderBottom: "1px solid hsl(var(--border)/0.5)",
              background: "hsl(var(--card))",
            }}>
              <h3 style={{ fontWeight: 800, fontSize: "14px", margin: 0 }}>فیلترها</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    style={{ fontSize: "12px", color: "hsl(var(--primary))", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}
                  >
                    حذف فیلترها
                  </button>
                )}
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="w-8 h-8 rounded-xl bg-surface flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scrollable filter content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0 20px" }}>
              <FilterPanel {...fs} />
            </div>

            {/* Sticky footer CTA */}
            <div style={{
              padding: "12px 20px 24px", flexShrink: 0,
              borderTop: "1px solid hsl(var(--border)/0.5)",
              background: "hsl(var(--card))",
            }}>
              <button
                onClick={() => setFiltersOpen(false)}
                style={{
                  width: "100%", background: "hsl(var(--primary))", color: "#fff",
                  border: "none", borderRadius: "14px", padding: "13px 0",
                  fontSize: "13px", fontWeight: 800, cursor: "pointer",
                }}
              >
                نمایش {persianNumber(filtered.length)} کالا
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container py-16 text-center text-muted-foreground text-sm">در حال بارگذاری...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
