"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Facebook, Instagram, Youtube, CloudLightning } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { socialConfig } from "@/lib/social";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";
import {
  NavbarSketchIcon,
  type NavSketchIconId,
} from "@/components/nav/NavbarSketchIcons";

const socialLinks = [
  {
    name: "Facebook",
    url: socialConfig.social.facebook,
    icon: "facebook" as const,
  },
  {
    name: "Instagram",
    url: socialConfig.social.instagram,
    icon: "instagram" as const,
  },
  {
    name: "Spotify",
    url: socialConfig.social.spotify,
    icon: "spotify" as const,
  },
  {
    name: "YouTube",
    url: socialConfig.social.youtube,
    icon: "youtube" as const,
  },
  {
    name: "TikTok",
    url: socialConfig.social.tiktok,
    icon: "tiktok" as const,
  },
];

function SocialIcon({
  icon,
  compact,
  comfortable,
}: {
  icon: (typeof socialLinks)[number]["icon"];
  compact?: boolean;
  /** Icono algo mayor (franja social móvil a ancho completo) */
  comfortable?: boolean;
}) {
  const c = comfortable
    ? "w-5 h-5"
    : compact
      ? "w-[15px] h-[15px]"
      : "w-4 h-4 sm:w-[18px] sm:h-[18px]";
  if (icon === "facebook") return <Facebook className={c} />;
  if (icon === "instagram") return <Instagram className={c} />;
  if (icon === "youtube") return <Youtube className={c} />;
  if (icon === "spotify")
    return (
      <svg className={c} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    );
  return (
    <svg className={c} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

/** Iconos-only: en móvil, cuadrícula a todo el ancho con huecos táctiles cómodos */
function MobileBarSocialStrip({ t }: { t: (key: string) => string }) {
  const cellClass =
    "flex min-h-[48px] w-full min-w-0 items-center justify-center rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-red-400 hover:border-red-600/70 active:scale-[0.98] transition-all duration-200";

  return (
    <div
      className="grid w-full min-w-0 grid-cols-6 gap-2"
      role="list"
      aria-label={t("socialLabel")}
    >
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          role="listitem"
          className={cellClass}
          aria-label={social.name}
        >
          <SocialIcon icon={social.icon} comfortable />
        </a>
      ))}
      <a
        href={socialConfig.social.ekaitzarenBegia}
        target="_blank"
        rel="noopener noreferrer"
        role="listitem"
        className={cellClass}
        aria-label={t("ekaitzarenBegiaAria")}
      >
        <CloudLightning className="h-5 w-5 shrink-0" aria-hidden />
      </a>
    </div>
  );
}

function DesktopSocialCluster({ t }: { t: (key: string) => string }) {
  return (
    <div className="flex items-center gap-1.5">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white hover:text-red-500 hover:border-red-600 hover:-translate-y-0.5 transition-all duration-300"
          aria-label={social.name}
          title={social.name}
        >
          <SocialIcon icon={social.icon} />
        </a>
      ))}
      <a
        href={socialConfig.social.ekaitzarenBegia}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white hover:text-red-500 hover:border-red-600 hover:-translate-y-0.5 transition-all duration-300"
        aria-label={t("ekaitzarenBegiaAria")}
        title="Ekaitzaren Begia"
      >
        <CloudLightning className="w-[18px] h-[18px]" />
      </a>
    </div>
  );
}

function BrandBanner({ className }: { className?: string }) {
  return (
    <Image
      src="/banner2.png"
      alt="Kaos Ekaitza"
      width={640}
      height={200}
      className={cn(
        "h-11 w-auto max-h-[3.25rem] sm:max-h-[3.75rem] md:max-h-none md:h-[4.75rem] lg:h-[5.5rem] object-contain object-center",
        className,
      )}
      priority
      sizes="(max-width: 768px) 70vw, 420px"
    />
  );
}

