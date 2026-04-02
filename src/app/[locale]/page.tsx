import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import HeroSection from "@/components/HeroSection";
import BookingSection from "@/components/BookingSection";
import PhilosophySection from "@/components/PhilosophySection";
import HomeMerchSection from "@/components/HomeMerchSection";
import { HomeBombIcon } from "@/components/HomeBombIcon";
import {
  NavIconFlash,
  NavIconMail,
  NavIconMusic,
} from "@/components/nav/NavbarSketchIcons";
import { routing } from "@/i18n/routing";
import { RevealSection } from "@/components/motion/RevealSection";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");

  return (
    <div className="min-h-screen bg-black">
      <RevealSection className="w-full">
        <HeroSection />
      </RevealSection>

      <RevealSection className="w-full" delay={0.04}>
        <BookingSection />
      </RevealSection>

      <RevealSection className="w-full" delay={0.06}>
        <section className="py-10 gradient-punk">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 text-center text-white">
            <div className="text-sm uppercase tracking-[0.25em] text-white/80">
              {t("upcomingEvents")}
            </div>
            <HomeBombIcon className="w-12 h-12 shrink-0 text-white/90 mx-auto" />
            <p className="text-lg font-semibold text-white">
              {t("eventsNewsSoon")}
            </p>
          </div>
        </section>
      </RevealSection>

      <RevealSection className="w-full" delay={0.07}>
        <HomeMerchSection />
      </RevealSection>

      <RevealSection className="w-full" delay={0.06}>
        <PhilosophySection />
      </RevealSection>

      <RevealSection className="w-full" delay={0.1}>
        <section className="py-16 bg-black">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-white">
              {t("ctaTitle")}
            </h2>
            <p className="hidden md:block text-white/80 max-w-2xl mx-auto">
              {t("ctaSubtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/album"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-6 py-3 font-bold text-white transition-all duration-300 bg-red-600 scale-100 shadow-none hover:bg-red-500 hover:scale-105 hover:shadow-[0_10px_25px_rgba(220,38,38,0.3)] [&_svg]:block"
              >
                <NavIconMusic className="w-5 h-5 shrink-0" />
                <span>{t("listen")}</span>
              </Link>
              <Link
                href="/sobre-nosotros"
                className="btn-punk-outline inline-flex items-center gap-2 text-white border-white hover:bg-white hover:text-black [&_svg]:block"
              >
                <NavIconFlash className="w-5 h-5 shrink-0" />
                <span>{t("knowBandBtn")}</span>
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
