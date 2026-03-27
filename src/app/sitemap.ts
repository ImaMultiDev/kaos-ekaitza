import { MetadataRoute } from "next";
import { getPosts, getAlbums, generateAlbumSlug } from "@/lib/database";
import { routing } from "@/i18n/routing";

const baseUrl = "https://kaosekaitza.com";

const staticPaths = [
  "",
  "noticias",
  "album",
  "sobre-nosotros",
  "contacto",
  "merchandising",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, albums] = await Promise.all([
    getPosts(true),
    getAlbums(),
  ]);

  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  const staticPriority: Record<(typeof staticPaths)[number], number> = {
    "": 1,
    noticias: 0.85,
    album: 0.9,
    "sobre-nosotros": 0.8,
    contacto: 0.7,
    merchandising: 0.75,
  };

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      const urlPath = path ? `/${locale}/${path}` : `/${locale}`;
      entries.push({
        url: `${baseUrl}${urlPath}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: staticPriority[path],
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
  }

  return entries;
}
