/**
 * Seed de eventos publicados. Añade o edita entradas en EVENTS y ejecuta:
 *   npm run db:seed-events
 */
import { PrismaClient, type EventPageAccess } from "@prisma/client";

const prisma = new PrismaClient();

type EventGallerySeed = {
  url: string;
  caption?: string;
};

type EventSeed = {
  title: string;
  slug: string;
  excerpt?: string;
  description?: string;
  venue?: string;
  city?: string;
  address?: string;
  /** YYYY-MM-DD */
  startDate: string;
  featuredImage?: string;
  instagramUrl?: string;
  published?: boolean;
  detailsPending?: boolean;
  pageAccess?: EventPageAccess;
  publishedAt?: string;
  tags?: string[];
  gallery?: EventGallerySeed[];
};

const EVENTS: EventSeed[] = [
  {
    title: "Agurain Rock",
    slug: "agurain-rock-2026",
    excerpt: "Festival Agurain Rock.",
    description: "La tormenta llega a Agurain\n\nIrailak 26 de Septiembre.",
    venue: "Fronton Zaharrean / Frontón Viejo",
    city: "Agurain (Araba)",
    startDate: "2026-09-26",
    featuredImage:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1783279643/723445196_18095678360014891_1171963311696358358_n_uomaze.jpg",
    gallery: [
      {
        url: "https://res.cloudinary.com/dzuug3ahf/image/upload/v1783279291/733485466_18099477494014891_1088522285836271498_n_jwab6k.webp",
        caption: "Cartel Agurain Rock 2026",
      },
    ],
    instagramUrl: "https://www.instagram.com/agurainrock/",
    published: true,
    detailsPending: false,
    publishedAt: "2026-07-05T00:00:00.000Z",
    tags: ["agurainrock", "alava", "araba", "EH", "Euskal Herria", "festival"],
  },
  {
    title: "Ekhifest",
    slug: "Ekhifest-2026",
    excerpt: "Festival Ekhifest.",
    description: "La tormenta llega al Ekhifest\n\nIrailak 19 de Septiembre.",
    venue: "",
    city: "Uribarri-Harana (Araba)",
    startDate: "2026-09-19",
    featuredImage:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1783279291/725163308_17893395981521990_3727695386451064351_n_czx1co.webp",
    gallery: [
      {
        url: "https://res.cloudinary.com/dzuug3ahf/image/upload/v1783279291/730628546_17890590375557544_577043893253703743_n_lcscit.webp",
        caption: "Cartel Ekhifest 2026",
      },
    ],
    instagramUrl: "https://www.instagram.com/ekhifest/",
    published: true,
    detailsPending: false,
    publishedAt: "2026-07-05T00:00:00.000Z",
    tags: ["ekhifest", "alava", "araba", "EH", "Euskal Herria", "festival"],
  },
  {
    title: "Concierto en Corella",
    slug: "corella-2026",
    excerpt: "Concierto en Corella (Navarra).",
    description: "La tormenta llega a Corella\n\nAbuztuak 15 de Agosto.",
    venue: "Plaza de Corella",
    city: "Corella (Nafarroa)",
    startDate: "2026-08-15",
    featuredImage:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1785521113/759687855_17897671620557544_7789763158379382333_n_k3m7to.webp",
    published: true,
    detailsPending: false,
    publishedAt: "2026-07-05T00:00:00.000Z",
    tags: [
      "corella",
      "navarra",
      "nafarroa",
      "EH",
      "Euskal Herria",
      "concierto",
    ],
  },
  {
    title: "III Karakol Rock",
    slug: "biurrun-karakol-rock-2026",
    excerpt: "Karakol-Rock III Biurrun (Navarra).",
    description:
      "La tormenta llega al Karakol Rock en su III edición\n\nAbuztuak 29 de Agosto.",
    city: "Biurrun (Nafarroa)",
    startDate: "2026-08-29",
    featuredImage:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1785521113/758386945_17938453500317023_1910691214609421941_n_b2r2ib.webp",
    instagramUrl: "https://www.instagram.com/froilanboys/",
    published: true,
    detailsPending: false,
    publishedAt: "2026-07-05T00:00:00.000Z",
    tags: [
      "biurrun",
      "navarra",
      "nafarroa",
      "EH",
      "Euskal Herria",
      "karakol rock",
    ],
  },
];

/** Slugs retirados del catálogo (p. ej. teasers sustituidos por fichas completas) */
const REMOVED_SLUGS = ["laster-2026-08-15", "laster-2026-08-29"];

function parseEventDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

async function seedEvent(entry: EventSeed) {
  const { gallery, startDate, publishedAt, ...rest } = entry;

  const data = {
    ...rest,
    startDate: parseEventDate(startDate),
    published: entry.published ?? true,
    detailsPending: entry.detailsPending ?? false,
    pageAccess: entry.pageAccess ?? "FULL",
    publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
    tags: entry.tags ?? [],
    featuredImage: entry.featuredImage?.trim() ?? null,
    instagramUrl: entry.instagramUrl?.trim() ?? null,
  };

  const event = await prisma.event.upsert({
    where: { slug: entry.slug },
    update: data,
    create: data,
  });

  await prisma.eventImage.deleteMany({ where: { eventId: event.id } });

  if (gallery?.length) {
    await prisma.eventImage.createMany({
      data: gallery.map((item, index) => ({
        eventId: event.id,
        url: item.url.trim(),
        caption: item.caption?.trim() ?? null,
        sortOrder: index,
      })),
    });
  }

  return event;
}

async function main() {
  console.log(`📅 Sincronizando ${EVENTS.length} evento(s)...`);

  for (const slug of REMOVED_SLUGS) {
    const removed = await prisma.event.deleteMany({ where: { slug } });
    if (removed.count > 0) {
      console.log(`  🗑️  Eliminado: ${slug}`);
    }
  }

  for (const entry of EVENTS) {
    const event = await seedEvent(entry);
    const imageCount = entry.gallery?.length ?? 0;
    console.log(
      `  ✅ ${event.title} (${event.slug}) — ${imageCount} foto(s) extra`,
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
