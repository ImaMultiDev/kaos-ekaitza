"use client";

import { useState } from "react";
import { Play, Pause, Calendar, Music, ExternalLink } from "lucide-react";
import { getAlbums } from "@/lib/database";

interface AlbumGridProps {
  albums?: Awaited<ReturnType<typeof getAlbums>>;
}

const AlbumGrid = ({ albums = [] }: AlbumGridProps) => {
  const [selectedAlbum, setSelectedAlbum] = useState<(typeof albums)[0] | null>(
    null
  );
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);

  const togglePlay = (trackId: number) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId);
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="ska-stripes h-2 w-48 mx-auto mb-8 rounded"></div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Nuestra <span className="text-red-500">Discografía</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Cada álbum es una declaración de resistencia pacífica. Música
            ska-punk cargada de mensaje social y antifascista.
          </p>
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {albums.map((album) => (
            <div
              key={album.id}
              className="bg-gray-900 rounded-lg overflow-hidden punk-hover group cursor-pointer"
              onClick={() => setSelectedAlbum(album)}
            >
              {/* Album Cover */}
              <div className="relative h-64 bg-gradient-punk">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Music className="w-16 h-16 text-white opacity-50" />
                </div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg group-hover:text-red-400 transition-colors">
                    {album.title}
                  </h3>
                </div>
              </div>

              {/* Album Info */}
              <div className="p-6">
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(album.releaseDate).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {album.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-red-500 font-semibold text-sm">
                    {album.songs.length} canciones
                  </span>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Play className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Album Detail Modal */}
        {selectedAlbum && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAlbum(null)}
          >
            <div
              className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedAlbum.title}
                    </h2>
                    <div className="flex items-center text-gray-400 text-sm mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(selectedAlbum.releaseDate).toLocaleDateString(
                        "es-ES",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedAlbum.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedAlbum(null)}
                    className="text-gray-400 hover:text-white ml-4"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {/* External Links (YouTube / Bandcamp) */}
                <div className="flex gap-4 mt-6 flex-wrap">
                  {selectedAlbum.youtubeUrl &&
                    selectedAlbum.youtubeUrl !== "#" && (
                      <a
                        href={selectedAlbum.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-punk-outline flex items-center space-x-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>YouTube</span>
                      </a>
                    )}
                  {selectedAlbum.bandcampUrl &&
                    selectedAlbum.bandcampUrl !== "#" && (
                      <a
                        href={selectedAlbum.bandcampUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-punk-outline flex items-center space-x-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Bandcamp</span>
                      </a>
                    )}
                </div>
              </div>

              {/* Tracklist */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Music className="w-5 h-5 mr-2 text-red-500" />
                  Lista de canciones
                </h3>
                <div className="space-y-2">
                  {selectedAlbum.songs.map((song, index) => (
                    <div
                      key={song.id}
                      className="flex items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group"
                    >
                      <button
                        onClick={() => togglePlay(index + 1)}
                        className="w-10 h-10 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center mr-4 transition-colors"
                      >
                        {playingTrack === index + 1 ? (
                          <Pause className="w-4 h-4 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-white ml-0.5" />
                        )}
                      </button>

                      <div className="flex-grow">
                        <h4 className="text-white font-medium group-hover:text-red-400 transition-colors duration-300">
                          {song.title}
                        </h4>
                        {song.message && (
                          <p className="text-gray-400 text-sm italic">
                            &ldquo;{song.message}&rdquo;
                          </p>
                        )}
                      </div>

                      {/* Duration */}
                      <span className="text-gray-400 text-sm">
                        {song.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="ska-stripes h-2 w-32 mx-auto mb-8 rounded"></div>
          <h3 className="text-2xl font-bold text-white mb-4">
            ¿Quieres escuchar más?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Sigue nuestras redes sociales para estar al día de nuevos
            lanzamientos y conciertos. La música ska-punk antifascista sigue
            creciendo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="btn-punk flex items-center space-x-2 justify-center"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Seguir en Spotify</span>
            </a>
            <a
              href="#"
              className="btn-punk-outline flex items-center space-x-2 justify-center"
            >
              <Download className="w-5 h-5" />
              <span>Descargar Música</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlbumGrid;
