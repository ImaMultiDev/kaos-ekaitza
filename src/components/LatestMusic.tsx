"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Download, ExternalLink, Clock, Calendar, X } from "lucide-react";
import Image from "next/image";
import { getLatestSongs } from "@/lib/database";

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
  youtubeUrl: string;
  downloadUrl: string;
  image: string;
}

const LatestMusic = ({ songs = [] }: LatestMusicProps) => {
  const [selectedTrack, setSelectedTrack] = useState<TrackItem | null>(null);

  // Usar las canciones reales de la base de datos
  const latestTracks = songs.map((song, index) => ({
    id: index + 1,
    title: song.title,
    duration: song.duration || "0:00",
    releaseDate: song.createdAt.toISOString().split("T")[0],
    description: song.message || "Canción ska-punk con mensaje social",
    message: song.message || "Música consciente para el cambio social pacífico",
    youtubeUrl: song.youtubeUrl || "#",
    downloadUrl: "#",
    // Usar la imagen de la base de datos
    image: song.coverImage || "",
  }));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
              Última <span className="text-red-500">Música</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nuestros últimos lanzamientos cargados de mensaje social y energía
              ska-punk. Cada canción es una declaración de resistencia pacífica.
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
                  {/* Título y controles */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 flex-1 pr-4">
                      {track.title}
                    </h3>
                    {track.youtubeUrl && track.youtubeUrl !== "#" ? (
                      <a
                        href={track.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 flex-shrink-0 group/play"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Play className="w-5 h-5 text-white group-hover/play:text-white transition-colors" />
                      </a>
                    ) : (
                      <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 opacity-50">
                        <Play className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Metadatos */}
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{track.duration}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(track.releaseDate)}</span>
                    </span>
                  </div>

                  {/* Descripción */}
                  <div className="flex-1 mb-4">
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      {track.description}
                    </p>
                    {track.message && (
                      <blockquote className="text-red-400 italic text-sm font-medium border-l-2 border-red-600 pl-3">
                        &ldquo;{track.message}&rdquo;
                      </blockquote>
                    )}
                  </div>

                  {/* Enlaces y acciones */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {track.youtubeUrl && track.youtubeUrl !== "#" && (
                      <a
                        href={track.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors duration-300 text-xs font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>YouTube</span>
                      </a>
                    )}
                    {track.downloadUrl && track.downloadUrl !== "#" && (
                      <a
                        href={track.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-300 text-xs font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Download className="w-3 h-3" />
                        <span>Descargar</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center">
            <div className="ska-stripes h-2 w-48 mx-auto mb-8 rounded"></div>
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Quieres escuchar más?
            </h3>
            <p className="text-gray-300 mb-6">
              Explora toda nuestra discografía y descubre el poder del ska-punk
              consciente.
            </p>
            <Link
              href="/album"
              className="btn-punk inline-flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              <span>Ver Toda la Discografía</span>
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
                  <div className="flex items-center gap-6 text-gray-400 text-sm mb-4">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {selectedTrack.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedTrack.releaseDate)}
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
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Descripción
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {selectedTrack.description}
                  </p>
                </div>

                {selectedTrack.message && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Mensaje
                    </h3>
                    <blockquote className="text-red-400 italic text-lg font-medium border-l-4 border-red-600 pl-4 py-2">
                      &ldquo;{selectedTrack.message}&rdquo;
                    </blockquote>
                  </div>
                )}

                {/* Enlaces de la canción */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Escuchar
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedTrack.youtubeUrl &&
                      selectedTrack.youtubeUrl !== "#" && (
                        <a
                          href={selectedTrack.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors duration-300 font-medium"
                        >
                          <Play className="w-4 h-4" />
                          <span>Ver en YouTube</span>
                        </a>
                      )}
                  </div>
                </div>

                {/* Mensaje de cierre */}
                <div className="bg-red-600/10 border-l-4 border-red-600 p-4 rounded-r-lg">
                  <p className="text-red-400 italic font-medium">
                    &ldquo;La música es el arma de los pueblos que quieren ser
                    libres. Cada canción es un grito de resistencia
                    pacífica.&rdquo;
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
                  Cerrar
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
