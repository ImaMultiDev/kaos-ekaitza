import { Play, BookOpen } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import LatestMusic from "@/components/LatestMusic";
import PhilosophySection from "@/components/PhilosophySection";
import NewsSection from "@/components/NewsSection";
import { getLatestSongs } from "@/lib/database";

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

      {/* Philosophy Section */}
      <PhilosophySection />

      {/* Latest Music */}
      <LatestMusic songs={latestSongs} />

      {/* News Section */}
      <NewsSection />

      {/* Call to Action */}
      <section className="py-20 bg-gradient-punk">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            ¡Únete a la Revolución Musical!
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Suscríbete para recibir nuestras últimas canciones, noticias y
            mantente conectado con la comunidad ska-punk antifascista.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/album"
              className="btn-punk flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Escucha Nuestra Música</span>
            </Link>
            <Link
              href="/contacto"
              className="btn-punk-outline flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Contáctanos</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
