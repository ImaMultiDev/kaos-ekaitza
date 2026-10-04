import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import RemoteImage from "@/components/RemoteImage";
import { HOME_GALLERY_SPOTLIGHT_IMAGE } from "@/data/home-gallery-spotlight";
import { ArrowRight, Images } from "lucide-react";

export default async function HomeGallerySpotlight() {
  const t = await getTranslations("Home");

  return (
    <section className="relative py-12 md:py-16 gradient-punk overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        aria-hidden
      >
        <div className="ska-stripes h-full w-full -skew-y-3 origin-center scale-105" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <div className="ska-stripes-horizontal h-2 w-28 sm:w-36 mx-auto mb-6 rounded-sm" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4 md:mb-5">
            {t("gallerySpotlightTitle")}
          </h2>
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
            {t("gallerySpotlightSubtitle")}
          </p>
        </div>

        <Link
          href="/galeria"
          aria-label={t("gallerySpotlightLinkAria")}
          className="group relative mx-auto block max-w-5xl overflow-hidden rounded-xl border-2 border-zinc-800/90 bg-black shadow-[0_24px_64px_rgba(0,0,0,0.55)] transition-all duration-300 hover:border-red-600/70 hover:shadow-[0_28px_72px_rgba(220,38,38,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
        >
          <div className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[340px] flex items-center justify-center overflow-hidden">
            <RemoteImage
              src={HOME_GALLERY_SPOTLIGHT_IMAGE}
              alt=""
              fill
              aria-hidden
              className="object-cover object-center scale-110 blur-2xl opacity-70 brightness-[0.55] saturate-125 transition-transform duration-700 group-hover:scale-[1.15]"
              sizes="100vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50"
              aria-hidden
            />

            <div className="relative z-10 w-full px-3 py-6 sm:px-6 sm:py-8 md:py-10">
              <RemoteImage
                src={HOME_GALLERY_SPOTLIGHT_IMAGE}
                alt={t("gallerySpotlightImageAlt")}
                width={2400}
                height={1350}
                className="mx-auto block h-auto w-full max-h-[42vh] object-contain object-center drop-shadow-[0_16px_40px_rgba(0,0,0,0.65)] transition-transform duration-500 group-hover:scale-[1.02] sm:max-h-[48vh] md:max-h-[52vh]"
                sizes="(max-width: 1280px) 100vw, 1024px"
              />
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/95 via-black/75 to-transparent px-4 pb-5 pt-16 sm:px-6 sm:pb-6">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-between">
                <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-red-400/95">
                  <Images className="w-5 h-5 shrink-0" aria-hidden />
                  {t("gallerySpotlightEyebrow")}
                </span>
                <span className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition-colors group-hover:bg-red-500">
                  {t("gallerySpotlightCta")}
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </div>
          </div>

          <div className="ska-stripes-horizontal h-1.5 w-full" aria-hidden />
        </Link>
      </div>

      <div className="ska-stripes-horizontal h-2 w-full mt-10 md:mt-12" aria-hidden />
    </section>
  );
}
