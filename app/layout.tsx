import type { Metadata, Viewport } from "next";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/500.css";
import "@fontsource/vazirmatn/700.css";
import "@fontsource/vazirmatn/800.css";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header }    from "@/components/layout/Header";
import { Footer }    from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { CartProvider } from "@/components/cart/CartProvider";
import { Toaster }   from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default:  "نیتو استور | فروشگاه اینترنتی",
    template: "%s | نیتو استور",
  },
  description: "خرید آنلاین محصولات با بهترین قیمت",
  keywords:    ["فروشگاه اینترنتی", "خرید آنلاین", "نیتو"],
};

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  themeColor:   "#FF6B00",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen flex flex-col bg-background font-persian">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          {/* pb-20 on mobile clears the fixed bottom nav */}
          <main className="flex-1 pb-20 md:pb-0">
            {children}
          </main>
          <Footer />
          <BottomNav />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
