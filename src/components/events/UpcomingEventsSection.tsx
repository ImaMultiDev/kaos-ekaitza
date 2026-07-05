import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getUpcomingEvents } from "@/lib/database";
import { isEventTeaser } from "@/lib/event-access";
import { RevealSection } from "@/components/motion/RevealSection";
import EventCard from "@/components/events/EventCard";

type Props = {
  locale: string;
  limit?: number;
};

export default async function UpcomingEventsSection({
  locale,
  limit = 3,
}: Props) {
  const t = await getTranslations("Home");
  const tEvents = await getTranslations("Eventos");
  const events = await getUpcomingEvents(limit, { teasersAfterFull: true });

  return (
    <section className="relative py-12 md:py-16 gradient-punk overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        aria-hidden
      >
        <div className="ska-stripes h-full w-full -skew-y-3 origin-center scale-105" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="ska-stripes-horizontal h-2 w-28 sm:w-36 mx-auto mb-6 rounded-sm" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4 md:mb-6">
            {t("upcomingEvents")}
          </h2>
          {events.length === 0 && (
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
              {t("eventsEmpty")}
            </p>
          )}
        </div>

        {events.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {events.map((event, index) => {
                const teaser = isEventTeaser(event.pageAccess);
                return (
                <RevealSection
                  key={event.id}
                  delay={0.04 + index * 0.05}
                  className={teaser ? "self-start w-full" : "h-full"}
                >
                  <EventCard
                    event={event}
                    locale={locale}
                    ctaLabel={tEvents("cardCta")}
                    pendingLabel={tEvents("detailsPending")}
                    variant={teaser ? "poster" : "compact"}
                  />
                </RevealSection>
                );
              })}
            </div>

            <RevealSection className="mt-8 md:mt-10 flex justify-center" delay={0.12}>
              <Link
                href="/eventos"
                className="inline-flex items-center gap-2 px-6 py-3 min-h-[48px] rounded-xl md:rounded-lg font-bold text-white border-2 border-white/80 hover:bg-white hover:text-black transition-all duration-300 active:scale-[0.98]"
              >
                <span>{t("eventsViewAll")}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </RevealSection>
          </>
        )}
      </div>

      <div className="ska-stripes-horizontal h-2 w-full mt-10 md:mt-12" aria-hidden />
    </section>
  );
}
