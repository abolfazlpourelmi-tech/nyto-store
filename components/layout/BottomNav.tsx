"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid2X2, ShoppingCart, Package, User } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/",        icon: Home,        label: "خانه"    },
  { href: "/products",icon: Grid2X2,     label: "محصولات" },
  { href: "/cart",    icon: ShoppingCart,label: "سبد"      },
  { href: "/orders",  icon: Package,     label: "سفارش‌ها" },
  { href: "/account", icon: User,        label: "حساب"     },
];

export function BottomNav() {
  const pathname  = usePathname();
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-card/95 backdrop-blur-md border-t border-border safe-pb">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          const isCart = href === "/cart";

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 py-2 px-3 relative"
            >
              {/* Active indicator dot at top */}
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
                {isCart && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center px-[3px] leading-none">
                    {itemCount > 9 ? "۹+" : itemCount}
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
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
