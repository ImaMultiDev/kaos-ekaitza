"use client";

import { useState } from "react";
import { Play, Clock, Calendar, Music, Album, X } from "lucide-react";
import Image from "next/image";
import { getSongs } from "@/lib/database";

interface AlbumMusicGridProps {
  songs?: Awaited<ReturnType<typeof getSongs>>;
}

interface SongItem {
  id: string;
  title: string;
  duration: string | null;
  createdAt: Date;
  message: string | null;
  spotifyUrl: string | null;
  youtubeUrl: string | null;
  albumId: string | null;
  album?: { title: string } | null;
  image: string;
}

const AlbumMusicGrid = ({ songs = [] }: AlbumMusicGridProps) => {
  const [selectedSong, setSelectedSong] = useState<SongItem | null>(null);

  // Organizar canciones por álbum si tienen albumId y añadir imágenes
  const songsByAlbum = songs.reduce((acc, song) => {
    const albumId = song.albumId || "sin-album";
    if (!acc[albumId]) {
      acc[albumId] = {
        albumId,
        albumTitle: song.album?.title || "Sin Álbum",
        songs: [],
      };
    }

    // Crear objeto de canción con imagen
    const songWithImage: SongItem = {
      ...song,
      // Usar la imagen de la base de datos
      image: song.coverImage || "",
    };

    acc[albumId].songs.push(songWithImage);
    return acc;
  }, {} as Record<string, { albumId: string; albumTitle: string; songs: SongItem[] }>);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const openSongModal = (song: SongItem) => {
    setSelectedSong(song);
  };

  const closeSongModal = () => {
    setSelectedSong(null);
  };

  return (
    <>
      <section className="pt-4 pb-12 md:pt-16 md:pb-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 md:mb-16">
            <div className="ska-stripes-horizontal h-2 w-32 mx-auto mb-6 rounded"></div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Nuestra <span className="text-red-500">Discografía</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Descubre toda nuestra música ska-punk antifascista. Cada canción
              es una declaración de resistencia pacífica y justicia social.
            </p>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:mb-12">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {songs.length}
              </h3>
              <p className="text-gray-400">Canciones Totales</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Album className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {Object.keys(songsByAlbum).length}
              </h3>
              <p className="text-gray-400">Álbumes/EPs</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {Math.round(
                  songs.reduce((total, song) => {
                    const duration = song.duration || "0:00";
                    const [minutes, seconds] = duration.split(":").map(Number);
                    return total + (minutes * 60 + (seconds || 0));
                  }, 0) / 60
                )}
              </h3>
              <p className="text-gray-400">Minutos de Música</p>
            </div>
          </div>

          {/* Lista de canciones organizadas por álbum */}
          <div className="space-y-12">
            {Object.values(songsByAlbum).map((albumGroup) => (
              <div
                key={albumGroup.albumId}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6"
              >
                {/* Header del álbum */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-700">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                    <Album className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {albumGroup.albumTitle}
                    </h3>
                    <p className="text-gray-400">
                      {albumGroup.songs.length} canciones
                    </p>
                  </div>
                </div>

                {/* Grid de canciones del álbum */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {albumGroup.songs.map((song) => (
                    <div
                      key={song.id}
                      className="bg-black border border-gray-700 rounded-lg overflow-hidden punk-hover group flex flex-col cursor-pointer"
                      onClick={() => openSongModal(song)}
                    >
                      {/* Imagen de la canción */}
                      {song.image && (
                        <div className="h-32 relative overflow-hidden">
                          <Image
                            src={song.image}
                            alt={song.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {/* Banda ska decorativa */}
                          <div className="absolute bottom-0 left-0 w-full h-1 ska-stripes-horizontal opacity-60"></div>
                        </div>
                      )}

                      <div className="p-4 flex flex-col flex-1">
                        {/* Título */}
                        <h4 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-300 mb-3">
                          {song.title}
                        </h4>

                        {/* Botones Spotify y YouTube debajo del título */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {song.spotifyUrl && (
                            <a
                              href={song.spotifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 px-2 py-1.5 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded text-xs font-medium transition-all duration-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                              </svg>
                              <span>Spotify</span>
                            </a>
                          )}
                          {song.youtubeUrl && song.youtubeUrl !== "#" && (
                            <a
                              href={song.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 px-2 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-medium transition-all duration-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Play className="w-3.5 h-3.5" />
                              <span>YouTube</span>
                            </a>
                          )}
                        </div>

                        {/* Metadatos */}
                        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-3 text-xs text-gray-400 mb-3">
                          {song.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{song.duration}</span>
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {formatDate(song.createdAt.toISOString())}
                            </span>
                          </span>
                        </div>

                        {/* Mensaje (máx. 3 líneas en tarjeta) */}
                        {song.message && (
                          <div className="flex-1 mt-auto">
                            <blockquote className="text-red-400 italic text-xs font-medium border-l-2 border-red-600 pl-2 line-clamp-3">
                              &ldquo;{song.message}&rdquo;
                            </blockquote>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <div className="ska-stripes h-2 w-48 mx-auto mb-8 rounded"></div>
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Te gusta lo que escuchas?
            </h3>
            <p className="text-gray-300 mb-6">
              Comparte nuestra música y únete a la resistencia pacífica a través
              del ska-punk consciente.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://open.spotify.com/intl-es/artist/1reWo4KzVQLgqOwNXrVgr4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <span>Escuchar en Spotify</span>
              </a>
              <a
                href="https://www.youtube.com/@KaosEkaitza"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-punk inline-flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                <span>Ver en YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de canción */}
      {selectedSong && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeSongModal}
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
                    {selectedSong.title}
                  </h2>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6 text-gray-400 text-sm mb-4">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {selectedSong.duration || "Duración no disponible"}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedSong.createdAt.toISOString())}
                    </span>
                    {selectedSong.album && (
                      <span className="flex items-center gap-2">
                        <Album className="w-4 h-4" />
                        {selectedSong.album.title}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={closeSongModal}
                  className="text-gray-400 hover:text-white ml-4 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="p-6">
              {/* Imagen destacada */}
              {selectedSong.image && (
                <div className="h-64 relative overflow-hidden rounded-lg mb-6">
                  <Image
                    src={selectedSong.image}
                    alt={selectedSong.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 w-full h-2 ska-stripes-horizontal opacity-60"></div>
                </div>
              )}

              {/* Contenido de la canción */}
              <div className="prose prose-invert max-w-none">
                {selectedSong.message && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Mensaje
                    </h3>
                    <blockquote className="text-red-400 italic text-lg font-medium border-l-4 border-red-600 pl-4 py-2">
                      &ldquo;{selectedSong.message}&rdquo;
                    </blockquote>
                  </div>
                )}

                {/* Enlaces de la canción */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Escuchar
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedSong.spotifyUrl && (
                      <a
                        href={selectedSong.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg transition-colors duration-300 font-medium"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                        <span>Escuchar en Spotify</span>
                      </a>
                    )}
                    {selectedSong.youtubeUrl &&
                      selectedSong.youtubeUrl !== "#" && (
                        <a
                          href={selectedSong.youtubeUrl}
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
                  onClick={closeSongModal}
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

export default AlbumMusicGrid;
