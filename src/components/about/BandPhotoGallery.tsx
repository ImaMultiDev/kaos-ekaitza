"use client";

import { useState } from "react";
import RemoteImage from "@/components/RemoteImage";
import { cn } from "@/lib/utils";

export type BandGalleryImage = {
  url: string;
  alt?: string;
};

type Props = {
  images: BandGalleryImage[];
  alt: string;
  selectLabel: string;
};

export default function BandPhotoGallery({ images, alt, selectLabel }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  if (!active) return null;

  return (
    <div className="space-y-4 md:space-y-5">
      <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-800 bg-gray-900">
        <RemoteImage
          key={active.url}
          src={active.url}
          alt={active.alt ?? alt}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority={activeIndex === 0}
        />
      </div>

      <div
        className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-thin"
        role="tablist"
        aria-label={selectLabel}
      >
        {images.map((image, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={image.url}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={`${selectLabel} ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative shrink-0 snap-start w-24 h-16 sm:w-28 sm:h-[4.5rem] md:w-32 md:h-20 rounded-md overflow-hidden border-2 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500",
                selected
                  ? "border-red-600 ring-2 ring-red-600/40 scale-[1.02]"
                  : "border-gray-800 opacity-75 hover:opacity-100 hover:border-red-600/50",
              )}
            >
              <RemoteImage
                src={image.url}
                alt=""
                fill
                className="object-cover"
                sizes="128px"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
