import { Metadata } from "next";
import { getAlbums, generateAlbumSlug } from "@/lib/database";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Music, ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Discografía - Kaos Ekaitza | Ska-Punk Antifascista",
  description:
    "Descubre toda la discografía del canal ska-punk antifascista Kaos Ekaitza. Álbumes cargados de mensaje social, resistencia pacífica y lucha por la justicia social.",
  keywords: [
    "discografía kaos ekaitza",
    "ska-punk antifascista",
    "música consciente",
    "álbumes ska-punk",
    "música protesta",
    "kaos ekaitza canciones",
    "ska-punk comprometido",
    "música social",
  ],
  openGraph: {
    title: "Discografía - Kaos Ekaitza | Ska-Punk Antifascista",
    description:
      "Descubre toda la discografía del canal ska-punk antifascista Kaos Ekaitza. Álbumes cargados de mensaje social y resistencia pacífica.",
    url: "https://kaosekaitza.com/album",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discografía - Kaos Ekaitza | Ska-Punk Antifascista",
    description:
      "Descubre toda la discografía del canal ska-punk antifascista Kaos Ekaitza.",
  },
};

export default async function AlbumPage() {
  const albums = await getAlbums();

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Header */}
      <section className="py-10 md:py-20 bg-gradient-punk">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Nuestra Discografía
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Cada álbum es una declaración de resistencia. Cada canción, un grito
            de esperanza. Descubre nuestra discografía completa cargada de
            mensaje social.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a
              href="https://open.spotify.com/intl-es/artist/1reWo4KzVQLgqOwNXrVgr4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              <span>Escuchar en Spotify</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/@KaosEkaitza"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Ver en YouTube</span>
            </a>
          </div>
        </div>
      </section>

      {/* Albums Grid */}
      <section className="pt-6 pb-12 md:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {albums.map((album) => {
              const albumSlug = generateAlbumSlug(album.title);
              return (
                <div
                  key={album.id}
                  className="group bg-gray-900 border border-gray-800 rounded-lg overflow-hidden punk-hover transition-all duration-300 hover:border-red-600"
                >
                  <Link href={`/album/${albumSlug}`} className="block">
                    {/* Album Cover */}
                    <div className="relative h-96 bg-gradient-punk overflow-hidden">
                      {album.coverImage ? (
                        <Image
                          src={album.coverImage}
                          alt={album.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Music className="w-16 h-16 text-white opacity-50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

                      {/* Album Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-red-400 transition-colors">
                          {album.title}
                        </h2>
                        <div className="flex items-center gap-4 text-white/80 text-sm">
                          <div className="flex items-center gap-2">
                            <Music className="w-4 h-4" />
                            <span>{album.songs.length} canciones</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(album.releaseDate).toLocaleDateString(
                                "es-ES",
                                {
                                  year: "numeric",
                                  month: "long",
                                },
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Album Description */}
                  <div className="p-6">
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {album.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      {album.spotifyUrl && (
                        <a
                          href={album.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1DB954] hover:bg-[#1ed760] text-white text-xs font-bold rounded transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                          </svg>
                          Spotify
                        </a>
                      )}
                      {album.youtubeUrl && (
                        <a
                          href={album.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded transition-colors"
                        >
                          YouTube
                        </a>
                      )}
                    </div>
                    <Link
                      href={`/album/${albumSlug}`}
                      className="flex items-center text-red-500 font-semibold text-sm group-hover:text-red-400 transition-colors w-fit"
                    >
                      Ver álbum completo
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
