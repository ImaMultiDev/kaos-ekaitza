import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Music, Radio, Zap } from "lucide-react";
import { routing } from "@/i18n/routing";

type Member = {
  name: string;
  instrumentKey: keyof MessagesSobreInstruments;
  town: string;
  image?: string | null;
};

type MessagesSobreInstruments = {
  trompeta: string;
  guitarra: string;
  bajo: string;
  bateria: string;
  voz: string;
  productor: string;
};

const BANDA: Member[] = [
  {
    name: "Eduardo",
    instrumentKey: "trompeta",
    town: "Milagro",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771026678/Eduardo_ygccfp.jpg",
  },
  {
    name: "Andoni",
    instrumentKey: "guitarra",
    town: "Iruña",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771026678/Andoni_kloh2s.jpg",
  },
  {
    name: "Iñaki",
    instrumentKey: "bajo",
    town: "Altsasu",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771070797/I%C3%B1aki_v2wgkg.png",
  },
  {
    name: "Odei",
    instrumentKey: "bateria",
    town: "Huarte",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771077634/Odei1_p2pxus.png",
  },
  {
    name: "Adriantxo",
    instrumentKey: "voz",
    town: "San Martín de Unx",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771070589/Adriantxo_ksaz9n.png",
  },
  {
    name: "Leyre",
    instrumentKey: "guitarra",
    town: "Noain",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771070781/Leyre_tpjw45.png",
  },
  {
    name: "Imanol",
    instrumentKey: "productor",
    town: "Zarrakastelu",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771072349/Imanol1_afuryu.png",
  },
];

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Sobre" });
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDesc"),
      url: `https://kaosekaitza.com/${locale}/sobre-nosotros`,
      type: "website",
    },
  };
}

export default async function SobreNosotrosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Sobre");

  return (
    <div className="min-h-screen bg-black">
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-10">
          <div className="ska-stripes h-full w-full" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-red-500 mb-4">
            {t("heroEyebrow")}
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
            Kaos Ekaitza
          </h1>
          <div className="space-y-6 text-lg md:text-xl text-white/85 leading-relaxed text-center md:text-left max-w-3xl mx-auto">
            <p>{t("heroP1")}</p>
            <p>{t("heroP2")}</p>
            <p>{t("heroP3")}</p>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/album"
              className="btn-punk inline-flex items-center gap-2"
            >
              <Radio className="w-5 h-5" />
              <span>{t("listen")}</span>
            </Link>
            <Link
              href="/contacto"
              className="btn-punk-outline inline-flex items-center gap-2 text-white border-white hover:bg-white hover:text-black"
            >
              <Zap className="w-5 h-5" />
              <span>{t("contact")}</span>
            </Link>
          </div>
        </div>
        <div className="ska-stripes-horizontal h-2 w-full" />
      </section>

      <section className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.25em] text-red-500 mb-3">
              {t("bandEyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {t("teamTitle")}
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">{t("teamIntro")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BANDA.map((member) => (
              <div
                key={member.name}
                className="bg-black border border-gray-800 rounded-lg overflow-hidden punk-hover group w-full max-w-sm"
              >
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
                </div>
                <div className="p-4">
                  <p className="text-white font-black text-lg">{member.name}</p>
                  <p className="text-red-500 font-semibold text-sm">
                    {t(`instruments.${member.instrumentKey}`)}
                  </p>
                  <p className="text-white/70 text-sm">({member.town})</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-red-500">
            {t("spiritEyebrow")}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            {t("spiritTitle")}
          </h2>
          <div className="space-y-4 text-lg text-white/85 leading-relaxed">
            <p>{t("spiritP1")}</p>
            <p className="text-white font-semibold">
              {t("spiritP2Line1")}
              <br />
              {t("spiritP2Line2")}
            </p>
          </div>

          <div className="mt-12 w-full max-w-5xl mx-auto">
            <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-800 bg-gray-900">
              <Image
                src="https://res.cloudinary.com/dzuug3ahf/image/upload/v1773963792/WhatsApp_Image_2026-03-19_at_20.25.35_1_uamnte.jpg"
                alt={t("bandPhotoAlt")}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-black text-white">
            {t("ctaTitle")}
          </h3>
          <p className="text-white/80 max-w-2xl mx-auto">{t("ctaSubtitle")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/album"
              className="btn-punk inline-flex items-center gap-2"
            >
              <Radio className="w-5 h-5" />
              <span>{t("listen")}</span>
            </Link>
            <Link
              href="/contacto"
              className="btn-punk-outline inline-flex items-center gap-2 text-white border-white hover:bg-white hover:text-black"
            >
              <ArrowRight className="w-5 h-5" />
              <span>{t("contact")}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
