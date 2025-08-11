"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
} from "lucide-react";

interface Track {
  id: number;
  title: string;
  album: string;
  duration: string;
  audioUrl: string;
}

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Playlist de ejemplo
  const playlist: Track[] = [
    {
      id: 1,
      title: "Resistencia Pacífica",
      album: "Voces de Resistencia",
      duration: "3:45",
      audioUrl: "/placeholder-audio1.mp3",
    },
    {
      id: 2,
      title: "Unidos Contra el Fascismo",
      album: "Voces de Resistencia",
      duration: "4:12",
      audioUrl: "/placeholder-audio2.mp3",
    },
    {
      id: 3,
      title: "Ska para el Cambio",
      album: "Voces de Resistencia",
      duration: "3:28",
      audioUrl: "/placeholder-audio3.mp3",
    },
  ];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = useCallback(() => {
    const nextIndex = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextIndex);
    setProgress(0);
  }, [currentTrack, playlist.length]);

  const prevTrack = () => {
    const prevIndex =
      currentTrack === 0 ? playlist.length - 1 : currentTrack - 1;
    setCurrentTrack(prevIndex);
    setProgress(0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (audioRef.current) {
      audioRef.current.currentTime =
        (newProgress / 100) * audioRef.current.duration;
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        setProgress(progressPercent);
      }
    };

    const handleEnded = () => {
      if (isRepeating) {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextTrack();
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack, isRepeating, nextTrack]);

  // Effect para manejar volumen y muted
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  const currentTrackData = playlist[currentTrack];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t-2 border-red-600 z-40">
      {/* Audio element */}
      <audio ref={audioRef} src={currentTrackData?.audioUrl} />

      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-800">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer slider-progress"
        />
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Track Info */}
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <div className="w-12 h-12 bg-gradient-punk rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">KE</span>
            </div>
            <div className="min-w-0">
              <h4 className="text-white font-bold text-sm truncate">
                {currentTrackData?.title || "Sin título"}
              </h4>
              <p className="text-gray-400 text-xs truncate">
                {currentTrackData?.album || "Sin álbum"}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center space-x-4">
            {/* Shuffle */}
            <button
              onClick={() => setIsShuffling(!isShuffling)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isShuffling
                  ? "text-red-500 bg-red-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            {/* Previous */}
            <button
              onClick={prevTrack}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </button>

            {/* Next */}
            <button
              onClick={nextTrack}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            {/* Repeat */}
            <button
              onClick={() => setIsRepeating(!isRepeating)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isRepeating
                  ? "text-red-500 bg-red-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Volume and Time */}
          <div className="flex items-center space-x-4 min-w-0 flex-1 justify-end">
            {/* Time */}
            <div className="text-xs text-gray-400 hidden sm:block">
              <span>
                {audioRef.current
                  ? formatTime(audioRef.current.currentTime || 0)
                  : "0:00"}
              </span>
              <span className="mx-1">/</span>
              <span>
                {audioRef.current
                  ? formatTime(audioRef.current.duration || 0)
                  : currentTrackData?.duration || "0:00"}
              </span>
            </div>

            {/* Volume */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-volume hidden sm:block"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider-progress::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          border: 2px solid #ffffff;
        }

        .slider-volume::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
        }

        .slider-progress::-webkit-slider-track {
          background: linear-gradient(
            to right,
            #dc2626 0%,
            #dc2626 ${progress}%,
            #374151 ${progress}%,
            #374151 100%
          );
          height: 4px;
          border-radius: 2px;
        }

        .slider-volume::-webkit-slider-track {
          background: linear-gradient(
            to right,
            #dc2626 0%,
            #dc2626 ${(isMuted ? 0 : volume) * 100}%,
            #374151 ${(isMuted ? 0 : volume) * 100}%,
            #374151 100%
          );
          height: 4px;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
