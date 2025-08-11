import { Metadata } from "next";
import { getSongs } from "@/lib/database";
import AlbumMusicGrid from "@/components/AlbumMusicGrid";

export const metadata: Metadata = {
  title: "Discografía - Kaos Ekaitza",
  description:
    "Discografía completa del canal ska-punk antifascista Kaos Ekaitza. Álbumes, EPs y singles cargados de mensaje social y resistencia pacífica.",
};

export default async function AlbumPage() {
  const songs = await getSongs();

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Header */}
      <section className="py-20 bg-gradient-punk">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Nuestra Música
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Cada álbum es una declaración de resistencia. Cada canción, un grito
            de esperanza. Descubre nuestra discografía completa cargada de
            mensaje social.
          </p>
          <div className="ska-stripes h-2 w-48 mx-auto rounded"></div>
        </div>
      </section>

      {/* Music Grid */}
      <AlbumMusicGrid songs={songs} />
    </div>
  );
}
