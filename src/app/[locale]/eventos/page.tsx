import { Metadata } from "next";
import {
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "@/i18n/routing";
import { RevealSection } from "@/components/motion/RevealSection";
import {
  defaultOgImages,
  defaultTwitterImageUrls,
} from "@/lib/og-defaults";
import { getPastEvents, getUpcomingEvents } from "@/lib/database";
import EventCard from "@/components/events/EventCard";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Eventos" });

  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDesc"),
      url: `https://kaosekaitza.com/${locale}/eventos`,
      type: "website",
      images: [...defaultOgImages],
    },
    twitter: {
      card: "summary_large_image",
      images: [...defaultTwitterImageUrls],
    },
  };
}

export default async function EventosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Eventos" });

  const [upcoming, past] = await Promise.all([
    getUpcomingEvents(undefined, { teasersAfterFull: true }),
    getPastEvents(),
  ]);

  const hasAny = upcoming.length > 0 || past.length > 0;

  return (
    <div className="min-h-screen bg-black">
      <RevealSection className="w-full">
        <section className="py-8 md:py-16 bg-gradient-punk">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white mb-5 md:mb-6 tracking-tight max-md:px-1">
              {t("title")}
            </h1>
            <p className="hidden md:block text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
          <div className="ska-stripes-horizontal h-2 w-full mt-8 md:mt-10" aria-hidden />
        </section>
      </RevealSection>

      <RevealSection className="w-full" delay={0.05}>
        <section className="py-12 md:py-16 bg-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 md:space-y-20">
            {!hasAny ? (
              <p className="text-center text-white/70 text-lg">{t("empty")}</p>
            ) : (
              <>
                {upcoming.length > 0 && (
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6 md:mb-8 flex items-center gap-3">
                      <span className="inline-block w-8 h-1 bg-red-600 rounded-full" aria-hidden />
                      {t("upcomingTitle")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {upcoming.map((event, index) => (
                        <RevealSection key={event.id} delay={0.04 + index * 0.04}>
                          <EventCard
                            event={event}
                            locale={locale}
                            ctaLabel={t("cardCta")}
                            pendingLabel={t("detailsPending")}
                          />
                        </RevealSection>
                      ))}
                    </div>
                  </div>
                )}

                {past.length > 0 && (
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white/90 uppercase tracking-tight mb-6 md:mb-8 flex items-center gap-3">
                      <span className="inline-block w-8 h-1 bg-zinc-600 rounded-full" aria-hidden />
                      {t("pastTitle")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {past.map((event, index) => (
                        <RevealSection key={event.id} delay={0.04 + index * 0.03}>
                          <EventCard
                            event={event}
                            locale={locale}
                            ctaLabel={t("cardCtaPast")}
                            pendingLabel={t("detailsPending")}
                          />
                        </RevealSection>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </RevealSection>
    </div>
  );
}
