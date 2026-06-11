"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "چطور می‌توانم سفارش ثبت کنم؟",
    a: "کافیست محصول مورد نظر را به سبد خرید اضافه کرده و در صفحه تسویه حساب، آدرس و روش پرداخت را انتخاب کنید. سفارش شما بلافاصله ثبت می‌شود.",
  },
  {
    q: "هزینه و زمان ارسال چقدر است؟",
    a: "برای خریدهای بالای ۵۰۰ هزار تومان ارسال رایگان است. در غیر این صورت هزینه ارسال ۵۰ هزار تومان محاسبه می‌شود. سفارش‌ها معمولاً کمتر از ۴۸ ساعت تحویل می‌شوند.",
  },
  {
    q: "آیا امکان پرداخت در محل وجود دارد؟",
    a: "بله، در زمان تسویه حساب می‌توانید روش «پرداخت در محل» را انتخاب کنید و هنگام تحویل سفارش، مبلغ را پرداخت نمایید.",
  },
  {
    q: "شرایط مرجوع کردن کالا چیست؟",
    a: "تا ۷ روز پس از دریافت کالا، در صورتی که محصول استفاده نشده و در بسته‌بندی اصلی باشد، امکان مرجوع کردن وجود دارد.",
  },
  {
    q: "آیا محصولات گارانتی دارند؟",
    a: "تمام محصولات نیتو اصل بوده و در صورت داشتن گارانتی، اطلاعات آن در صفحه محصول درج شده است.",
  },
  {
    q: "چطور سفارشم را پیگیری کنم؟",
    a: "پس از ورود به حساب کاربری، از بخش «سفارش‌ها» می‌توانید وضعیت و کد پیگیری هر سفارش را مشاهده کنید.",
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="container py-6 md:py-10 max-w-2xl">
      <div className="mb-7 text-center">
        <h1 className="text-2xl font-black mb-2">سوالات متداول</h1>
        <p className="text-sm text-muted-foreground">پاسخ پرتکرارترین سوالات کاربران نیتو</p>
      </div>

      <div className="space-y-3">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="bg-card rounded-2xl border border-border/40 shadow-card overflow-hidden"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-3 p-4 text-right"
              >
                <span className="font-bold text-sm">{item.q}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-300",
                    isOpen && "rotate-180 text-primary"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-4 text-sm text-muted-foreground leading-loose">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
