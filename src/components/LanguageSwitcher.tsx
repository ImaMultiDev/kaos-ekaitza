"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Más grande y táctil (drawer móvil) */
  variant?: "compact" | "prominent";
};

export default function LanguageSwitcher({
  className,
  variant = "compact",
}: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const prominent = variant === "prominent";

  return (
    <div
      className={cn(
        "flex items-stretch rounded-md border border-gray-700 overflow-hidden bg-gray-900/90",
        prominent && "rounded-lg border-red-600/50 shadow-[inset_0_0_0_1px_rgba(220,38,38,0.15)]",
        className,
      )}
      role="group"
      aria-label="Hizkuntza / Idioma"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={cn(
            "font-black tracking-widest transition-colors min-w-[2.75rem]",
            prominent
              ? "flex-1 px-4 py-3.5 text-sm sm:text-base"
              : "px-2.5 py-1.5 text-xs",
            locale === loc
              ? "bg-red-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800",
          )}
          lang={loc === "eu" ? "eu" : "es"}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
