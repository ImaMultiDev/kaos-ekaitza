"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  ExternalLink,
} from "lucide-react";
import { getSongs } from "@/lib/database";
import Image from "next/image";

interface YouTubePlayerProps {
  songs?: Awaited<ReturnType<typeof getSongs>>;
}

// Declarar tipos para YouTube API
interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (
    videoId: string,
    startSeconds?: number,
    suggestedQuality?: string
  ) => void;
  seekTo: (seconds: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  setVolume: (volume: number) => void;
  mute: () => void;
  unMute: () => void;
}

interface YTPlayerState {
  PLAYING: number;
  PAUSED: number;
  ENDED: number;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: new (element: HTMLElement, config: unknown) => YTPlayer;
      PlayerState: YTPlayerState;
    };
  }
}

const YouTubePlayer = ({ songs = [] }: YouTubePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const playerRef = useRef<YTPlayer | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Crear playlist desde las canciones de la base de datos
  const playlist = songs.map((song) => ({
    id: song.id,
    title: song.title,
    duration: song.duration || "0:00",
    youtubeUrl: song.youtubeUrl || "",
    videoId: song.youtubeUrl
      ? song.youtubeUrl.split("v=")[1]?.split("&")[0] || ""
      : "",
    thumbnailUrl: song.youtubeUrl
      ? `https://img.youtube.com/vi/${
          song.youtubeUrl.split("v=")[1]?.split("&")[0]
        }/mqdefault.jpg`
      : "",
  }));

  const onPlayerReady = useCallback(() => {
    setIsPlayerReady(true);
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  const nextTrack = useCallback(() => {
    if (isShuffling) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      setCurrentTrack(randomIndex);
    } else {
      setCurrentTrack((prev) => (prev + 1) % playlist.length);
    }
  }, [isShuffling, playlist.length]);

  const onPlayerStateChange = useCallback(
    (event: { data: number }) => {
      if (event.data === window.YT.PlayerState.PLAYING) {
        setIsPlaying(true);
      } else if (event.data === window.YT.PlayerState.PAUSED) {
        setIsPlaying(false);
      } else if (event.data === window.YT.PlayerState.ENDED) {
        if (isRepeating) {
          if (playerRef.current) {
            playerRef.current.seekTo(0);
            playerRef.current.playVideo();
          }
        } else {
          nextTrack();
        }
      }
    },
    [isRepeating, nextTrack]
  );

  const initializePlayer = useCallback(() => {
    if (playerContainerRef.current && !playerRef.current) {
      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        height: "0",
        width: "0",
        videoId: playlist[currentTrack]?.videoId,
        playerVars: {
          playsinline: 1,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          autoplay: 0,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }
  }, [playlist, currentTrack, onPlayerReady, onPlayerStateChange]);

  // Cargar YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }
  }, [initializePlayer]);

  // Actualizar progreso
  useEffect(() => {
    if (!isPlayerReady || !playerRef.current) return;

    const interval = setInterval(() => {
      if (
        playerRef.current &&
        typeof playerRef.current.getCurrentTime === "function"
      ) {
        const current = playerRef.current.getCurrentTime();
        const total = playerRef.current.getDuration();

        setCurrentTime(current);
        setDuration(total);
        setProgress(total > 0 ? (current / total) * 100 : 0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlayerReady, isPlaying]);

  // Cambiar video cuando cambia la pista (SIN AUTOPLAY)
  useEffect(() => {
    if (isPlayerReady && playerRef.current && playlist[currentTrack]) {
      // Cargar video sin reproducir automáticamente
      playerRef.current.loadVideoById(
        playlist[currentTrack].videoId,
        0,
        "large"
      );
      setProgress(0);
      setCurrentTime(0);
      setIsPlaying(false); // Asegurar que está pausado
    }
  }, [currentTrack, isPlayerReady, playlist]);

  const togglePlay = () => {
    if (!isPlayerReady || !playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;

    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!playerRef.current || !duration) return;

    const newProgress = parseInt(e.target.value);
    const newTime = (newProgress / 100) * duration;
    playerRef.current.seekTo(newTime);
    setProgress(newProgress);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const currentTrackData = playlist[currentTrack];

  if (!currentTrackData) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t-2 border-red-600 z-40">
      {/* YouTube Player (hidden) */}
      <div ref={playerContainerRef} style={{ display: "none" }}></div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-800">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="w-full h-1 bg-transparent appearance-none cursor-pointer slider-progress"
        />
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Info de la canción */}
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <Image
              src={currentTrackData.thumbnailUrl}
              alt={currentTrackData.title}
              width={48}
              height={48}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-white font-semibold text-sm truncate">
                {currentTrackData.title}
              </h4>
              <p className="text-gray-400 text-xs truncate">Kaos Ekaitza</p>
            </div>
            <a
              href={currentTrackData.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Ver en YouTube"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Controles centrales */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsShuffling(!isShuffling)}
              className={`transition-colors ${
                isShuffling ? "text-red-500" : "text-gray-400 hover:text-white"
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              onClick={prevTrack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              disabled={!isPlayerReady}
              className="w-10 h-10 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </button>

            <button
              onClick={nextTrack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsRepeating(!isRepeating)}
              className={`transition-colors ${
                isRepeating ? "text-red-500" : "text-gray-400 hover:text-white"
              }`}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Controles de volumen y tiempo */}
          <div className="flex items-center space-x-4 min-w-0 flex-1 justify-end">
            <span className="text-gray-400 text-xs">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="text-gray-400 hover:text-white"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-600 appearance-none cursor-pointer slider-volume"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider-progress::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .slider-volume::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
        }

        .slider-progress::-webkit-slider-track {
          height: 4px;
          background: #374151;
          border-radius: 2px;
        }

        .slider-volume::-webkit-slider-track {
          height: 4px;
          background: #374151;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default YouTubePlayer;
