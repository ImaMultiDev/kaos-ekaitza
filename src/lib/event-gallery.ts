import type { Event, EventImage } from "@prisma/client";

export type EventWithImages = Event & { images: EventImage[] };

export type EventGalleryItem = {
  id: string;
  url: string;
  caption: string | null;
};

export function trimImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/** Imágenes únicas: cartel principal + extras de BD */
export function buildEventGallery(event: EventWithImages): EventGalleryItem[] {
  const seen = new Set<string>();
  const items: EventGalleryItem[] = [];

  const add = (id: string, url: string | null | undefined, caption: string | null) => {
    const clean = trimImageUrl(url);
    if (!clean || seen.has(clean)) return;
    seen.add(clean);
    items.push({ id, url: clean, caption });
  };

  add("featured", event.featuredImage, null);

  for (const image of event.images) {
    add(image.id, image.url, image.caption);
  }

  return items;
}

/** Cartel principal + segunda imagen (máx. 2) para la ficha del evento */
export function getEventPosterImages(
  event: EventWithImages,
): EventGalleryItem[] {
  return buildEventGallery(event).slice(0, 2);
}

export function getEventHeroImage(event: EventWithImages): string | null {
  const all = buildEventGallery(event);
  return all[0]?.url ?? null;
}

export function normalizeEvent<T extends EventWithImages>(event: T): T {
  return {
    ...event,
    featuredImage: trimImageUrl(event.featuredImage),
    images: event.images.map((img) => ({
      ...img,
      url: trimImageUrl(img.url) ?? img.url,
    })),
  };
}
