import type { Product, Category } from "@/types";

export const categories: Category[] = [
  { id: "1", name: "موبایل",           slug: "mobile",   icon: "📱" },
  { id: "2", name: "لپ‌تاپ",           slug: "laptop",   icon: "💻" },
  { id: "3", name: "پوشاک",            slug: "clothing", icon: "👕" },
  { id: "4", name: "خانه و آشپزخانه",  slug: "home",     icon: "🏠" },
  { id: "5", name: "ورزش",             slug: "sports",   icon: "⚽" },
  { id: "6", name: "زیبایی",           slug: "beauty",   icon: "💄" },
];

/*
  All image IDs below are confirmed-working Unsplash photos
  used successfully in this project from the start.
  Format: https://images.unsplash.com/photo-<ID>?w=400&h=400&fit=crop
*/

export const products: Product[] = [
  {
    id: "1",
    name: "گوشی سامسونگ گلکسی A54",
    slug: "samsung-galaxy-a54",
    description: "گوشی هوشمند سامسونگ با دوربین 50 مگاپیکسل، نمایشگر Super AMOLED و باتری 5000 میلی‌آمپر ساعت.",
    price: 12_500_000, originalPrice: 15_000_000, discount: 17,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400&h=400&fit=crop",
    ],
    category: categories[0], brand: "Samsung", stock: 15, rating: 4.5, reviewCount: 128,
    tags: ["موبایل", "سامسونگ", "5G"], isNew: false, isFeatured: true,
    specifications: { "سیستم‌عامل": "Android 14", "پردازنده": "Exynos 1380", RAM: "8 GB", "حافظه": "256 GB", "دوربین": "50 MP", "باتری": "5000 mAh" },
  },
  {
    id: "2",
    name: "ایرپاد پرو اپل",
    slug: "apple-airpods-pro",
    description: "ایرپاد پرو با قابلیت حذف نویز فعال، کیفیت صدای Spatial Audio و باتری 30 ساعته.",
    price: 8_900_000, originalPrice: 9_500_000, discount: 6,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    ],
    category: categories[0], brand: "Apple", stock: 8, rating: 4.8, reviewCount: 256,
    tags: ["هندزفری", "اپل", "بی‌سیم"], isNew: true, isFeatured: true,
  },
  {
    id: "3",
    name: "لپ‌تاپ لنوو IdeaPad 5",
    slug: "lenovo-ideapad-5",
    description: "لپ‌تاپ قدرتمند با پردازنده Intel Core i7 نسل دوازدهم، رم 16 گیگابایت و SSD 512 گیگابایت.",
    price: 32_000_000, originalPrice: 36_000_000, discount: 11,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    ],
    category: categories[1], brand: "Lenovo", stock: 5, rating: 4.3, reviewCount: 74,
    tags: ["لپ‌تاپ", "لنوو", "ویندوز"], isNew: false, isFeatured: true,
    specifications: { "پردازنده": "Intel Core i7-1255U", RAM: "16 GB DDR5", "حافظه": "512 GB SSD", "نمایشگر": "15.6 اینچ FHD", "کارت گرافیک": "Intel Iris Xe" },
  },
  {
    id: "4",
    name: "تیشرت ورزشی نایک",
    slug: "nike-sport-tshirt",
    description: "تیشرت ورزشی با پارچه Dri-FIT برای جذب رطوبت در حین ورزش.",
    price: 890_000, originalPrice: 1_200_000, discount: 26,
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    ],
    category: categories[2], brand: "Nike", stock: 30, rating: 4.2, reviewCount: 45,
    tags: ["تیشرت", "ورزشی", "نایک"], isNew: false, isFeatured: false,
  },
  {
    id: "5",
    name: "چرخ گوشت فیلیپس",
    slug: "philips-meat-grinder",
    description: "چرخ گوشت برقی با موتور 1500 وات، مناسب برای استفاده خانگی.",
    price: 2_800_000, originalPrice: 3_200_000, discount: 13,
    images: [
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop",
    ],
    category: categories[3], brand: "Philips", stock: 12, rating: 4.6, reviewCount: 89,
    tags: ["لوازم آشپزخانه", "فیلیپس"], isNew: true, isFeatured: false,
  },
  {
    id: "6",
    name: "کفش ورزشی آدیداس Ultraboost",
    slug: "adidas-ultraboost",
    description: "کفش دویدن با فوم Boost برای راحتی بیشتر در مسافت‌های طولانی.",
    price: 4_500_000, originalPrice: 5_500_000, discount: 18,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop",
    ],
    category: categories[4], brand: "Adidas", stock: 20, rating: 4.7, reviewCount: 163,
    tags: ["کفش", "ورزشی", "آدیداس"], isNew: false, isFeatured: true,
  },
  {
    id: "7",
    name: "کرم مرطوب‌کننده نیوآ",
    slug: "nivea-moisturizer",
    description: "کرم مرطوب‌کننده 24 ساعته مناسب برای پوست‌های خشک و حساس.",
    price: 350_000,
    images: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop"],
    category: categories[5], brand: "Nivea", stock: 50, rating: 4.4, reviewCount: 212,
    tags: ["کرم", "مرطوب‌کننده", "نیوآ"], isNew: false, isFeatured: false,
  },
  {
    id: "8",
    name: "ساعت هوشمند شیائومی Mi Watch",
    slug: "xiaomi-mi-watch",
    description: "ساعت هوشمند با GPS داخلی، پایش ضربان قلب و عمر باتری 16 روزه.",
    price: 3_200_000, originalPrice: 3_800_000, discount: 16,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
    ],
    category: categories[0], brand: "Xiaomi", stock: 18, rating: 4.1, reviewCount: 97,
    tags: ["ساعت", "هوشمند", "شیائومی"], isNew: true, isFeatured: false,
  },

  /* ── New products — images from the same confirmed-working pool ── */

  {
    id: "9",
    name: "آیفون ۱۵ پرو",
    slug: "apple-iphone-15-pro",
    description: "پیشرفته‌ترین آیفون با تراشه A17 Pro، دوربین ۴۸ مگاپیکسل و فریم تیتانیومی.",
    price: 52_000_000, originalPrice: 58_000_000, discount: 10,
    images: [
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    ],
    category: categories[0], brand: "Apple", stock: 10, rating: 4.9, reviewCount: 315,
    tags: ["موبایل", "اپل", "آیفون"], isNew: true, isFeatured: true,
    specifications: { "سیستم‌عامل": "iOS 17", "پردازنده": "A17 Pro", RAM: "8 GB", "حافظه": "256 GB", "دوربین": "48 MP" },
  },
  {
    id: "10",
    name: "هدفون سونی WH-1000XM5",
    slug: "sony-wh-1000xm5",
    description: "بهترین هدفون نویز-کنسلینگ بازار با 30 ساعت شارژدهی و صدای Hi-Res.",
    price: 14_500_000, originalPrice: 16_000_000, discount: 9,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    ],
    category: categories[0], brand: "Sony", stock: 12, rating: 4.8, reviewCount: 198,
    tags: ["هدفون", "سونی", "نویز-کنسلینگ"], isNew: true, isFeatured: true,
  },
  {
    id: "11",
    name: "آیپد ایر ۵",
    slug: "apple-ipad-air-5",
    description: "تبلت آیپد ایر با تراشه M1، نمایشگر 10.9 اینچ Liquid Retina و پشتیبانی از Apple Pencil.",
    price: 28_000_000,
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    ],
    category: categories[0], brand: "Apple", stock: 7, rating: 4.7, reviewCount: 143,
    tags: ["تبلت", "اپل", "آیپد"], isNew: true, isFeatured: false,
  },
  {
    id: "12",
    name: "ماوس گیمینگ لاجیتک G502",
    slug: "logitech-g502",
    description: "ماوس حرفه‌ای گیمینگ با سنسور HERO 25K و وزن تنظیم‌پذیر.",
    price: 2_100_000, originalPrice: 2_500_000, discount: 16,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop",
    ],
    category: categories[1], brand: "Logitech", stock: 25, rating: 4.6, reviewCount: 187,
    tags: ["ماوس", "گیمینگ", "لاجیتک"], isNew: false, isFeatured: false,
  },
  {
    id: "13",
    name: "اسپیکر بلوتوث JBL Charge 5",
    slug: "jbl-charge-5",
    description: "اسپیکر بلوتوث ضدآب با صدای قدرتمند، باتری 20 ساعته و قابلیت پاوربانک.",
    price: 4_200_000, originalPrice: 4_800_000, discount: 13,
    images: [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=400&fit=crop",
    ],
    category: categories[0], brand: "JBL", stock: 20, rating: 4.5, reviewCount: 124,
    tags: ["اسپیکر", "بلوتوث", "JBL"], isNew: false, isFeatured: true,
  },
  {
    id: "14",
    name: "ساعت هوشمند Samsung Galaxy Watch 6",
    slug: "samsung-galaxy-watch-6",
    description: "ساعت هوشمند با پایش سلامت پیشرفته، صفحه روشن AMOLED و باتری 40 ساعته.",
    price: 9_800_000, originalPrice: 11_000_000, discount: 11,
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    ],
    category: categories[0], brand: "Samsung", stock: 15, rating: 4.4, reviewCount: 89,
    tags: ["ساعت", "هوشمند", "سامسونگ"], isNew: false, isFeatured: true,
  },
];

