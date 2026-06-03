"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { banners } from "@/lib/mock-data";

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [fading,  setFading]  = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % banners.length);
        setFading(false);
      }, 200);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number) => {
    if (i === current) return;
    setFading(true);
    setTimeout(() => { setCurrent(i); setFading(false); }, 200);
  };

  const banner = banners[current];

  return (
    <div className="relative overflow-hidden rounded-2xl h-44 sm:h-56 md:h-72 select-none bg-muted">
      {/* ── Actual photo from picsum ── */}
      <Image
        key={banner.id}
        src={banner.image}
        alt={banner.title}
        fill
        priority
        className={cn(
          "object-cover transition-opacity duration-300",
          fading ? "opacity-0" : "opacity-100"
        )}
        sizes="(max-width: 768px) 100vw, 1200px"
        unoptimized
      />

      {/* ── Gradient overlay (colour-codes the banner + ensures text readability) ── */}
      <div className={cn("absolute inset-0 bg-gradient-to-l opacity-80", banner.bg)} />

      {/* ── Decorative shapes ── */}
      <div className="absolute -top-10 -left-10 w-52 h-52 rounded-full bg-white/10 blur-sm pointer-events-none" />
      <div className="absolute -bottom-14 -left-4 w-36 h-36 rounded-full bg-black/10 pointer-events-none" />

      {/* ── Text content ── */}
      <div
        className={cn(
          "relative h-full flex flex-col justify-center pr-6 pl-4 md:pr-14 md:pl-6 text-white transition-all duration-200",
          fading ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
        )}
      >
        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold mb-3 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          پیشنهاد ویژه
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-1.5 leading-tight drop-shadow">
          {banner.title}
        </h2>
        <p className="text-sm sm:text-base opacity-90 mb-4 font-medium drop-shadow-sm">
          {banner.subtitle}
        </p>
        <Link
          href={banner.href}
          className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-xs sm:text-sm px-4 py-2 rounded-full w-fit hover:bg-white/90 active:scale-95 transition-all shadow-lg"
        >
          مشاهده محصولات
          <ArrowLeft className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* ── Slide counter top-left ── */}
      <div className="absolute top-3 left-4 bg-black/25 backdrop-blur-sm rounded-full px-2 py-0.5 text-white text-[10px] font-semibold">
        {current + 1} / {banners.length}
      </div>

      {/* ── Dot indicators bottom-left ── */}
      <div className="absolute bottom-3 left-4 flex gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              "rounded-full transition-all duration-300",
              i === current ? "bg-white w-6 h-2" : "bg-white/45 w-2 h-2 hover:bg-white/65"
            )}
          />
        ))}
      </div>
    </div>
  );
}
