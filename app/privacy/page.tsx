import type { Metadata } from "next";

export const metadata: Metadata = { title: "حریم خصوصی" };

const sections = [
  {
    title: "۱. جمع‌آوری اطلاعات",
    body: "نیتو تنها اطلاعاتی را که برای پردازش سفارش و بهبود تجربه خرید شما ضروری است جمع‌آوری می‌کند؛ شامل نام، شماره تماس، آدرس و سابقه خرید.",
  },
  {
    title: "۲. استفاده از اطلاعات",
    body: "اطلاعات شما تنها برای پردازش سفارش، ارسال کالا، اطلاع‌رسانی تخفیف‌ها و بهبود خدمات استفاده می‌شود و هرگز در اختیار اشخاص ثالث قرار نمی‌گیرد.",
  },
  {
    title: "۳. امنیت اطلاعات",
    body: "تمام اطلاعات شما با استفاده از پروتکل‌های امنیتی روز و درگاه‌های بانکی معتبر محافظت می‌شود. اطلاعات کارت بانکی شما هرگز نزد نیتو ذخیره نمی‌شود.",
  },
  {
    title: "۴. کوکی‌ها",
    body: "ما از کوکی‌ها برای بهبود تجربه کاربری، نگهداری سبد خرید و شخصی‌سازی پیشنهادها استفاده می‌کنیم. می‌توانید کوکی‌ها را از تنظیمات مرورگر خود مدیریت کنید.",
  },
  {
    title: "۵. حقوق کاربر",
    body: "شما در هر زمان می‌توانید اطلاعات حساب خود را مشاهده، ویرایش یا حذف کنید. برای حذف کامل حساب کاربری می‌توانید با پشتیبانی تماس بگیرید.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="container py-6 md:py-10 max-w-3xl">
      <h1 className="text-2xl font-black mb-2">حریم خصوصی</h1>
      <p className="text-sm text-muted-foreground mb-7">
        حفظ حریم خصوصی شما برای ما اهمیت دارد. لطفاً سیاست زیر را مطالعه کنید.
      </p>

      <div className="bg-card rounded-2xl border border-border/40 shadow-card divide-y divide-border/40">
        {sections.map((s) => (
          <section key={s.title} className="p-5">
            <h2 className="font-bold text-base mb-2">{s.title}</h2>
            <p className="text-sm text-muted-foreground leading-loose">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
