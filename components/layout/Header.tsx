"use client";
import Link from "next/link";
import { ShoppingCart, Search, User, Bell, Menu, ChevronLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/mock-data";

// ── Mega-menu category data ──────────────────────────────────
const MEGA_CATS = [
  { id: "mobile",   name: "موبایل و تبلت",         icon: "📱", slug: "mobile",   subs: ["گوشی هوشمند", "تبلت", "اکسسوری موبایل", "شارژر و کابل", "سیم‌کارت"] },
  { id: "laptop",   name: "لپ‌تاپ و کامپیوتر",    icon: "💻", slug: "laptop",   subs: ["لپ‌تاپ", "کامپیوتر دسکتاپ", "مانیتور", "هارد و SSD", "RAM و حافظه"] },
  { id: "audio",    name: "صوتی و تصویری",          icon: "🎧", slug: "mobile",   subs: ["هدفون و ایرباد", "بلندگو بی‌سیم", "تلویزیون", "پروجکتور", "سیستم صوتی خانگی"] },
  { id: "home",     name: "خانه و آشپزخانه",        icon: "🏠", slug: "home",     subs: ["لوازم آشپزخانه", "لوازم خانگی برقی", "دکوراسیون", "روشنایی", "ابزار و یراق‌آلات"] },
  { id: "clothing", name: "پوشاک و کفش",            icon: "👕", slug: "clothing", subs: ["پوشاک مردانه", "پوشاک زنانه", "کفش مردانه", "کفش زنانه", "اکسسوری پوشیدنی"] },
  { id: "sports",   name: "ورزش و سرگرمی",          icon: "⚽", slug: "sports",   subs: ["تجهیزات ورزشی", "پوشاک ورزشی", "دوچرخه و اسکوتر", "کمپینگ و طبیعت‌گردی", "بازی‌های ویدیویی"] },
  { id: "beauty",   name: "زیبایی و سلامت",         icon: "💄", slug: "beauty",   subs: ["مراقبت پوست", "آرایشی", "عطر و ادکلن", "مراقبت مو", "بهداشت شخصی"] },
];

// ── Sample notifications ─────────────────────────────────────
const NOTIFS = [
  { id: 1, icon: "🚚", title: "سفارش شما ارسال شد",    sub: "سفارش #۱۲۳۴ در راه است",                  time: "۱۰ دقیقه پیش" },
  { id: 2, icon: "🎁", title: "تخفیف ویژه فعال شد",    sub: "۲۰٪ تخفیف روی محصولات انتخابی",           time: "۲ ساعت پیش"   },
  { id: 3, icon: "✅", title: "سفارش تحویل داده شد",   sub: "سفارش #۱۲۱۸ با موفقیت تحویل شد",          time: "دیروز"         },
];

export function Header() {
  const [query,      setQuery]      = useState("");
  const [notifOpen,  setNotifOpen]  = useState(false);
  const [megaOpen,   setMegaOpen]   = useState(false);
  const [hoveredCat, setHoveredCat] = useState<string>(MEGA_CATS[0].id);
  const megaTimer = useRef<ReturnType<typeof setTimeout>>();
  const itemCount = useCartStore((s) => s.itemCount());
  const user      = useAuthStore((s) => s.user);
  const router    = useRouter();

  // Persisted auth state is only reliable after mount (avoids hydration mismatch)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const accountLabel = mounted && user ? user.fullName.split(" ")[0] : "ورود";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/products?q=${encodeURIComponent(query.trim())}`);
  };

  // Hover helpers with 180 ms grace period for mega-menu
  const openMega  = () => { clearTimeout(megaTimer.current); setMegaOpen(true); };
  const closeMega = () => { megaTimer.current = setTimeout(() => setMegaOpen(false), 180); };

  const activeMegaCat = MEGA_CATS.find((c) => c.id === hoveredCat) ?? MEGA_CATS[0];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        width: "100%",
        backgroundColor: "hsl(var(--card))",
        borderBottom: "1px solid hsl(var(--border) / 0.6)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* ── Notification backdrop ── */}
      {notifOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 39 }}
          onClick={() => setNotifOpen(false)}
        />
      )}

      {/* ══════════════ Main row ══════════════ */}
      <div
        className="container"
        style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "60px", gap: "12px" }}
      >
        {/* Logo */}
        <Link href="/" style={{ flexShrink: 0, textDecoration: "none" }}>
          <span style={{ fontSize: "22px", fontWeight: 900, color: "hsl(var(--primary))", letterSpacing: "-1px" }}>
            NYTO
          </span>
        </Link>

        {/* Search — centered, capped at 440px */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 0 }}>
          <form
            onSubmit={handleSearch}
            style={{ width: "100%", maxWidth: "440px", position: "relative" }}
          >
            <div style={{ position: "absolute", insetBlock: 0, right: "12px", display: "flex", alignItems: "center", pointerEvents: "none" }}>
              <Search style={{ width: "14px", height: "14px", color: "hsl(var(--muted-foreground))" }} />
            </div>
            <input
              type="text"
              placeholder="جستجو در نیتو..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: "100%",
                height: "38px",
                background: "hsl(var(--surface))",
                border: "1px solid hsl(var(--border) / 0.7)",
                borderRadius: "999px",
                paddingRight: "38px",
                paddingLeft: "14px",
                fontSize: "13px",
                outline: "none",
                color: "hsl(var(--foreground))",
              }}
            />
          </form>
        </div>

        {/* ── Icon group ── */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "2px", flexShrink: 0 }}>

          {/* Bell + notification panel */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setNotifOpen((o) => !o)}
              aria-label="اعلان‌ها"
              style={{
                width: "38px", height: "38px", display: "flex", alignItems: "center",
                justifyContent: "center", borderRadius: "10px", border: "none",
                background: notifOpen ? "hsl(var(--surface))" : "transparent",
                cursor: "pointer", color: "hsl(var(--foreground))", position: "relative",
              }}
            >
              <Bell style={{ width: "18px", height: "18px" }} />
              {/* Unread dot */}
              <span style={{
                position: "absolute", top: "8px", right: "8px",
                width: "7px", height: "7px", background: "#e74c3c",
                borderRadius: "50%", border: "2px solid hsl(var(--card))",
              }} />
            </button>

            {notifOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: 0,
                  width: "310px",
                  zIndex: 50,
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border) / 0.6)",
                  borderRadius: "16px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
                  overflow: "hidden",
                }}
              >
                {/* Panel header */}
                <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid hsl(var(--border) / 0.5)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 800, fontSize: "14px" }}>اعلان‌ها</span>
                  <span style={{ fontSize: "11px", color: "hsl(var(--primary))", fontWeight: 700, background: "hsl(var(--primary) / 0.1)", padding: "2px 8px", borderRadius: "999px" }}>
                    ۳ جدید
                  </span>
                </div>

                {/* Items */}
                {NOTIFS.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid hsl(var(--border) / 0.3)",
                      display: "flex", gap: "10px", alignItems: "flex-start",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "10px",
                      background: "hsl(var(--surface))", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: "16px", flexShrink: 0,
                    }}>
                      {n.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "12px", fontWeight: 700, margin: 0, marginBottom: "2px" }}>{n.title}</p>
                      <p style={{ fontSize: "11px", color: "hsl(var(--muted-foreground))", margin: 0, marginBottom: "3px" }}>{n.sub}</p>
                      <p style={{ fontSize: "10px", color: "hsl(var(--muted-foreground))", margin: 0 }}>{n.time}</p>
                    </div>
                  </div>
                ))}

                {/* Footer link */}
                <Link
                  href="/"
                  onClick={() => setNotifOpen(false)}
                  style={{
                    display: "block", textAlign: "center", padding: "12px 16px",
                    fontSize: "12px", fontWeight: 700, color: "hsl(var(--primary))",
                    textDecoration: "none",
                  }}
                >
                  همه اعلان‌ها
                </Link>
              </div>
            )}
          </div>

          {/* Login pill — desktop only */}
          <Link
            href="/account"
            className="hidden md:flex"
            style={{
              alignItems: "center", gap: "5px",
              padding: "0 12px", height: "34px", borderRadius: "10px",
              background: "hsl(var(--surface))",
              border: "1px solid hsl(var(--border) / 0.7)",
              color: "hsl(var(--foreground))", textDecoration: "none",
              fontSize: "12px", fontWeight: 700, flexShrink: 0,
            }}
          >
            <User style={{ width: "14px", height: "14px" }} />
            {accountLabel}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            style={{
              position: "relative", width: "38px", height: "38px",
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "10px", color: "hsl(var(--foreground))",
            }}
          >
            <ShoppingCart style={{ width: "19px", height: "19px" }} />
            {itemCount > 0 && (
              <span style={{
                position: "absolute", top: "0px", left: "0px",
                minWidth: "17px", height: "17px", background: "hsl(var(--primary))",
                color: "#fff", fontSize: "10px", fontWeight: 900, borderRadius: "999px",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "0 3px", lineHeight: 1,
              }}>
                {itemCount > 9 ? "۹+" : itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* ══════════════ Desktop nav row + mega-menu ══════════════ */}
      <div
        className="hidden md:block"
        style={{ borderTop: "1px solid hsl(var(--border) / 0.5)", position: "relative" }}
      >
        <div
          className="container"
          style={{
            display: "flex", flexDirection: "row", alignItems: "center",
            height: "42px", gap: "2px",
          }}
        >
          {/* Mega-menu trigger */}
          <button
            onMouseEnter={() => { openMega(); setHoveredCat(MEGA_CATS[0].id); }}
            onMouseLeave={closeMega}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "0 12px", height: "30px",
              background: megaOpen ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.08)",
              border: "1px solid",
              borderColor: megaOpen ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.25)",
              borderRadius: "8px", cursor: "pointer",
              color: megaOpen ? "#fff" : "hsl(var(--primary))",
              fontSize: "12px", fontWeight: 800, flexShrink: 0,
              whiteSpace: "nowrap", transition: "background 0.15s, color 0.15s",
            }}
          >
            <Menu style={{ width: "13px", height: "13px" }} />
            دسته‌بندی کالاها
          </button>

          {/* Divider */}
          <span style={{ width: "1px", height: "18px", background: "hsl(var(--border) / 0.6)", margin: "0 6px", flexShrink: 0 }} />

          {/* Category chips */}
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              style={{
                fontSize: "12px", padding: "0 10px", height: "30px",
                borderRadius: "8px", color: "hsl(var(--muted-foreground))",
                textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0,
                display: "flex", alignItems: "center", gap: "5px",
              }}
            >
              <span style={{ fontSize: "13px" }}>{cat.icon}</span>
              {cat.name}
            </Link>
          ))}
        </div>

        {/* ── Mega-menu panel ── */}
        {megaOpen && (
          <div
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            style={{
              position: "absolute", top: "100%", right: 0, left: 0, zIndex: 50,
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border) / 0.5)",
              borderTop: "none",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
              display: "flex",
              flexDirection: "row",
              overflow: "hidden",
              maxHeight: "360px",
            }}
          >
            {/* Category sidebar — RIGHT in RTL (first child) */}
            <div
              style={{
                width: "220px",
                flexShrink: 0,
                borderLeft: "1px solid hsl(var(--border) / 0.5)",
                overflowY: "auto",
                padding: "8px 0",
              }}
            >
              {MEGA_CATS.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  onMouseEnter={() => setHoveredCat(cat.id)}
                  onClick={() => setMegaOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 16px",
                    background: hoveredCat === cat.id ? "hsl(var(--primary) / 0.06)" : "transparent",
                    borderRight: hoveredCat === cat.id ? "3px solid hsl(var(--primary))" : "3px solid transparent",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "background 0.1s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                    <span style={{ fontSize: "16px" }}>{cat.icon}</span>
                    <span style={{
                      fontSize: "12px",
                      fontWeight: hoveredCat === cat.id ? 700 : 500,
                      color: hoveredCat === cat.id ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                    }}>
                      {cat.name}
                    </span>
                  </div>
                  <ChevronLeft style={{
                    width: "12px", height: "12px",
                    color: hoveredCat === cat.id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                    flexShrink: 0,
                  }} />
                </Link>
              ))}
            </div>

            {/* Subcategories — LEFT in RTL (second child) */}
            <div style={{ flex: 1, padding: "20px 24px", overflowY: "auto" }}>
              <p style={{ fontSize: "11px", fontWeight: 800, color: "hsl(var(--muted-foreground))", marginBottom: "14px", marginTop: 0, letterSpacing: "0.5px" }}>
                {activeMegaCat.name}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
                {activeMegaCat.subs.map((sub) => (
                  <Link
                    key={sub}
                    href={`/products?category=${activeMegaCat.slug}`}
                    onClick={() => setMegaOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "9px 12px", borderRadius: "10px",
                      background: "hsl(var(--surface))",
                      border: "1px solid hsl(var(--border) / 0.4)",
                      textDecoration: "none",
                      color: "hsl(var(--foreground))",
                      fontSize: "12px", fontWeight: 500,
                      transition: "background 0.1s",
                    }}
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
