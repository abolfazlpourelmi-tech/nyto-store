import Link from "next/link";
import { Send, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="hidden md:block bg-[#111] text-white mt-16">
      <div className="container py-10">
        <div className="grid grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="text-2xl font-black text-primary tracking-tighter">NYTO</span>
              <span className="text-xs text-gray-400">استور</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              فروشگاه اینترنتی نیتو، با بیش از ۱۰۰۰ محصول اصل و ارسال سریع به سراسر ایران.
            </p>
            <div className="flex gap-2">
              {[Send, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-primary transition-colors flex items-center justify-center"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-sm mb-3 text-white/90">دسترسی سریع</h3>
            <ul className="space-y-2">
              {[
                { label: "خانه",          href: "/"               },
                { label: "همه محصولات",   href: "/products"       },
                { label: "سبد خرید",      href: "/cart"           },
                { label: "پیگیری سفارش",  href: "/account/orders" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-bold text-sm mb-3 text-white/90">راهنما</h3>
            <ul className="space-y-2">
              {[
                { label: "درباره ما",      href: "/about"   },
                { label: "تماس با ما",     href: "/contact" },
                { label: "سوالات متداول",  href: "/faq"     },
                { label: "قوانین و مقررات",href: "/terms"   },
                { label: "حریم خصوصی",    href: "/privacy" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm mb-3 text-white/90">تماس با ما</h3>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                ۰۲۱-۱۲۳۴۵۶۷۸
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                info@nytostore.ir
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              <div className="bg-white/8 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-gray-400">نماد اعتماد</div>
              <div className="bg-white/8 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-gray-400">درگاه امن</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 py-4">
        <div className="container text-center text-xs text-gray-600">
          © ۱۴۰۳ نیتو استور — تمام حقوق محفوظ است
        </div>
      </div>
    </footer>
  );
}
