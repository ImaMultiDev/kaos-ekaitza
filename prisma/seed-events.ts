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
    title: "Laster",
    slug: "laster-2026-08-15",
    startDate: "2026-08-15",
    featuredImage:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1783284765/lasterpost_letdh4.png",
    published: true,
    detailsPending: false,
    pageAccess: "TEASER",
    publishedAt: "2026-07-05T00:00:00.000Z",
    tags: ["laster", "proximamente"],
  },
  {
    title: "Laster",
    slug: "laster-2026-08-29",
    startDate: "2026-08-29",
    featuredImage:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1783284765/lasterpost_letdh4.png",
    published: true,
    detailsPending: false,
    pageAccess: "TEASER",
    publishedAt: "2026-07-05T00:00:00.000Z",
    tags: ["laster", "proximamente"],
  },
];

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
