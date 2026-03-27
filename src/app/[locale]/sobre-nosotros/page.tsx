import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Music } from "lucide-react";
import { routing } from "@/i18n/routing";
import { NavIconMail, NavIconMusic } from "@/components/nav/NavbarSketchIcons";
import { RevealSection } from "@/components/motion/RevealSection";

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
      <RevealSection className="w-full">
      <section className="py-8 md:py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 md:mb-6 tracking-tight max-md:px-1">
              {t("pageTitle")}
            </h1>
            <p className="hidden md:block text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              {t("teamIntro")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BANDA.map((member) => (
              <div
                key={member.name}
                className="bg-black border border-gray-800 rounded-lg overflow-hidden punk-hover group w-full max-w-sm mx-auto sm:max-w-none"
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
      </RevealSection>

      <RevealSection className="w-full" delay={0.05}>
      <section className="py-10 md:py-16 bg-black border-t border-red-900/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-800 bg-gray-900">
            <Image
              src="https://res.cloudinary.com/dzuug3ahf/image/upload/v1773963792/WhatsApp_Image_2026-03-19_at_20.25.35_1_uamnte.jpg"
              alt={t("bandPhotoAlt")}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </div>
      </section>
      </RevealSection>

      <RevealSection className="w-full" delay={0.06}>
      <section className="relative overflow-hidden bg-black border-t border-red-900/35">
        <div className="absolute inset-0 opacity-10" aria-hidden>
          <div className="ska-stripes h-full w-full" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
            Kaos Ekaitza
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-white/85 leading-relaxed text-center max-w-3xl mx-auto">
            <p>{t("heroP1")}</p>
            <p>{t("heroP2")}</p>
            <p>{t("heroP3")}</p>
          </div>
        </div>
        <div className="ska-stripes-horizontal h-2 w-full" aria-hidden />
      </section>

      <section className="py-16 bg-gray-900 border-t border-red-900/25">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-black text-white">
            {t("ctaTitle")}
          </h3>
          <p className="text-white/80 max-w-2xl mx-auto">{t("ctaSubtitle")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/album"
              className="btn-punk inline-flex items-center gap-2 [&_svg]:block"
            >
              <NavIconMusic className="w-5 h-5 shrink-0" />
              <span>{t("listen")}</span>
            </Link>
            <Link
              href="/contacto"
              className="btn-punk-outline inline-flex items-center gap-2 text-white border-white hover:bg-white hover:text-black [&_svg]:block"
            >
              <NavIconMail className="w-5 h-5 shrink-0" />
              <span>{t("contact")}</span>
            </Link>
          </div>
        </div>
      </section>
      </RevealSection>
    </div>
  );
}
