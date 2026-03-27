import { Metadata } from "next";
import {
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import { routing } from "@/i18n/routing";
import { NavIconMail, NavIconFlash } from "@/components/nav/NavbarSketchIcons";
import {
  ContactIconMap,
  ContactIconMobile,
} from "@/components/contact/ContactAsideIcons";
import { RevealSection } from "@/components/motion/RevealSection";
import {
  defaultOgImages,
  defaultTwitterImageUrls,
} from "@/lib/og-defaults";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDesc"),
      url: `https://kaosekaitza.com/${locale}/contacto`,
      type: "website",
      images: [...defaultOgImages],
    },
    twitter: {
      card: "summary_large_image",
      images: [...defaultTwitterImageUrls],
    },
  };
}

export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");
  const email = t("contactEmail");

  return (
    <div className="min-h-screen bg-black">
      <RevealSection className="w-full">
      <section className="relative py-10 md:py-16 lg:py-20 bg-gradient-punk overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          aria-hidden
        >
          <div className="ska-stripes h-full w-full -skew-y-6 origin-top scale-110" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 md:mb-6 tracking-tight max-md:px-1 max-md:mb-0">
            {t("title")}
          </h1>
          <p className="hidden md:block text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            {t("hero")}
          </p>
        </div>
      </section>
      </RevealSection>

      <RevealSection className="w-full" delay={0.05}>
      <section className="relative py-10 md:py-16 lg:py-20 bg-zinc-950 border-t border-red-600/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 lg:items-start">
            <aside className="order-2 lg:order-2 lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div>
                <p className="hidden md:block text-sm font-semibold uppercase tracking-wider text-red-400/90 mb-3">
                  {t("directContactLabel")}
                </p>
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <NavIconFlash
                    className="w-9 h-9 text-red-500 shrink-0"
                    aria-hidden
                  />
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {t("otherTitle")}{" "}
                    <span className="text-red-500">{t("otherTitleAccent")}</span>
                  </h2>
                </div>
              </div>

              <ul className="space-y-3 sm:space-y-4">
                <li>
                  <a
                    href={t("contactPhoneHref")}
                    className="flex gap-4 p-4 rounded-xl bg-black/40 border border-zinc-800/80 punk-hover transition-colors hover:border-red-600/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 min-h-[52px] items-center"
                  >
                    <span className="shrink-0 w-11 h-11 rounded-lg bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-400 [&_svg]:w-5 [&_svg]:h-5">
                      <ContactIconMobile />
                    </span>
                    <div className="min-w-0 text-left">
                      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wide mb-0.5">
                        {t("phoneCardTitle")}
                      </h3>
                      <p className="text-base md:text-lg font-semibold text-white break-words">
                        {t("contactPhone")}
                      </p>
                      <p className="text-sm text-zinc-500 mt-1">
                        {t("phoneCardDesc")}
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex gap-4 p-4 rounded-xl bg-black/40 border border-zinc-800/80 punk-hover transition-colors hover:border-red-600/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 min-h-[52px] items-center"
                  >
                    <span className="shrink-0 w-11 h-11 rounded-lg bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-400 [&_svg]:w-5 [&_svg]:h-5">
                      <NavIconMail aria-hidden />
                    </span>
                    <div className="min-w-0 text-left">
                      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wide mb-0.5">
                        {t("emailCardTitle")}
                      </h3>
                      <p className="text-base md:text-lg font-semibold text-white break-all">
                        {email}
                      </p>
                      <p className="text-sm text-zinc-500 mt-1">
                        {t("emailCardDesc")}
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex gap-4 p-4 rounded-xl bg-black/40 border border-zinc-800/80 min-h-[52px] items-center">
                    <span className="shrink-0 w-11 h-11 rounded-lg bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-400 [&_svg]:w-5 [&_svg]:h-5">
                      <ContactIconMap />
                    </span>
                    <div className="min-w-0 text-left">
                      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wide mb-0.5">
                        {t("locationTitle")}
                      </h3>
                      <p className="text-base md:text-lg font-semibold text-red-400">
                        {t("locationInfo")}
                      </p>
                      <p className="text-sm text-zinc-500 mt-1">
                        {t("locationDesc")}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </aside>

            <div className="order-1 lg:order-1 lg:col-span-7">
              <div className="rounded-2xl border-2 border-red-600/30 bg-gradient-to-b from-zinc-900/90 to-black p-6 sm:p-8 md:p-10 shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6 md:mb-8">
                  <span className="hidden sm:flex h-14 w-14 shrink-0 rounded-xl bg-red-600/20 border border-red-600/40 items-center justify-center text-red-400 [&_svg]:w-8 [&_svg]:h-8">
                    <NavIconMail aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                      {t("formTitle")}{" "}
                      <span className="text-red-500">{t("formTitleAccent")}</span>
                    </h2>
                    <p className="text-zinc-400 leading-relaxed text-base md:text-lg">
                      {t("formIntro")}
                    </p>
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      </RevealSection>
    </div>
  );
}
