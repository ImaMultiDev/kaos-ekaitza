import { prisma } from "./prisma";

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

// Función auxiliar para generar slug del álbum
export function generateAlbumSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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
    const album = albums.find((a) => generateAlbumSlug(a.title) === slug);

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
