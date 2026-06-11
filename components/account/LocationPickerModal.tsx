"use client";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { X, Check } from "lucide-react";
import { persianNumber } from "@/lib/utils";

/* Custom orange pin — avoids Leaflet's default marker image path issues with bundlers */
const pinIcon = L.divIcon({
  html: `<svg width="34" height="34" viewBox="0 0 24 24" fill="#FF6B00" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.35))">
    <path d="M12 0C7.6 0 4 3.6 4 8c0 5.4 7 15.5 7.3 15.9.2.3.6.4.9.1.1 0 .1-.1.1-.1C12.5 23.5 20 13.4 20 8c0-4.4-3.6-8-8-8z"/>
    <circle cx="12" cy="8" r="3.2" fill="#fff"/>
  </svg>`,
  className: "",
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});

const DEFAULT_CENTER: [number, number] = [35.6892, 51.389]; // Tehran

function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface LocationPickerModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (lat: number, lng: number) => void;
  initial?: { lat?: number; lng?: number };
}

export default function LocationPickerModal({ open, onClose, onConfirm, initial }: LocationPickerModalProps) {
  const [pos, setPos] = useState<[number, number]>(
    initial?.lat != null && initial?.lng != null ? [initial.lat, initial.lng] : DEFAULT_CENTER
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      {/* Sheet / dialog */}
      <div
        className="absolute bottom-0 inset-x-0 md:inset-x-auto md:left-1/2 md:top-1/2 md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-[560px] md:h-[600px] bg-card rounded-t-3xl md:rounded-3xl shadow-xl flex flex-col animate-slide-up overflow-hidden"
        style={{ maxHeight: "85vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-border/40 flex-shrink-0">
          <h3 className="font-extrabold text-sm">مشخص کردن موقعیت روی نقشه</h3>
          <button onClick={onClose} aria-label="بستن" className="w-8 h-8 rounded-xl bg-surface flex items-center justify-center">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Map */}
        <div className="flex-1 min-h-[320px] relative">
          <MapContainer center={pos} zoom={13} style={{ height: "100%", width: "100%" }} attributionControl={false}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker
              position={pos}
              icon={pinIcon}
              draggable
              eventHandlers={{
                dragend: (e) => {
                  const ll = e.target.getLatLng();
                  setPos([ll.lat, ll.lng]);
                },
              }}
            />
            <ClickHandler onPick={(lat, lng) => setPos([lat, lng])} />
          </MapContainer>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/40 flex-shrink-0 space-y-3">
          <p className="text-xs text-muted-foreground text-center" dir="ltr">
            {persianNumber(pos[0].toFixed(5))}, {persianNumber(pos[1].toFixed(5))}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => onConfirm(pos[0], pos[1])}
              className="flex-1 bg-primary text-white font-bold rounded-2xl py-3 text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-primary"
            >
              <Check className="h-4 w-4" />
              تایید موقعیت
            </button>
            <button
              onClick={onClose}
              className="bg-surface border border-border/60 font-semibold rounded-2xl px-5 py-3 text-sm"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
