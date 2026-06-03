"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

const DESCRIPTION =
  "نیتو یک فروشگاه آنلاین تخصصی در زمینه گوشی موبایل، لوازم جانبی و گجت‌های دیجیتال است. ما با ارائه محصولات اصل و باکیفیت از برندهای معتبر، تجربه خریدی مطمئن و آسان را برای شما فراهم می‌کنیم. ضمانت اصالت کالا، ارسال سریع و پشتیبانی حرفه‌ای، اولویت‌های اصلی ما هستند.";

const BADGES = [
  { id: "enamad",    name: "اینماد",          subtitle: "نماد اعتماد الکترونیکی",    link: "https://enamad.ir"    },
  { id: "samandehi", name: "ساماندهی",         subtitle: "سامانه ساماندهی پستی",       link: "https://samandehi.ir" },
  { id: "union",     name: "اتحادیه",          subtitle: "کسب‌وکارهای اینترنتی",       link: "https://irannsr.org"  },
];

export function AboutSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      style={{
        borderRadius: "20px",
        border: "1px solid hsl(var(--border) / 0.4)",
        background: "hsl(var(--card))",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}
    >
      {/*
        Desktop: 3-column grid — text | 1px divider | badges
        Mobile : single column (stacked)
        In RTL, CSS grid column 1 is the logical-start = physical RIGHT ✓
      */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr]">

        {/* ── RIGHT column — store description ── */}
        <div style={{ padding: "28px 28px 24px" }}>
          <h2
            style={{
              fontSize: "15px",
              fontWeight: 800,
              lineHeight: 1.6,
              marginTop: 0,
              marginBottom: "12px",
              color: "hsl(var(--foreground))",
            }}
          >
            نیتو؛ فروشگاه تخصصی موبایل و لوازم جانبی
          </h2>

          {/* Tailwind line-clamp avoids vendor-prefix TS issues */}
          <p
            className={expanded ? "" : "line-clamp-2"}
            style={{
              fontSize: "13px",
              lineHeight: 1.9,
              color: "hsl(var(--muted-foreground))",
              margin: 0,
              marginBottom: "10px",
            }}
          >
            {DESCRIPTION}
          </p>

          <button
            onClick={() => setExpanded((v) => !v)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 700,
              color: "hsl(var(--primary))",
              padding: 0,
            }}
          >
            {expanded
              ? <><ChevronUp style={{ width: "13px", height: "13px" }} /> بستن</>
              : <>مشاهده بیشتر <ChevronDown style={{ width: "13px", height: "13px" }} /></>
            }
          </button>
        </div>

        {/* ── Vertical divider (desktop only) ── */}
        <div
          className="hidden md:block"
          style={{ background: "hsl(var(--border) / 0.5)", margin: "24px 0" }}
        />

        {/* ── LEFT column — trust badges ── */}
        <div style={{ padding: "28px 28px 24px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 800,
              color: "hsl(var(--muted-foreground))",
              marginTop: 0,
              marginBottom: "16px",
              letterSpacing: "0.3px",
            }}
          >
            نشان‌های اعتماد
          </p>

          <div style={{ display: "flex", flexDirection: "row", gap: "12px", flexWrap: "wrap" }}>
            {BADGES.map((badge) => (
              <Link
                key={badge.id}
                href={badge.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 12px",
                  borderRadius: "14px",
                  border: "1px solid hsl(var(--border) / 0.5)",
                  background: "hsl(var(--surface))",
                  textDecoration: "none",
                  flex: "1 1 80px",
                  minWidth: "80px",
                  maxWidth: "108px",
                }}
              >
                {/*
                  ╔══════════════════════════════════════════════════════╗
                  ║  TRUST BADGE EMBED — replace placeholder div below   ║
                  ║                                                        ║
                  ║  eNAMAD embed code looks like:                        ║
                  ║    <a referrerpolicy="origin" target="_blank"          ║
                  ║       href="https://trustseal.enamad.ir/?id=XXX&Code=YYY"> ║
                  ║      <img src="https://trustseal.enamad.ir/logo.aspx?id=XXX&Code=YYY" ║
                  ║           alt="اینماد" id="YYY"                       ║
                  ║           style={{ cursor:"pointer",width:48,height:48 }} /> ║
                  ║    </a>                                                ║
                  ║                                                        ║
                  ║  Paste it in place of the gray placeholder <div>      ║
                  ║  below — the outer Link wrapper handles routing.       ║
                  ╚══════════════════════════════════════════════════════╝
                */}
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "10px",
                    background: "hsl(var(--border) / 0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "9px",
                    fontWeight: 800,
                    color: "hsl(var(--muted-foreground))",
                    textAlign: "center",
                    lineHeight: 1.3,
                    padding: "4px",
                  }}
                >
                  {badge.name}
                </div>

                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "hsl(var(--muted-foreground))",
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                >
                  {badge.subtitle}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* ── Copyright bar ── */}
      <div
        style={{
          borderTop: "1px solid hsl(var(--border) / 0.5)",
          padding: "14px 28px",
          textAlign: "center",
          background: "hsl(var(--surface))",
        }}
      >
        <p style={{ fontSize: "12px", color: "hsl(var(--muted-foreground))", margin: 0 }}>
          تمام حقوق این وب‌سایت متعلق به فروشگاه نیتو می‌باشد.
        </p>
      </div>
    </section>
  );
}
