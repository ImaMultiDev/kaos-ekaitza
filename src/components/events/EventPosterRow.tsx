"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import EventImage from "@/components/events/EventImage";
import { cn } from "@/lib/utils";
import type { EventGalleryItem } from "@/lib/event-gallery";

type Props = {
  images: EventGalleryItem[];
  title: string;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
};

export default function EventPosterRow({
  images,
  title,
  closeLabel,
  prevLabel,
  nextLabel,
}: Props) {
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
      <div
        className={cn(
          "flex flex-col sm:flex-row gap-3 sm:gap-4 items-start pt-1",
          images.length === 1 && "max-w-md",
        )}
      >
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "group relative w-full rounded-lg overflow-hidden border border-zinc-800/80 bg-zinc-900 shadow-xl shadow-black/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500",
              images.length === 1 ? "max-w-md" : "sm:flex-1 sm:max-w-sm",
            )}
          >
            <EventImage
              src={image.url}
              alt={image.caption ?? title}
              width={1080}
              height={1620}
              className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              sizes={
                images.length === 1
                  ? "(max-width: 640px) 100vw, 28rem"
                  : "(max-width: 640px) 100vw, 50vw"
              }
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn
                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                aria-hidden
              />
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={title}
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
            </>
          )}

          <div
            className="relative w-full max-w-5xl max-h-[85vh] aspect-[2/3] md:aspect-auto md:h-[min(85vh,720px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <EventImage
              src={images[activeIndex].url}
              alt={images[activeIndex].caption ?? title}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {images[activeIndex].caption && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-xl text-center text-sm text-white/85 px-4">
              {images[activeIndex].caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}
