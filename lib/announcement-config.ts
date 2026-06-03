export type AnnouncementConfig = {
  enabled: boolean;
  type: "text" | "image";
  /** text mode: Persian string | image mode: full URL to image or GIF */
  content: string;
  /** where the whole bar links to — use "/" for home, full URL for external */
  link: string;
  /** any valid CSS color / gradient string */
  background: string;
  /** text color (text mode only) */
  textColor: string;
};

const announcementConfig: AnnouncementConfig = {
  enabled: true,
  type: "text",
  content: "انتخاب درست، تا آخرش می‌مونه 💚  —  ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان",
  link: "/products",
  background: "linear-gradient(to left, #c0392b, #e74c3c)",
  textColor: "#ffffff",
};

export default announcementConfig;
