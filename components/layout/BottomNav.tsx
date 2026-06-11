"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ComponentType } from "react";
import { Home, Grid2X2, ShoppingCart, Package, User } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";
import { CategoriesSheet } from "@/components/layout/CategoriesSheet";

const navItems = [
  { href: "/",               icon: Home,        label: "خانه"    },
  { href: "/categories",     icon: Grid2X2,     label: "دسته‌بندی" },
  { href: "/cart",           icon: ShoppingCart,label: "سبد"      },
  { href: "/account/orders", icon: Package,     label: "سفارش‌ها" },
  { href: "/account",        icon: User,        label: "حساب"     },
];

/* Shared visual for a nav entry (icon box + label + active indicator) */
function ItemInner({
  active, Icon, label, cartCount,
}: {
  active: boolean;
  Icon: ComponentType<{ className?: string }>;
  label: string;
  cartCount?: number;
}) {
  return (
    <>
      {active && (
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full" />
      )}
      <div className="relative">
        <div
          className={cn(
            "w-9 h-7 flex items-center justify-center rounded-xl transition-all duration-200",
            active && "bg-primary/10"
          )}
        >
          <Icon
            className={cn(
              "h-[19px] w-[19px] transition-colors",
              active ? "text-primary" : "text-muted-foreground"
            )}
          />
        </div>
        {cartCount != null && cartCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center px-[3px] leading-none">
            {cartCount > 9 ? "۹+" : cartCount}
          </span>
        )}
      </div>
      <span
        className={cn(
          "text-[10px] font-medium leading-none transition-colors",
          active ? "text-primary" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </>
  );
}

export function BottomNav() {
  const pathname  = usePathname();
  const itemCount = useCartStore((s) => s.itemCount());
  const [catOpen, setCatOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-card/95 backdrop-blur-md border-t border-border safe-pb">
        <div className="flex items-center justify-around h-16">
          {navItems.map(({ href, icon: Icon, label }) => {
            // Categories is a popup trigger, not a navigation link
            if (href === "/categories") {
              return (
                <button
                  key={href}
                  onClick={() => setCatOpen(true)}
                  className="flex flex-col items-center gap-0.5 py-2 px-3 relative bg-transparent border-0 cursor-pointer"
                >
                  <ItemInner active={catOpen} Icon={Icon} label={label} />
                </button>
              );
            }

            const active =
              href === "/"          ? pathname === "/"
              : href === "/account" ? pathname === "/account"
              : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-0.5 py-2 px-3 relative"
              >
                <ItemInner
                  active={active}
                  Icon={Icon}
                  label={label}
                  cartCount={href === "/cart" ? itemCount : undefined}
                />
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Categories popup — opens over the current page, closable */}
      <CategoriesSheet open={catOpen} onClose={() => setCatOpen(false)} />
    </>
  );
}
