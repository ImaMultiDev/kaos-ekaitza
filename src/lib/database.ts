import { prisma } from "./prisma";
import { normalizeEvent } from "./event-gallery";

// Obtener todas las canciones con su álbum
export async function getSongs() {
  try {
    const songs = await prisma.song.findMany({
      include: {
        album: true,
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return songs;
  } catch (error) {
    console.error("Error obteniendo canciones:", error);
    return [];
  }
}

// Obtener últimas canciones para el home
export async function getLatestSongs(limit: number = 3) {
  try {
    const songs = await prisma.song.findMany({
      include: {
        album: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
    return songs;
  } catch (error) {
    console.error("Error obteniendo últimas canciones:", error);
    return [];
  }
}

// Obtener álbumes con sus canciones
export async function getAlbums() {
  try {
    const albums = await prisma.album.findMany({
      include: {
        songs: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        releaseDate: "desc",
      },
    });
    return albums;
  } catch (error) {
    console.error("Error obteniendo álbumes:", error);
    return [];
  }
}

// Obtener un álbum específico por ID
export async function getAlbumById(id: string) {
  try {
    const album = await prisma.album.findUnique({
      where: { id },
      include: {
        songs: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    return album;
  } catch (error) {
    console.error("Error obteniendo álbum:", error);
    return null;
  }
}

// Función auxiliar para generar slug
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Alias usado por álbumes
export function generateAlbumSlug(title: string): string {
  return generateSlug(title);
}

// Obtener álbum por slug (título normalizado)
export async function getAlbumBySlug(slug: string) {
  try {
    const albums = await prisma.album.findMany({
      include: {
        songs: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    // Buscar el álbum cuyo slug coincida
    const album = albums.find((a) => generateSlug(a.title) === slug);

    return album || null;
  } catch (error) {
    console.error("Error obteniendo álbum por slug:", error);
    return null;
  }
}

// Obtener posts del blog
export async function getPosts(published: boolean = true) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  } catch (error) {
    console.error("Error obteniendo posts:", error);
    return [];
  }
}

// Obtener post por slug (solo publicados por defecto)
export async function getPostBySlug(slug: string, published: boolean = true) {
  try {
    const post = await prisma.post.findFirst({
      where: {
        slug,
        ...(published ? { published: true } : {}),
      },
    });
    return post;
  } catch (error) {
    console.error("Error obteniendo post por slug:", error);
    return null;
  }
}

// Obtener elementos de galería
export async function getGalleryItems() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return items;
  } catch (error) {
    console.error("Error obteniendo elementos de galería:", error);
    return [];
  }
}

// Crear suscriptor al newsletter
export async function createSubscriber(email: string) {
  try {
    const subscriber = await prisma.subscriber.create({
      data: {
        email,
      },
    });
    return subscriber;
  } catch (error) {
    console.error("Error creando suscriptor:", error);
    throw error;
  }
}

// Crear mensaje de contacto
export async function createContact(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const contact = await prisma.contact.create({
      data,
    });
    return contact;
  } catch (error) {
    console.error("Error creando contacto:", error);
    throw error;
  }
}

// Obtener canción por YouTube URL
export async function getSongByYouTubeUrl(youtubeUrl: string) {
  try {
    const song = await prisma.song.findFirst({
      where: {
        youtubeUrl,
      },
      include: {
        album: true,
      },
    });
    return song;
  } catch (error) {
    console.error("Error obteniendo canción por YouTube URL:", error);
    return null;
  }
}

const eventInclude = {
  images: {
    orderBy: { sortOrder: "asc" as const },
  },
};

function startOfTodayUtc(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function getEvents(published = true) {
  try {
    const events = await prisma.event.findMany({
      where: published ? { published: true } : undefined,
      include: eventInclude,
      orderBy: { startDate: "desc" },
    });
    return events.map(normalizeEvent);
  } catch (error) {
    console.error("Error obteniendo eventos:", error);
    return [];
  }
}

export async function getUpcomingEvents(
  limit?: number,
  options?: { fullPagesOnly?: boolean; teasersAfterFull?: boolean },
) {
  try {
    const baseWhere = {
      published: true,
      startDate: { gte: startOfTodayUtc() },
    };

    if (options?.teasersAfterFull) {
      const [fullEvents, teaserEvents] = await Promise.all([
        prisma.event.findMany({
          where: { ...baseWhere, pageAccess: "FULL" },
          include: eventInclude,
          orderBy: { startDate: "asc" },
        }),
        prisma.event.findMany({
          where: { ...baseWhere, pageAccess: "TEASER" },
          include: eventInclude,
          orderBy: { startDate: "asc" },
        }),
      ]);

      const merged = [...fullEvents, ...teaserEvents].map(normalizeEvent);
      return limit ? merged.slice(0, limit) : merged;
    }

    const events = await prisma.event.findMany({
      where: {
        ...baseWhere,
        ...(options?.fullPagesOnly ? { pageAccess: "FULL" } : {}),
      },
      include: eventInclude,
      orderBy: { startDate: "asc" },
      ...(limit ? { take: limit } : {}),
    });
    return events.map(normalizeEvent);
  } catch (error) {
    console.error("Error obteniendo próximos eventos:", error);
    return [];
  }
}

export async function getPastEvents(limit = 24) {
  try {
    const events = await prisma.event.findMany({
      where: {
        published: true,
        startDate: { lt: startOfTodayUtc() },
      },
      include: eventInclude,
      orderBy: { startDate: "desc" },
      take: limit,
    });
    return events.map(normalizeEvent);
  } catch (error) {
    console.error("Error obteniendo eventos pasados:", error);
    return [];
  }
}

export async function getEventBySlug(slug: string, published = true) {
  try {
    const event = await prisma.event.findFirst({
      where: {
        slug,
        ...(published ? { published: true } : {}),
      },
      include: eventInclude,
    });
    return event ? normalizeEvent(event) : null;
  } catch (error) {
    console.error("Error obteniendo evento por slug:", error);
    return null;
  }
}
