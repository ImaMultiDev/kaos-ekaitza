"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className="flex items-center rounded-md border border-gray-700 overflow-hidden bg-gray-900"
      role="group"
      aria-label="Hizkuntza / Idioma"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={`px-2.5 py-1 text-xs font-black tracking-wide transition-colors ${
            locale === loc
              ? "bg-red-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`}
          lang={loc === "eu" ? "eu" : "es"}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
