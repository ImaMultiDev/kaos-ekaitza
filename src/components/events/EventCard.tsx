import { Link } from "@/i18n/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import EventImage from "@/components/events/EventImage";
import EventPendingNotice from "@/components/events/EventPendingNotice";
import { isEventTeaser } from "@/lib/event-access";
import { trimImageUrl } from "@/lib/event-gallery";
import {
  formatEventDateTime,
  formatEventDay,
  formatEventMonthShort,
} from "@/lib/utils";
import type { EventPageAccess } from "@prisma/client";

export type EventCardData = {
  title: string;
  slug: string;
  excerpt: string | null;
  venue: string | null;
  city: string | null;
  startDate: Date;
  featuredImage: string | null;
  detailsPending?: boolean;
  pageAccess?: EventPageAccess;
};

type Props = {
  event: EventCardData;
  locale: string;
  ctaLabel: string;
  pendingLabel?: string;
  /** default = ficha completa; poster = solo imagen (p. ej. home); compact = imagen pequeña + ficha */
  variant?: "default" | "compact" | "poster";
};

export default function EventCard({
  event,
  locale,
  ctaLabel,
  pendingLabel,
  variant = "default",
}: Props) {
  const location = [event.venue, event.city].filter(Boolean).join(" · ");
  const isCompact = variant === "compact";
  const isPosterOnly = variant === "poster";
  const imageUrl = trimImageUrl(event.featuredImage);
  const teaser = isEventTeaser(event.pageAccess);
  const dateLabel = formatEventDateTime(event.startDate, locale);
  const imageOnly = teaser || isPosterOnly;

  const imageBlock = (
    <div
      className={
        teaser
          ? isPosterOnly
            ? "relative h-52 md:h-56 bg-black"
            : "relative h-44 sm:h-48 bg-black"
          : isCompact
            ? "relative h-44 sm:h-48 bg-black"
            : "relative h-52 md:h-56 bg-gradient-punk"
      }
    >
      {imageUrl ? (
        <EventImage
          src={imageUrl}
          alt={imageOnly ? `${event.title} — ${dateLabel}` : event.title}
          fill
          className={
            teaser
              ? "object-contain object-center p-2"
              : "object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          }
          sizes={
            teaser && !isPosterOnly
              ? "(max-width: 768px) 85vw, 320px"
              : isCompact
                ? "(max-width: 768px) 85vw, 320px"
                : "(max-width: 768px) 100vw, 50vw"
          }
        />
      ) : (
        <div className="absolute inset-0 ska-stripes opacity-30" aria-hidden />
      )}
      {!teaser && (
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
      )}

      <div className="absolute top-3 left-3 flex flex-col items-center justify-center min-w-[3.25rem] px-2 py-1.5 rounded-lg bg-red-600 text-white font-black text-center shadow-lg shadow-black/40 border border-red-400/30">
        <span className="text-[10px] uppercase tracking-wider leading-none opacity-90">
          {formatEventMonthShort(event.startDate, locale)}
        </span>
        <span className="text-xl leading-tight">
          {formatEventDay(event.startDate)}
        </span>
      </div>

      {!teaser && event.detailsPending && pendingLabel && (
        <div className="absolute bottom-3 right-3">
          <EventPendingNotice label={pendingLabel} compact />
        </div>
      )}
    </div>
  );

  const cardShellClass = imageOnly
    ? "relative flex flex-col w-full self-start bg-zinc-950 border border-zinc-800/90 rounded-2xl md:rounded-xl overflow-hidden"
    : "relative flex flex-col h-full bg-zinc-950 border border-zinc-800/90 rounded-2xl md:rounded-xl overflow-hidden";

  if (teaser) {
    return (
      <article className={cardShellClass} aria-label={dateLabel}>
        {imageBlock}
      </article>
    );
  }

  if (isPosterOnly) {
    return (
      <Link
        href={`/eventos/${event.slug}`}
        aria-label={`${event.title} — ${dateLabel}`}
        className={`group ${cardShellClass} punk-hover transition-all duration-300 hover:border-red-600/50 hover:shadow-[0_12px_40px_-12px_rgba(220,38,38,0.35)] max-md:active:scale-[0.99]`}
      >
        {imageBlock}
      </Link>
    );
  }

  return (
    <Link
      href={`/eventos/${event.slug}`}
      className={`group ${cardShellClass} punk-hover transition-all duration-300 hover:border-red-600/50 hover:shadow-[0_12px_40px_-12px_rgba(220,38,38,0.35)] max-md:active:scale-[0.99]`}
    >
      {imageBlock}

      <div className="flex flex-col flex-1 p-5 gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-red-400/90">
          {dateLabel}
        </p>
        <h3 className="text-xl font-black text-white leading-tight group-hover:text-red-400 transition-colors duration-300">
          {event.title}
        </h3>
        {location && (
          <p className="flex items-start gap-1.5 text-sm text-white/65">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-red-500/80" aria-hidden />
            <span>{location}</span>
          </p>
        )}
        {event.excerpt && !isCompact && (
          <p className="text-sm text-white/75 leading-relaxed line-clamp-2 mt-1">
            {event.excerpt}
          </p>
        )}
        <div className="flex items-center gap-2 text-red-500 font-semibold text-sm mt-auto pt-2">
          <span>{ctaLabel}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
