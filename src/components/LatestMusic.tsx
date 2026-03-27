"use client";

import { useState } from "react";
import { Play, Clock, Calendar, X } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLatestSongs } from "@/lib/database";
import { formatDate } from "@/lib/utils";

interface LatestMusicProps {
  songs?: Awaited<ReturnType<typeof getLatestSongs>>;
}

interface TrackItem {
  id: number;
  title: string;
  duration: string;
  releaseDate: string;
  description: string;
  message: string;
  spotifyUrl: string | null;
  youtubeUrl: string;
  downloadUrl: string;
  image: string;
}

const LatestMusic = ({ songs = [] }: LatestMusicProps) => {
  const t = useTranslations("LatestMusic");
  const locale = useLocale();
  const [selectedTrack, setSelectedTrack] = useState<TrackItem | null>(null);

  const latestTracks = songs.map((song, index) => ({
    id: index + 1,
    title: song.title,
    duration: song.duration || "0:00",
    releaseDate: song.createdAt.toISOString().split("T")[0],
    description: song.message || t("songFallback"),
    message: song.message || t("messageFallback"),
    spotifyUrl: song.spotifyUrl || null,
    youtubeUrl: song.youtubeUrl || "#",
    downloadUrl: "#",
    image: song.coverImage || "",
  }));

  const formatTrackDate = (dateString: string) =>
    formatDate(dateString, locale);

  const openTrackModal = (track: TrackItem) => {
    setSelectedTrack(track);
  };

  const closeTrackModal = () => {
    setSelectedTrack(null);
  };

  return (
    <>
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="ska-stripes-horizontal h-2 w-32 mx-auto mb-6 rounded"></div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              {t("titlePart1")}{" "}
              <span className="text-red-500">{t("titlePart2")}</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t("subtitle")}
            </p>
          </div>

          {/* Lista de canciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {latestTracks.map((track) => (
              <div
                key={track.id}
                className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden punk-hover group flex flex-col cursor-pointer"
                onClick={() => openTrackModal(track)}
              >
                {/* Imagen de la canción */}
                {track.image && (
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      src={track.image}
                      alt={track.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority={track.id === 1}
                    />
                    {/* Banda ska decorativa */}
                    <div className="absolute bottom-0 left-0 w-full h-2 ska-stripes-horizontal opacity-60"></div>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  {/* Título */}
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 mb-3">
                    {track.title}
                  </h3>

                  {/* Botones Spotify y YouTube debajo del título */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {track.spotifyUrl && (
                      <a
                        href={track.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-md transition-colors duration-300 text-xs font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                        <span>Spotify</span>
                      </a>
                    )}
                    {track.youtubeUrl && track.youtubeUrl !== "#" && (
                      <a
                        href={track.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors duration-300 text-xs font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Play className="w-4 h-4" />
                        <span>YouTube</span>
                      </a>
                    )}
                  </div>

                  {/* Metadatos */}
                  <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{track.duration}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatTrackDate(track.releaseDate)}</span>
                    </span>
                  </div>

                  {/* Mensaje (máx. 3 líneas en tarjeta) */}
                  {track.message && (
                    <div className="flex-1 mt-auto">
                      <blockquote className="text-red-400 italic text-sm font-medium border-l-2 border-red-600 pl-3 line-clamp-3">
                        &ldquo;{track.message}&rdquo;
                      </blockquote>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center">
            <div className="ska-stripes h-2 w-48 mx-auto mb-8 rounded"></div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {t("moreTitle")}
            </h3>
            <p className="text-gray-300 mb-6">{t("moreSubtitle")}</p>
            <Link
              href="/album"
              className="btn-punk inline-flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              <span>{t("allDiscography")}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Modal de canción */}
      {selectedTrack && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeTrackModal}
        >
          <div
            className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {selectedTrack.title}
                  </h2>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6 text-gray-400 text-sm mb-4">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {selectedTrack.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatTrackDate(selectedTrack.releaseDate)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeTrackModal}
                  className="text-gray-400 hover:text-white ml-4 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="p-6">
              {/* Imagen destacada */}
              {selectedTrack.image && (
                <div className="h-64 relative overflow-hidden rounded-lg mb-6">
                  <Image
                    src={selectedTrack.image}
                    alt={selectedTrack.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 w-full h-2 ska-stripes-horizontal opacity-60"></div>
                </div>
              )}

              {/* Contenido de la canción */}
              <div className="prose prose-invert max-w-none">
                {selectedTrack.message && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {t("messageHeading")}
                    </h3>
                    <blockquote className="text-red-400 italic text-lg font-medium border-l-4 border-red-600 pl-4 py-2">
                      &ldquo;{selectedTrack.message}&rdquo;
                    </blockquote>
                  </div>
                )}

                {/* Enlaces de la canción */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {t("listenHeading")}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedTrack.spotifyUrl && (
                      <a
                        href={selectedTrack.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg transition-colors duration-300 font-medium"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                        <span>{t("spotifyListen")}</span>
                      </a>
                    )}
                    {selectedTrack.youtubeUrl &&
                      selectedTrack.youtubeUrl !== "#" && (
                        <a
                          href={selectedTrack.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors duration-300 font-medium"
                        >
                          <Play className="w-4 h-4" />
                          <span>{t("youtubeWatch")}</span>
                        </a>
                      )}
                  </div>
                </div>

                {/* Mensaje de cierre */}
                <div className="bg-red-600/10 border-l-4 border-red-600 p-4 rounded-r-lg">
                  <p className="text-red-400 italic font-medium">
                    &ldquo;{t("modalQuote")}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Footer del modal */}
            <div className="p-6 border-t border-gray-700 bg-gray-800/50">
              <div className="flex justify-end">
                <button
                  onClick={closeTrackModal}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                >
                  {t("close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LatestMusic;
