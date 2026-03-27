import { Metadata } from "next";
import { getAlbumBySlug, getAlbums, generateAlbumSlug } from "@/lib/database";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Calendar, Music, Youtube } from "lucide-react";
import { notFound } from "next/navigation";
import AlbumMusicGrid from "@/components/AlbumMusicGrid";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const albums = await getAlbums();
  return routing.locales.flatMap((locale) =>
    albums.map((album) => ({
      locale,
      slug: generateAlbumSlug(album.title),
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const album = await getAlbumBySlug(slug);
  const t = await getTranslations({ locale, namespace: "AlbumDetail" });

  if (!album) {
    return {
      title: t("notFoundTitle"),
    };
  }

  return {
    title: `${album.title} - Kaos Ekaitza | NAFARROA`,
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
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AlbumDetail");
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
      <section className="relative py-8 md:py-20 bg-gradient-punk overflow-hidden">
        {album.coverImage && (
          <div className="absolute inset-0 opacity-20 hidden md:block" aria-hidden>
            <Image
              src={album.coverImage}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black/55 md:bg-black/60" aria-hidden />

        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <Link
            href="/album"
            className="hidden md:inline-flex items-center gap-2 text-white/85 hover:text-white mb-4 md:mb-8 text-sm md:text-base transition-colors"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
            <span>{t("back")}</span>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 md:items-center min-w-0">
            <div className="md:col-span-1 flex justify-center md:justify-start min-w-0 w-full">
              <div className="relative w-full h-[min(72vw,20rem)] min-h-[17rem] sm:min-h-[19rem] md:h-96 md:min-h-0 rounded-2xl md:rounded-lg overflow-hidden border border-zinc-700/90 md:border-gray-800 shadow-[0_20px_55px_rgba(0,0,0,0.55)] md:shadow-2xl bg-gradient-punk ring-1 ring-red-600/25 md:ring-0">
                {album.coverImage ? (
                  <Image
                    src={album.coverImage}
                    alt={album.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 96vw, 33vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Music className="w-16 h-16 text-white opacity-50" />
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2 text-white text-center md:text-left min-w-0">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-3 md:mb-4 leading-tight tracking-tight">
                {album.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 mb-5 md:mb-6 text-white/85 md:text-white/80 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                  <span className="font-semibold">
                    {t("songsCount", { count: album.songs.length })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                  <span>
                    {new Date(album.releaseDate).toLocaleDateString(
                      locale === "eu" ? "eu-ES" : "es-ES",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </span>
                </div>
              </div>

              {album.description && (
                <p className="hidden md:block text-lg text-white/90 leading-relaxed mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0">
                  {album.description}
                </p>
              )}

              <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-3 md:gap-4">
                {album.spotifyUrl && (
                  <a
                    href={album.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto min-h-[48px] justify-center items-center gap-2 px-6 py-3 bg-[#1DB954] hover:bg-[#1ed760] active:scale-[0.98] text-white font-bold rounded-xl md:rounded-lg transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    {t("listenSpotify")}
                  </a>
                )}
                {album.youtubeUrl && (
                  <a
                    href={album.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto min-h-[48px] justify-center items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold rounded-xl md:rounded-lg transition-all"
                  >
                    <Youtube className="w-5 h-5 shrink-0" aria-hidden />
                    {t("watchYoutube")}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {embedUrl && (
        <section className="bg-black py-5 md:py-10 border-b border-gray-900">
          <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <h3 className="text-center text-lg sm:text-xl md:text-2xl font-black text-white mb-3 md:mb-4">
              {t("listenHere")}
            </h3>
            <div className="relative aspect-video rounded-xl md:rounded-lg overflow-hidden border border-zinc-800 bg-gray-900 ring-1 ring-red-600/10 md:ring-0 shadow-lg md:shadow-none">
              <iframe
                src={`${embedUrl}&rel=0`}
                title={t("iframeTitle", { title: album.title })}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </section>
      )}

      <section className="py-6 md:py-16 bg-black">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <AlbumMusicGrid
            compact
            tracksSectionTitle={t("tracksSectionTitle")}
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
