import Link from "next/link";
import { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import LatestMusic from "@/components/LatestMusic";
import PhilosophySection from "@/components/PhilosophySection";
import { getLatestSongs } from "@/lib/database";
import { ArrowRight, Waves, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Kaos Ekaitza - Inicio | Ska-Punk Antifascista y Música Consciente",
  description:
    "Bienvenido a Kaos Ekaitza, el canal musical ska-punk antifascista que promueve la resistencia pacífica y la justicia social. Descubre música consciente que lucha por un mundo más justo.",
  keywords: [
    "ska-punk",
    "antifascista",
    "música consciente",
    "resistencia pacífica",
    "justicia social",
    "kaos ekaitza",
    "música protesta",
    "punk rock",
    "ska",
    "antifascismo",
  ],
  openGraph: {
    title: "Kaos Ekaitza - Inicio | Ska-Punk Antifascista y Música Consciente",
    description:
      "Bienvenido a Kaos Ekaitza, el canal musical ska-punk antifascista que promueve la resistencia pacífica y la justicia social.",
    url: "https://kaosekaitza.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaos Ekaitza - Inicio | Ska-Punk Antifascista y Música Consciente",
    description:
      "Bienvenido a Kaos Ekaitza, el canal musical ska-punk antifascista que promueve la resistencia pacífica y la justicia social.",
  },
};

export default async function Home() {
  const latestSongs = await getLatestSongs(3);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <HeroSection />

      {/* Latest Music */}
      <LatestMusic songs={latestSongs} />

      {/* Franja de evolución */}
      <section className="py-10 gradient-punk">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 text-center text-white">
          <div className="text-sm uppercase tracking-[0.25em] text-white/80">
            Evolución
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-6 text-lg font-semibold">
            <div className="flex items-center justify-center gap-2">
              <Waves className="w-5 h-5" />
              <span>2025 → Proyecto inicial (20 temas)</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Waves className="w-5 h-5" />
              <span>2026 → Banda en marcha en Navarra</span>
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              href="/sobre-nosotros"
              className="btn-punk-outline inline-flex items-center gap-2 text-white border-white hover:bg-white hover:text-black"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Conocer el proyecto</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <PhilosophySection />

      {/* News Section */}
      {/*<NewsSection />*/}

      {/* Participa CTA */}
      <section className="py-16 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Participa en la tormenta.
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Escucha, conoce, colabora o apoya. Cuatro pasos claros para sumar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/album"
              className="btn-punk inline-flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              <span>Escuchar</span>
            </Link>
            <Link
              href="/sobre-nosotros"
              className="btn-punk-outline inline-flex items-center gap-2 text-white border-white hover:bg-white hover:text-black"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Conocer el proyecto</span>
            </Link>
            <Link
              href="/contacto"
              className="btn-punk-outline inline-flex items-center gap-2 text-white border-white hover:bg-white hover:text-black"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Contactar</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
