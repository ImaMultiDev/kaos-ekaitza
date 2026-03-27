import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import HeroSection from "@/components/HeroSection";
import BandPhotoSection from "@/components/BandPhotoSection";
import LatestMusic from "@/components/LatestMusic";
import PhilosophySection from "@/components/PhilosophySection";
import { getLatestSongs } from "@/lib/database";
import { ArrowRight, Waves, Zap } from "lucide-react";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RootMeta" });

  return {
    title: t("titleDefault"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://kaosekaitza.com",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const latestSongs = await getLatestSongs(3);
  const t = await getTranslations("Home");

  return (
    <div className="min-h-screen bg-black">
      <HeroSection />

      <BandPhotoSection />

      <LatestMusic songs={latestSongs} />

      <section className="py-10 gradient-punk">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 text-center text-white">
          <div className="text-sm uppercase tracking-[0.25em] text-white/80">
            {t("evolution")}
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-6 text-lg font-semibold">
            <div className="flex items-center justify-center gap-2">
              <Waves className="w-5 h-5" />
              <span>{t("evo1")}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Waves className="w-5 h-5" />
              <span>{t("evo2")}</span>
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              href="/sobre-nosotros"
              className="btn-punk-outline inline-flex items-center gap-2 text-white border-white hover:bg-white hover:text-black"
            >
              <ArrowRight className="w-4 h-4" />
              <span>{t("knowProject")}</span>
            </Link>
          </div>
        </div>
      </section>

      <PhilosophySection />

      <section className="py-16 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-white">
            {t("ctaTitle")}
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">{t("ctaSubtitle")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/album"
              className="btn-punk inline-flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              <span>{t("listen")}</span>
            </Link>
            <Link
              href="/sobre-nosotros"
              className="btn-punk-outline inline-flex items-center gap-2 text-white border-white hover:bg-white hover:text-black"
            >
              <ArrowRight className="w-5 h-5" />
              <span>{t("knowProjectBtn")}</span>
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
