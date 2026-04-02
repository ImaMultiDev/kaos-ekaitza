import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const MERCH_TEASER_IMAGE =
  "https://res.cloudinary.com/dzuug3ahf/image/upload/v1775145079/IMG-20260331-WA0014_rlqt9w.jpg";

export default async function HomeMerchSection() {
  const t = await getTranslations("Home");

  return (
    <section className="relative py-16 md:py-24 bg-zinc-950 border-t-2 border-red-600/50 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        aria-hidden
      >
        <div className="ska-stripes h-full w-full -skew-y-6 origin-top scale-110" />
      </div>

      <div className="relative z-10 w-full flex justify-center px-3 sm:px-6 lg:px-8">
        <Link
          href="/merchandising"
          aria-label={t("merchCta")}
          className="group block w-full max-w-lg sm:max-w-xl lg:max-w-3xl xl:max-w-4xl cursor-pointer scale-100 shadow-none rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_10px_25px_rgba(220,38,38,0.3)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:shadow-none motion-reduce:active:scale-100"
        >
          <figure className="m-0 w-full rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-3 sm:p-4 shadow-2xl shadow-black/50 flex justify-center items-center transition-all duration-300 ease-in-out group-hover:border-red-600/50 group-hover:bg-zinc-900/55">
            <Image
              src={MERCH_TEASER_IMAGE}
              alt={t("merchImageAlt")}
              width={1200}
              height={1500}
              className="w-auto max-w-full h-auto max-h-[min(72vh,820px)] md:max-h-[min(78vh,900px)] lg:max-h-[min(84vh,980px)] object-contain rounded-lg"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 36rem, (max-width: 1280px) 48rem, 56rem"
              priority={false}
            />
          </figure>
        </Link>
      </div>
    </section>
  );
}
