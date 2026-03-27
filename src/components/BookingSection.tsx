import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import { NavIconFlash, NavIconMail } from "@/components/nav/NavbarSketchIcons";

export default async function BookingSection() {
  const t = await getTranslations("Booking");

  return (
    <section className="relative py-16 md:py-24 bg-zinc-950 border-t-2 border-red-600/50 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        aria-hidden
      >
        <div className="ska-stripes h-full w-full -skew-y-6 origin-top scale-110" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="ska-stripes-horizontal h-2 w-28 sm:w-36 mx-auto mb-6 rounded-sm" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4 md:mb-6">
            {t("eyebrow")}
          </h2>
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-400/90 mb-3">
              {t("contactsTitle")}
            </p>
            <ul className="space-y-4">
              <li>
                <a
                  href={t("contactPhoneHref")}
                  className="flex gap-4 p-4 rounded-xl bg-black/40 border border-zinc-800/80 punk-hover transition-colors hover:border-red-600/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                >
                  <span className="shrink-0 w-10 h-10 rounded-lg bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-400">
                    <Phone className="w-5 h-5" strokeWidth={2.5} aria-hidden />
                  </span>
                  <p className="text-base md:text-lg text-zinc-200 leading-snug pt-1.5">
                    {t("contactPhone")}
                  </p>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t("contactEmail")}`}
                  className="flex gap-4 p-4 rounded-xl bg-black/40 border border-zinc-800/80 punk-hover transition-colors hover:border-red-600/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                >
                  <span className="shrink-0 w-10 h-10 rounded-lg bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-400">
                    <Mail className="w-5 h-5" strokeWidth={2.5} aria-hidden />
                  </span>
                  <p className="text-base md:text-lg text-zinc-200 leading-snug pt-1.5 break-words">
                    {t("contactEmail")}
                  </p>
                </a>
              </li>
            </ul>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-zinc-500 text-sm">
              <MapPin
                className="w-4 h-4 text-red-500/80 shrink-0"
                aria-hidden
              />
              <span>{t("areaNote")}</span>
              <span className="text-zinc-600 max-sm:hidden" aria-hidden>
                —
              </span>
              <span className="inline-flex items-center gap-2 flex-wrap">
                <CalendarDays
                  className="w-4 h-4 text-red-500/80 shrink-0"
                  aria-hidden
                />
                <span>
                  {t("eyebrow")}
                  <span className="text-zinc-600"> — </span>
                  {t("availabilityNote")}
                </span>
              </span>
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="h-full rounded-2xl border-2 border-red-600/35 bg-gradient-to-b from-zinc-900/90 to-black p-8 md:p-10 flex flex-col shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
              <h3 className="text-xl md:text-2xl font-black text-white mb-3">
                {t("cardTitle")}
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-8 flex-1">
                {t("cardBody")}
              </p>
              <p className="text-sm text-zinc-500 mb-6">{t("hint")}</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <Link
                  href="/contacto"
                  className="btn-punk inline-flex items-center justify-center gap-2 text-center flex-1 [&_svg]:block"
                >
                  <NavIconMail className="w-5 h-5 shrink-0" />
                  <span>{t("cta")}</span>
                </Link>
                <Link
                  href="/sobre-nosotros"
                  className="btn-punk-outline inline-flex items-center justify-center gap-2 text-white border-zinc-600 hover:border-white flex-1 [&_svg]:block"
                >
                  <NavIconFlash className="w-5 h-5 shrink-0" />
                  <span>{t("ctaSecondary")}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
