import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export default async function BandPhotoSection() {
  const t = await getTranslations("BandPhoto");

  return (
    <section className="py-16 md:py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-red-500 mb-3">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            {t("title")}
          </h2>
        </div>

        <div className="relative w-full aspect-video max-w-5xl mx-auto rounded-lg overflow-hidden border border-gray-800 bg-black shadow-2xl">
          <Image
            src="/KaosEkaitza-2026.jpeg"
            alt={t("alt")}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/sobre-nosotros"
            className="btn-punk-outline inline-flex items-center gap-2 text-white border-white hover:bg-white hover:text-black"
          >
            <ArrowRight className="w-4 h-4" />
            <span>{t("knowBand")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
