import { MetadataRoute } from "next";
import { getPosts, getAlbums, getEvents, generateAlbumSlug } from "@/lib/database";
import { isEventDetailAccessible } from "@/lib/event-access";
import { routing } from "@/i18n/routing";
import { isMerchEnabled } from "@/lib/merch-config";

const baseUrl = "https://kaosekaitza.com";

const baseStaticPaths = [
  "",
  "noticias",
  "album",
  "eventos",
  "sobre-nosotros",
  "contacto",
] as const;

const staticPriority: Record<string, number> = {
  "": 1,
  noticias: 0.85,
  album: 0.9,
  eventos: 0.88,
  "sobre-nosotros": 0.8,
  contacto: 0.7,
  merchandising: 0.75,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = isMerchEnabled
    ? ([...baseStaticPaths, "merchandising"] as const)
    : baseStaticPaths;
  const [posts, albums, events] = await Promise.all([
    getPosts(true),
    getAlbums(),
    getEvents(true),
  ]);

  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      const urlPath = path ? `/${locale}/${path}` : `/${locale}`;
      entries.push({
        url: `${baseUrl}${urlPath}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: staticPriority[path] ?? 0.5,
      });
    }

    for (const post of posts) {
      entries.push({
        url: `${baseUrl}/${locale}/noticias/${post.slug}`,
        lastModified: post.updatedAt ?? post.publishedAt ?? post.createdAt,
        changeFrequency: "weekly",
        priority: 0.75,
      });
    }

    for (const album of albums) {
      const slug = generateAlbumSlug(album.title);
      entries.push({
        url: `${baseUrl}/${locale}/album/${slug}`,
        lastModified: album.updatedAt ?? album.releaseDate ?? now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    for (const event of events) {
      if (!isEventDetailAccessible(event.pageAccess)) continue;
      entries.push({
        url: `${baseUrl}/${locale}/eventos/${event.slug}`,
        lastModified: event.updatedAt ?? event.publishedAt ?? event.startDate,
        changeFrequency: "weekly",
        priority: 0.82,
      });
    }
  }

  return entries;
}
