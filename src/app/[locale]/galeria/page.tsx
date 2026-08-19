import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { RevealSection } from "@/components/motion/RevealSection";
import ConcertGalleryGrid from "@/components/gallery/ConcertGalleryGrid";
import { CONCERT_GALLERY_IMAGES } from "@/data/concert-gallery";
import { defaultOgImages, defaultTwitterImageUrls } from "@/lib/og-defaults";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Galeria" });

  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDesc"),
      url: `https://kaosekaitza.com/${locale}/galeria`,
      type: "website",
      images: [...defaultOgImages],
    },
    twitter: {
      card: "summary_large_image",
      images: [...defaultTwitterImageUrls],
    },
  };
}

export default async function GaleriaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Galeria" });

  const images = CONCERT_GALLERY_IMAGES;

  return (
    <div className="min-h-screen bg-black">
      <RevealSection className="w-full">
        <section className="py-8 md:py-16 bg-gradient-punk">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white mb-5 md:mb-6 tracking-tight max-md:px-1">
              {t("title")}
            </h1>
          </div>
          <div
            className="ska-stripes-horizontal h-2 w-full mt-8 md:mt-10"
            aria-hidden
          />
        </section>
      </RevealSection>

      <RevealSection className="w-full" delay={0.05}>
        <section className="py-12 md:py-16 bg-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {images.length === 0 ? (
              <p className="text-center text-white/70 text-lg">{t("empty")}</p>
            ) : (
              <ConcertGalleryGrid
                images={images}
                defaultAlt={t("imageAlt")}
                closeLabel={t("close")}
                prevLabel={t("prev")}
                nextLabel={t("next")}
              />
            )}
          </div>
        </section>
      </RevealSection>
    </div>
  );
}
