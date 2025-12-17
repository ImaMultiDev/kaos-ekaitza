"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Play } from "lucide-react";

const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);

  const revolutionTexts = [
    "La revolución comienza con una canción",
    "Música consciente para el cambio social",
    "Unidos contra el fascismo",
    "La resistencia suena a ska-punk",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % revolutionTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [revolutionTexts.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo con gradiente y patrón ska */}
      <div className="absolute inset-0 bg-gradient-punk"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="ska-stripes h-full w-full transform -skew-y-12"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge de evolución */}
        <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-black/40 border border-white/10 text-white/80 text-xs uppercase tracking-[0.18em]">
          2025 proyecto digital → 2026 banda real (en marcha)
        </div>

        {/* Logo/Ícono principal */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center ska-bounce shadow-2xl overflow-hidden">
            <Image
              src="/logo-512.png"
              alt="Kaos Ekaitza Logo"
              width={128}
              height={128}
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight">
          <span className="block">KAOS</span>
          <span className="block text-red-500">EKAITZA</span>
        </h1>

        {/* Subtítulo dinámico */}
        <div className="h-16 mb-8 flex items-center justify-center">
          <p className="text-2xl md:text-3xl text-white font-bold tracking-wide animate-pulse">
            {revolutionTexts[currentText]}
          </p>
        </div>

        {/* Descripción */}
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
          Canal musical ska-punk antifascista dedicado a promover el cambio
          social a través de la palabra y la música.{" "}
          <span className="text-red-400 font-semibold">
            Resistencia pacífica, justicia social y música consciente.
          </span>
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link
            href="/album"
            className="btn-punk flex items-center space-x-3 text-lg"
          >
            <Play className="w-6 h-6" />
            <span>Escuchar</span>
          </Link>

          <Link
            href="/sobre-nosotros"
            className="btn-punk-outline flex items-center space-x-3 text-lg"
          >
            <Heart className="w-6 h-6" />
            <span>Conocer el proyecto</span>
          </Link>
        </div>
      </div>

      {/* Decoraciones adicionales */}
      <div className="absolute bottom-0 left-0 w-full h-4 ska-stripes-horizontal"></div>
    </section>
  );
};

export default HeroSection;