const Navbar = () => {
  const t = useTranslations("Nav");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((o) => !o);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navItems: {
    href: string;
    labelKey: "home" | "album" | "about" | "contact";
    icon: NavSketchIconId;
  }[] = [
    { href: "/", labelKey: "home", icon: "home" },
    { href: "/album", labelKey: "album", icon: "album" },
    { href: "/sobre-nosotros", labelKey: "about", icon: "about" },
    { href: "/contacto", labelKey: "contact", icon: "contact" },
  ];

  const navIconClass = "w-[22px] h-[22px] shrink-0 md:w-5 md:h-5 lg:w-[22px] lg:h-[22px]";
  const navIconClassDrawer = "w-7 h-7 shrink-0";

  return (
    <>
      <header className="sticky top-0 z-50 bg-black border-b-2 border-red-600 shadow-[0_8px_32px_rgba(0,0,0,0.65)]">
        {/* Desktop: idioma | banner centrado | redes */}
        <div className="hidden md:block relative px-4 sm:px-6 lg:px-8 min-h-[5.5rem] lg:min-h-[6.25rem]">
          <div className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10">
            <LanguageSwitcher />
          </div>
          <div className="flex justify-center items-center py-4 lg:py-5">
            <Link
              href="/"
              className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm transition-opacity hover:opacity-95"
              aria-label="Kaos Ekaitza — inicio"
            >
              <BrandBanner />
            </Link>
          </div>
          <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10">
            <DesktopSocialCluster t={t} />
          </div>
        </div>

        {/* Desktop: solo enlaces */}
        <div className="hidden md:flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 border-t border-red-950/80 bg-gradient-to-b from-black to-zinc-950/80">
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2" aria-label={t("mainNavAria")}>
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-1 py-2 text-sm lg:text-base font-bold tracking-wide flex items-center transition-all duration-300",
                    "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-red-600 after:transition-transform after:duration-300 after:origin-left after:content-['']",
                    active
                      ? "text-red-500 after:scale-x-100 [&_.nav-sketch-icon]:text-red-500"
                      : "text-white/95 hover:text-red-400 after:scale-x-0",
                  )}
                >
                  <span className="nav-sketch-icon [&_svg]:block text-current opacity-95">
                    <NavbarSketchIcon name={item.icon} className={navIconClass} />
                  </span>
                  <span className="pl-2.5">{t(item.labelKey)}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile: título y redes fijos; panel bajo ellos con enlaces + idioma */}
        <div className="md:hidden border-t border-red-950/70 bg-gradient-to-b from-black to-zinc-950/95 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <div className="grid grid-cols-[2.875rem_1fr_2.875rem] items-center gap-2 px-3 pt-4 pb-2.5">
            <span className="w-11 shrink-0" aria-hidden />
            <Link
              href="/"
              className="min-w-0 flex justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-sm"
              aria-label="Kaos Ekaitza — inicio"
              onClick={closeMenu}
            >
              <Image
                src="/banner2.png"
                alt="Kaos Ekaitza"
                width={640}
                height={200}
                className="h-[3.2rem] sm:h-[3.45rem] w-auto max-w-[min(100%,280px)] object-contain object-center"
                priority
                sizes="(max-width: 768px) 72vw, 280px"
              />
            </Link>
            <button
              type="button"
              onClick={toggleMenu}
              className="justify-self-end shrink-0 w-11 h-11 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-white hover:text-red-400 hover:border-red-600/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors"
              aria-expanded={isOpen}
              aria-controls="mobile-nav-panel"
              aria-label={t("toggleMenu")}
            >
              {isOpen ? <X className="w-6 h-6" strokeWidth={2.2} /> : <Menu className="w-6 h-6" strokeWidth={2.2} />}
            </button>
          </div>
          <div className="border-t border-zinc-800/60 px-3 pb-3.5 pt-1.5">
            <MobileBarSocialStrip t={t} />
          </div>

          <div
            id="mobile-nav-panel"
            role="region"
            aria-hidden={!isOpen}
            inert={!isOpen}
            className={cn(
              "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isOpen ? "grid-rows-[1fr] border-t border-red-600/45" : "grid-rows-[0fr] border-t border-transparent",
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <div
                className="max-h-[min(72vh,420px)] overflow-y-auto overscroll-contain px-4 pb-5 pt-4 bg-zinc-950/98"
              >
                <nav className="flex flex-col gap-1" aria-label={t("mainNavAria")}>
                  {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        className={cn(
                          "px-4 py-3.5 rounded-lg text-base font-black tracking-wide flex items-center gap-4 border-l-4 transition-all duration-200",
                          active
                            ? "text-red-400 border-red-600 bg-red-950/40"
                            : "text-white border-transparent hover:border-red-600/60 hover:bg-white/5",
                        )}
                      >
                        <NavbarSketchIcon name={item.icon} className={navIconClassDrawer} />
                        {t(item.labelKey)}
                      </Link>
                    );
                  })}
                </nav>
                <div className="mt-6 pt-5 border-t border-zinc-800/90">
                  <LanguageSwitcher variant="prominent" className="w-full max-w-sm mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="ska-stripes-horizontal h-1 w-full" />
    </>
  );
};

export default Navbar;
