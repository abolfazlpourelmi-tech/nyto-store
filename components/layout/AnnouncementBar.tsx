"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import announcementConfig from "@/lib/announcement-config";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (!announcementConfig.enabled || dismissed) return null;

  const { type, content, link, background, textColor } = announcementConfig;

  const barStyle: React.CSSProperties = {
    width: "100%",
    background,
    color: textColor,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "36px",
  };

  const closeBtn = (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setDismissed(true);
      }}
      aria-label="بستن اعلان"
      style={{
        position: "absolute",
        left: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        background: "rgba(255,255,255,0.18)",
        border: "none",
        borderRadius: "6px",
        width: "24px",
        height: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: textColor,
        flexShrink: 0,
        padding: 0,
      }}
    >
      <X style={{ width: "13px", height: "13px" }} />
    </button>
  );

  if (type === "image") {
    return (
      <div style={barStyle}>
        <Link
          href={link}
          style={{ display: "block", width: "100%", lineHeight: 0 }}
        >
          <Image
            src={content}
            alt="اعلان ویژه"
            width={1440}
            height={48}
            unoptimized
            style={{ width: "100%", height: "48px", objectFit: "cover" }}
          />
        </Link>
        {closeBtn}
      </div>
    );
  }

  /* ── text mode ── */
  return (
    <div style={barStyle}>
      <Link
        href={link}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: "8px 44px",   /* 44px each side leaves room for the close btn */
          textDecoration: "none",
          color: textColor,
          fontSize: "12px",
          fontWeight: 700,
          lineHeight: 1.4,
          textAlign: "center",
        }}
      >
        {content}
      </Link>
      {closeBtn}
    </div>
  );
}
