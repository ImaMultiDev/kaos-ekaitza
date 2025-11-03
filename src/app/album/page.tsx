import { Metadata } from "next";
import { getAlbums, generateAlbumSlug } from "@/lib/database";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Music, ArrowRight } from "lucide-react";

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
      <section className="py-20 bg-gradient-punk">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Nuestra Discografía
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Cada álbum es una declaración de resistencia. Cada canción, un grito
            de esperanza. Descubre nuestra discografía completa cargada de
            mensaje social.
          </p>
          <div className="ska-stripes h-2 w-48 mx-auto rounded"></div>
        </div>
      </section>

      {/* Albums Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {albums.map((album) => {
              const albumSlug = generateAlbumSlug(album.title);
              return (
                <Link
                  key={album.id}
                  href={`/album/${albumSlug}`}
                  className="group"
                >
                  <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden punk-hover transition-all duration-300 hover:border-red-600">
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
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Album Description */}
                    <div className="p-6">
                      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {album.description}
                      </p>
                      <div className="flex items-center text-red-500 font-semibold text-sm group-hover:text-red-400 transition-colors">
                        Ver álbum completo
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
