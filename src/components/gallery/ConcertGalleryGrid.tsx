"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useTranslations } from "next-intl";
import RemoteImage from "@/components/RemoteImage";
import { cn } from "@/lib/utils";
import type { ConcertGalleryImage } from "@/data/concert-gallery";

type Props = {
  images: ConcertGalleryImage[];
  defaultAlt: string;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
};

export default function ConcertGalleryGrid({
  images,
  defaultAlt,
  closeLabel,
  prevLabel,
  nextLabel,
}: Props) {
  const t = useTranslations("Galeria");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);
  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, showNext, showPrev]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 space-y-4 md:space-y-5">
        {images.map((image, index) => (
          <button
            key={image.url}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "group relative w-full break-inside-avoid rounded-xl overflow-hidden",
              "border border-zinc-800/90 bg-zinc-900/80 shadow-xl shadow-black/40",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500",
              "transition-transform duration-300 hover:-translate-y-0.5 hover:border-red-600/50",
            )}
          >
            <RemoteImage
              src={image.url}
              alt={image.caption ?? defaultAlt}
              width={1200}
              height={900}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ZoomIn className="w-9 h-9 text-white drop-shadow-lg" aria-hidden />
            </div>
            {image.caption && (
              <p className="absolute bottom-0 left-0 right-0 px-4 py-3 text-left text-sm font-semibold text-white/95 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
                {image.caption}
              </p>
            )}
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/94 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={images[activeIndex].caption ?? defaultAlt}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-zinc-900/90 border border-zinc-700 text-white hover:border-red-600 transition-colors"
            aria-label={closeLabel}
          >
            <X className="w-6 h-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-2 md:left-6 z-10 p-2 rounded-lg bg-zinc-900/90 border border-zinc-700 text-white hover:border-red-600 transition-colors"
                aria-label={prevLabel}
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-2 md:right-6 z-10 p-2 rounded-lg bg-zinc-900/90 border border-zinc-700 text-white hover:border-red-600 transition-colors"
                aria-label={nextLabel}
              >
                <ChevronRight className="w-7 h-7" />
              </button>
              <p className="absolute top-5 left-1/2 -translate-x-1/2 text-xs md:text-sm font-bold uppercase tracking-widest text-white/70">
                {t("counter", {
                  current: activeIndex + 1,
                  total: images.length,
                })}
              </p>
            </>
          )}

          <div
            className="relative w-full max-w-6xl max-h-[min(82vh,900px)] flex-1 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            <RemoteImage
              src={images[activeIndex].url}
              alt={images[activeIndex].caption ?? defaultAlt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {images[activeIndex].caption && (
            <p className="mt-4 max-w-2xl text-center text-sm md:text-base text-white/85 px-4">
              {images[activeIndex].caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}
