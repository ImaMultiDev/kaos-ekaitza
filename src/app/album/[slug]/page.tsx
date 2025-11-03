import { Metadata } from "next";
import { getAlbumBySlug, getAlbums, generateAlbumSlug } from "@/lib/database";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, Music } from "lucide-react";
import { notFound } from "next/navigation";
import AlbumMusicGrid from "@/components/AlbumMusicGrid";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const albums = await getAlbums();

  return albums.map((album) => ({
    slug: generateAlbumSlug(album.title),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);

  if (!album) {
    return {
      title: "Álbum no encontrado - Kaos Ekaitza",
    };
  }

  return {
    title: `${album.title} - Kaos Ekaitza | Ska-Punk Antifascista`,
    description:
      album.description ||
      `Descubre ${album.title}, álbum de Kaos Ekaitza con ${album.songs.length} canciones de ska-punk antifascista.`,
    openGraph: {
      title: `${album.title} - Kaos Ekaitza`,
      description:
        album.description || `Descubre ${album.title} de Kaos Ekaitza.`,
      images: album.coverImage ? [album.coverImage] : [],
    },
  };
}

export default async function AlbumDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);

  if (!album) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Header con portada del álbum */}
      <section className="relative py-20 bg-gradient-punk overflow-hidden">
        {/* Imagen de fondo con overlay */}
        {album.coverImage && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={album.coverImage}
              alt={album.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Botón de regreso */}
          <Link
            href="/album"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver a Discografía</span>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Portada del álbum */}
            <div className="md:col-span-1">
              <div className="relative aspect-square bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-2xl">
                {album.coverImage ? (
                  <Image
                    src={album.coverImage}
                    alt={album.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Music className="w-16 h-16 text-white opacity-50" />
                  </div>
                )}
              </div>
            </div>

            {/* Información del álbum */}
            <div className="md:col-span-2 text-white">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
                {album.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mb-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  <span className="font-semibold">
                    {album.songs.length} canciones
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {new Date(album.releaseDate).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {album.description && (
                <p className="text-lg text-white/90 leading-relaxed mb-8 max-w-2xl">
                  {album.description}
                </p>
              )}

              {/* Enlaces externos */}
              <div className="flex flex-wrap gap-4">
                {album.youtubeUrl && (
                  <a
                    href={album.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Ver en YouTube
                  </a>
                )}
                {album.spotifyUrl && (
                  <a
                    href={album.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Escuchar en Spotify
                  </a>
                )}
                {album.bandcampUrl && (
                  <a
                    href={album.bandcampUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Bandcamp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de canciones del álbum */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
            Canciones
          </h2>
          <AlbumMusicGrid
            songs={album.songs.map((song) => ({
              ...song,
              album: {
                id: album.id,
                title: album.title,
                description: album.description,
                coverImage: album.coverImage,
                releaseDate: album.releaseDate,
                spotifyUrl: album.spotifyUrl,
                bandcampUrl: album.bandcampUrl,
                youtubeUrl: album.youtubeUrl,
                createdAt: album.createdAt,
                updatedAt: album.updatedAt,
              },
              comments: [],
            }))}
          />
        </div>
      </section>
    </div>
  );
}
