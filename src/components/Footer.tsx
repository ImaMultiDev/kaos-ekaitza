import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Music, Heart, Shield, Users } from "lucide-react";

export default async function Footer() {
  const t = await getTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="ska-stripes-horizontal h-1 w-full"></div>

      <footer className="bg-black border-t-2 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src="/logo-192.png?v=2"
                    alt="Kaos Ekaitza Logo"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-punk text-lg">KAOS EKAITZA</h3>
                  <p className="text-red-500 text-sm font-semibold">
                    {t("tagline")}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">{t("blurb")}</p>
              <div className="flex items-center space-x-4 text-sm text-red-500 flex-wrap gap-y-2">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{t("peace")}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>{t("resistance")}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{t("community")}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                {t("quickLinks")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/album"
                    className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center"
                  >
                    <Music className="w-4 h-4 mr-2" /> {t("discography")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sobre-nosotros"
                    className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center"
                  >
                    <Heart className="w-4 h-4 mr-2" /> {t("aboutUs")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center"
                  >
                    <Users className="w-4 h-4 mr-2" /> {t("contact")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                {t("valuesTitle")}
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-red-500" />{" "}
                  {t("antifascism")}
                </li>
                <li className="flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />{" "}
                  {t("socialJustice")}
                </li>
                <li className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-red-500" />{" "}
                  {t("community")}
                </li>
              </ul>
            </div>
          </div>

          <div className="ska-stripes h-2 w-full my-8 rounded"></div>

          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              {t("copyright", { year: currentYear })}
            </p>
            <p className="text-gray-500 text-xs mt-2">
              {t("closing")}{" "}
              <span className="text-red-500 font-semibold">{t("quote")}</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
