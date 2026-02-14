import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Music, Radio, Zap } from "lucide-react";

type Member = {
  name: string;
  instrument: string;
  town: string;
  image?: string | null;
};

// Pegar la URL de Cloudinary en image cuando tengas la foto de cada miembro
const BANDA: Member[] = [
  {
    name: "Eduardo",
    instrument: "Trompeta",
    town: "Milagro",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771026678/Eduardo_ygccfp.jpg",
  },
  {
    name: "Andoni",
    instrument: "Guitarra",
    town: "Iruña",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771026678/Andoni_kloh2s.jpg",
  },
  {
    name: "Iñaki",
    instrument: "Bajo",
    town: "Altsasu",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771070797/I%C3%B1aki_v2wgkg.png",
  },
  {
    name: "Odei",
    instrument: "Batería",
    town: "Huarte",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771077634/Odei1_p2pxus.png",
  },
  {
    name: "Adriantxo",
    instrument: "Voz principal",
    town: "San Martín de Unx",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771070589/Adriantxo_ksaz9n.png",
  },
  {
    name: "Leyre",
    instrument: "Guitarra",
    town: "Noain",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771070781/Leyre_tpjw45.png",
  },
  {
    name: "Imanol",
    instrument: "Productor musical",
    town: "Zarrakastelu",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771072349/Imanol1_afuryu.png",
  },
];

export const metadata: Metadata = {
  title: "Conócenos - Kaos Ekaitza | La banda",
  description:
    "Conoce a Kaos Ekaitza: banda ska-punk antifascista de Nafarroa. Integrantes, espíritu y mensaje. Desde la calle, para quien quiera escuchar.",
  keywords: [
    "kaos ekaitza",
    "banda",
    "ska-punk",
    "antifascista",
    "nafarroa",
    "navarra",
    "iruna",
    "altsasu",
    "tormenta",
  ],
  openGraph: {
    title: "Conócenos - Kaos Ekaitza | La banda",
    description:
      "Banda ska-punk antifascista de Nafarroa. Integrantes, espíritu y mensaje.",
    url: "https://kaosekaitza.com/sobre-nosotros",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conócenos - Kaos Ekaitza | La banda",
    description:
      "Banda ska-punk antifascista de Nafarroa. Integrantes, espíritu y mensaje.",
  },
};

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero - Conócenos */}
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-10">
          <div className="ska-stripes h-full w-full" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-red-500 mb-4">
            Conócenos
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
            Kaos Ekaitza
          </h1>
          <div className="space-y-6 text-lg md:text-xl text-white/85 leading-relaxed text-center md:text-left max-w-3xl mx-auto">
            <p>
              Kaos Ekaitza nace desde la calle, desde el ruido y desde la
              necesidad de decir lo que muchos piensan y pocos gritan. Es un
              proyecto musical con espíritu punk, pero también poético, donde la
              rabia y la sensibilidad caminan juntas.
            </p>
            <p>
              Lo que empezó como una idea se ha convertido en una banda real,
              formada por personas de distintos puntos de Nafarroa, unidas por
              una misma tormenta interior y una misma visión: defender la voz
              del pueblo, contar lo que se vive y no se suele contar, y hacerlo
              sin filtros.
            </p>
            <p>
              La banda está formada por integrantes de Altsasu, San Martín de
              Unx, Milagro, Noain, Huarte, Iruña y Zarrakastelu, demostrando que
              la fuerza está en cada rincón de Nafarroa.
            </p>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/album"
              className="btn-punk inline-flex items-center gap-2"
            >
              <Radio className="w-5 h-5" />
              <span>Escuchar</span>
            </Link>
            <Link
              href="/contacto"
              className="btn-punk-outline inline-flex items-center gap-2 text-white border-white hover:bg-white hover:text-black"
            >
              <Zap className="w-5 h-5" />
              <span>Contactar</span>
            </Link>
          </div>
        </div>
        <div className="ska-stripes-horizontal h-2 w-full" />
      </section>

      {/* La banda */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.25em] text-red-500 mb-3">
              La banda
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              El equipo
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              El proyecto fue tomando forma poco a poco, con la entrada de cada
              integrante, hasta convertirse en el equipo sólido que es hoy. Cada
              uno aporta su identidad, su historia y su manera de entender la
              música, pero todos comparten el mismo fuego.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BANDA.map((member, index) => {
              const isLast = index === BANDA.length - 1;
              const card = (
                <div className="bg-black borderf border-gray-800 rounded-lg overflow-hidden punk-hover group w-full max-w-sm">
                  <div className="aspect-square bg-gray-800/80 flex items-center justify-center relative overflow-hidden">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <Music className="w-16 h-16 text-gray-600 group-hover:text-red-600/50 transition-colors" />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-1 ska-stripes-horizontal opacity-60" />
                  </div>
                  <div className="p-4">
                    <p className="text-white font-black text-lg">
                      {member.name}
                    </p>
                    <p className="text-red-500 font-semibold text-sm">
                      {member.instrument}
                    </p>
                    <p className="text-white/70 text-sm">({member.town})</p>
                  </div>
                </div>
              );
              return (
                <div
                  key={member.name}
                  className={
                    isLast
                      ? "sm:col-span-2 sm:flex sm:justify-center lg:col-span-3 lg:flex lg:justify-center"
                      : undefined
                  }
                >
                  {card}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Espíritu */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-red-500">
            Espíritu
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            Una tormenta colectiva
          </h2>
          <div className="space-y-4 text-lg text-white/85 leading-relaxed">
            <p>
              Kaos Ekaitza no es solo una banda: es un equipo, una tormenta
              colectiva. Todos llevan dentro esa fuerza que empuja a crear, a
              protestar, a emocionar y a defender lo que somos.
            </p>
            <p className="text-white font-semibold">
              Desde Nafarroa, para quien quiera escuchar.
              <br />Y para quien no… también.
            </p>
          </div>

          {/* Foto de la banda (horizontal): reemplazar por Image cuando tengas la foto */}
          <div className="mt-12 w-full max-w-4xl mx-auto">
            <div className="relative aspect-[2/1] rounded-lg overflow-hidden border border-gray-800 bg-gray-900 flex items-center justify-center">
              <p className="text-white/50 text-lg font-semibold uppercase tracking-widest">
                Próximamente
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-2 ska-stripes-horizontal opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-black text-white">
            Súmate a la tormenta
          </h3>
          <p className="text-white/80 max-w-2xl mx-auto">
            Escucha, contacta o apoya. La banda sigue en la calle.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/album"
              className="btn-punk inline-flex items-center gap-2"
            >
              <Radio className="w-5 h-5" />
              <span>Escuchar</span>
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