export const banners = [
  {
    id: "1",
    title: "تخفیف ویژه موبایل",
    subtitle: "تا ۳۰٪ تخفیف روی تمام گوشی‌ها",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=400&fit=crop",
    href: "/products?category=mobile",
    bg: "from-blue-700 to-violet-700",
  },
  {
    id: "2",
    title: "فروش ویژه لپ‌تاپ",
    subtitle: "بهترین قیمت‌های بازار",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=400&fit=crop",
    href: "/products?category=laptop",
    bg: "from-rose-600 to-orange-500",
  },
  {
    id: "3",
    title: "هدفون و صدا",
    subtitle: "تجربه صدای حرفه‌ای",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop",
    href: "/products?category=mobile",
    bg: "from-emerald-600 to-teal-600",
  },
];

/* ── Rich category groups (with sub-categories) ──
   Shared by the desktop mega-menu (Header) and the mobile categories page.
   `slug` maps to an existing product category for filtering. */
export interface CategoryGroup {
  id: string;
  name: string;
  icon: string;
  slug: string;
  subs: string[];
}

export const categoryGroups: CategoryGroup[] = [
  { id: "mobile",   name: "موبایل و تبلت",      icon: "📱", slug: "mobile",   subs: ["گوشی هوشمند", "تبلت", "اکسسوری موبایل", "شارژر و کابل", "سیم‌کارت"] },
  { id: "laptop",   name: "لپ‌تاپ و کامپیوتر", icon: "💻", slug: "laptop",   subs: ["لپ‌تاپ", "کامپیوتر دسکتاپ", "مانیتور", "هارد و SSD", "RAM و حافظه"] },
  { id: "audio",    name: "صوتی و تصویری",       icon: "🎧", slug: "mobile",   subs: ["هدفون و ایرباد", "بلندگو بی‌سیم", "تلویزیون", "پروجکتور", "سیستم صوتی خانگی"] },
  { id: "home",     name: "خانه و آشپزخانه",     icon: "🏠", slug: "home",     subs: ["لوازم آشپزخانه", "لوازم خانگی برقی", "دکوراسیون", "روشنایی", "ابزار و یراق‌آلات"] },
  { id: "clothing", name: "پوشاک و کفش",         icon: "👕", slug: "clothing", subs: ["پوشاک مردانه", "پوشاک زنانه", "کفش مردانه", "کفش زنانه", "اکسسوری پوشیدنی"] },
  { id: "sports",   name: "ورزش و سرگرمی",       icon: "⚽", slug: "sports",   subs: ["تجهیزات ورزشی", "پوشاک ورزشی", "دوچرخه و اسکوتر", "کمپینگ و طبیعت‌گردی", "بازی‌های ویدیویی"] },
  { id: "beauty",   name: "زیبایی و سلامت",      icon: "💄", slug: "beauty",   subs: ["مراقبت پوست", "آرایشی", "عطر و ادکلن", "مراقبت مو", "بهداشت شخصی"] },
];
