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

  const getYouTubeEmbedUrl = (url?: string | null) => {
    if (!url) return null;
    try {
      const parsed = new URL(url);
      const list = parsed.searchParams.get("list");
      const v = parsed.searchParams.get("v");

      if (list) {
        return `https://www.youtube.com/embed/videoseries?list=${list}`;
      }

      if (parsed.hostname.includes("youtu.be")) {
        const id = parsed.pathname.replace("/", "");
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }

      if (v) {
        return `https://www.youtube.com/embed/${v}`;
      }
    } catch {
      return null;
    }

    return null;
  };

  const embedUrl = getYouTubeEmbedUrl(album.youtubeUrl);

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
            <div className="md:col-span-1 flex justify-center md:justify-start">
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
            <div className="md:col-span-2 text-white text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
                {album.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-6 text-white/80 text-sm">
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
                <p className="text-lg text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0">
                  {album.description}
                </p>
              )}

              {/* Enlaces externos */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {album.spotifyUrl && (
                  <a
                    href={album.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Escuchar en Spotify
                  </a>
                )}
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Player YouTube */}
      {embedUrl && (
        <section className="bg-black py-10 border-b border-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-black text-white mb-4">
              Escucha el álbum aquí
            </h3>
            <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-800 bg-gray-900">
              <iframe
                src={`${embedUrl}&rel=0`}
                title={`Reproductor de ${album.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </section>
      )}

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
