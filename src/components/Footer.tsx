import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Heart, Shield, Users } from "lucide-react";
import {
  NavIconFlash,
  NavIconMail,
  NavIconMusic,
  NavbarSketchIcon,
} from "@/components/nav/NavbarSketchIcons";

export default async function Footer() {
  const t = await getTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="ska-stripes-horizontal h-px md:h-1 w-full" aria-hidden />

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
              <p className="hidden md:block text-gray-300 mb-4 leading-relaxed">
                {t("blurb")}
              </p>
              <div className="hidden md:flex items-center space-x-4 text-sm text-red-500 flex-wrap gap-y-2">
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

            <div className="hidden md:block">
              <h3 className="text-white font-bold text-lg mb-4">
                {t("quickLinks")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/album"
                    className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center [&_svg]:block"
                  >
                    <NavIconMusic className="w-[18px] h-[18px] mr-2 shrink-0" />{" "}
                    {t("discography")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/merchandising"
                    className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center [&_svg]:block"
                  >
                    <NavbarSketchIcon
                      name="merch"
                      className="w-[18px] h-[18px] mr-2 shrink-0"
                    />{" "}
                    {t("merchandising")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sobre-nosotros"
                    className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center [&_svg]:block"
                  >
                    <NavIconFlash className="w-[18px] h-[18px] mr-2 shrink-0" />{" "}
                    {t("aboutUs")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center [&_svg]:block"
                  >
                    <NavIconMail className="w-[18px] h-[18px] mr-2 shrink-0" />{" "}
                    {t("contact")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="ska-stripes h-px md:h-2 w-full my-4 md:my-8 rounded"
            aria-hidden
          />

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
