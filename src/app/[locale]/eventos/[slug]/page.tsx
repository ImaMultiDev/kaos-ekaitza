import { Metadata } from "next";
import { Calendar, Instagram, MapPin } from "lucide-react";
import { getEventBySlug, getEvents } from "@/lib/database";
import { isEventDetailAccessible } from "@/lib/event-access";
import {
  getEventHeroImage,
  getEventPosterImages,
} from "@/lib/event-gallery";
import { formatEventDateTime } from "@/lib/utils";
import { notFound } from "next/navigation";
import {
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "@/i18n/routing";
import { RevealSection } from "@/components/motion/RevealSection";
import EventPosterRow from "@/components/events/EventPosterRow";
import EventPendingNotice from "@/components/events/EventPendingNotice";
import { ogImages, twitterImages } from "@/lib/og-defaults";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const events = await getEvents(true);
  return routing.locales.flatMap((locale) =>
    events
      .filter((event) => isEventDetailAccessible(event.pageAccess))
      .map((event) => ({ locale, slug: event.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Eventos" });
  const event = await getEventBySlug(slug, true);

  if (!event || !isEventDetailAccessible(event.pageAccess)) {
    return { title: t("metaNotFoundTitle") };
  }

  const ogImage = getEventHeroImage(event) ?? event.featuredImage;
  const desc = event.excerpt || t("metaEventDescFallback");

  return {
    title: `${event.title} — Kaos Ekaitza`,
    description: desc,
    openGraph: {
      title: event.title,
      description: desc,
      images: ogImages(ogImage),
    },
    twitter: {
      card: "summary_large_image",
      images: twitterImages(ogImage),
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Eventos" });
  const event = await getEventBySlug(slug, true);

  if (!event || !isEventDetailAccessible(event.pageAccess)) {
    notFound();
  }

  const locationLine = [event.venue, event.city].filter(Boolean).join(" · ");
  const contentBlocks = event.description
    ? event.description.split(/\n\s*\n/).filter(Boolean)
    : [];

  const posterImages = getEventPosterImages(event);

  return (
    <div className="min-h-screen bg-black">
      <RevealSection className="w-full">
        <section className="relative bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-3 md:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight uppercase">
              {event.title}
            </h1>

            {event.detailsPending && (
              <EventPendingNotice label={t("detailsPendingLong")} />
            )}

            <p className="flex items-center gap-2 text-lg text-white/90 font-semibold">
              <Calendar className="w-5 h-5 text-red-500 shrink-0" aria-hidden />
              <span>{formatEventDateTime(event.startDate, locale)}</span>
            </p>

            {posterImages.length > 0 && (
              <EventPosterRow
                images={posterImages}
                title={event.title}
                closeLabel={t("galleryClose")}
                prevLabel={t("galleryPrev")}
                nextLabel={t("galleryNext")}
              />
            )}

            {locationLine && (
              <p className="flex items-start gap-2 text-base md:text-lg text-white/85">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" aria-hidden />
                <span>{locationLine}</span>
              </p>
            )}

            {event.address && (
              <p className="text-white/65 text-sm md:text-base pl-7">{event.address}</p>
            )}

            {event.instagramUrl && (
              <div className="pt-1">
                <a
                  href={event.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-punk inline-flex items-center gap-2 transition-all duration-300 hover:scale-105"
                >
                  <Instagram className="w-5 h-5" />
                  <span>{t("instagramCta")}</span>
                </a>
              </div>
            )}
          </div>
          <div className="ska-stripes-horizontal h-2 w-full" aria-hidden />
        </section>
      </RevealSection>

      {(contentBlocks.length > 0 || event.excerpt) && (
        <RevealSection className="w-full" delay={0.05}>
          <section className="py-8 md:py-10 bg-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {contentBlocks.length > 0 ? (
                <div className="space-y-4 text-white/90 leading-relaxed max-w-3xl">
                  {contentBlocks.map((block, idx) => (
                    <p key={idx} className="text-lg">
                      {block}
                    </p>
                  ))}
                </div>
              ) : (
                event.excerpt && (
                  <p className="text-lg text-white/85 leading-relaxed max-w-3xl">
                    {event.excerpt}
                  </p>
                )
              )}
            </div>
          </section>
        </RevealSection>
      )}
    </div>
  );
}
