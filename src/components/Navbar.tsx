"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Music,
  Users,
  Mail,
  Instagram,
  Youtube,
  CloudLightning,
} from "lucide-react";
import { socialConfig } from "@/lib/social";

const socialLinks = [
  {
    name: "Instagram",
    url: socialConfig.social.instagram,
    icon: "instagram",
  },
  {
    name: "Spotify",
    url: socialConfig.social.spotify,
    icon: "spotify",
  },
  {
    name: "YouTube",
    url: socialConfig.social.youtube,
    icon: "youtube",
  },
  {
    name: "TikTok",
    url: socialConfig.social.tiktok,
    icon: "tiktok",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/album", label: "Album", icon: Music },
    { href: "/sobre-nosotros", label: "Conocenos", icon: Users },
    { href: "/contacto", label: "Contacto", icon: Mail },
  ];

  return (
    <>
      <nav className="bg-black border-b-2 border-red-600 sticky top-0 z-50">
        <div className="w-full max-w-7xl md:max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          {/* CONTENEDOR PRINCIPAL */}
          <div className="relative flex items-center justify-between h-16">
            {/* LOGO (izquierda) */}
            <Link href="/" className="flex items-center z-10">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo-192.png?v=2"
                  alt="Kaos Ekaitza Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            </Link>

            {/* BANNER CENTRADO EN MOBILE */}
            <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
              <Image
                src="/banner.png?v=2"
                alt="Kaos Ekaitza"
                width={160}
                height={80}
                className="object-cover"
                priority
              />
            </div>

            {/* DESKTOP NAV + REDES */}
            <div className="hidden md:flex md:items-center md:ml-16 md:gap-8">
              <div className="flex items-baseline gap-10">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative group px-2 py-2 text-md font-bold tracking-wide flex items-center transition-all duration-300 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-red-600 after:transition-transform after:duration-300 after:origin-left after:content-[''] ${
                        active
                          ? "text-red-500 after:scale-x-100"
                          : "text-white hover:text-red-500 hover:-translate-y-0.5 after:scale-x-0 group-hover:after:scale-x-100"
                      }`}
                    >
                      <IconComponent className="w-4 h-4 shrink-0" />
                      <span className="pl-3">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
              {/* Iconos redes sociales - estilo Kaotiko */}
              <div className="flex items-center gap-2 pl-4 border-l border-gray-700">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-white hover:text-red-500 hover:border-red-600 transition-all duration-300"
                    aria-label={social.name}
                    title={social.name}
                  >
                    {social.icon === "instagram" && (
                      <Instagram className="w-4 h-4" />
                    )}
                    {social.icon === "youtube" && (
                      <Youtube className="w-4 h-4" />
                    )}
                    {social.icon === "spotify" && (
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                      </svg>
                    )}
                    {social.icon === "tiktok" && (
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    )}
                  </a>
                ))}
                <a
                  href={socialConfig.social.ekaitzarenBegia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-white hover:text-red-500 hover:border-red-600 transition-all duration-300"
                  aria-label="Ekaitzaren Begia - Todas nuestras redes"
                  title="Ekaitzaren Begia"
                >
                  <CloudLightning className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* BOTÓN MOBILE */}
            <div className="md:hidden z-10">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-red-500 focus:outline-none transition-colors duration-300"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE NAV */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-[420px] opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-red-600">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-base font-bold tracking-wide flex items-center border-l-2 transition-all duration-300 ${
                    active
                      ? "text-red-500 border-red-600 bg-red-950/30"
                      : "text-white hover:text-red-500 hover:border-red-600/50 border-transparent"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="w-5 h-5 shrink-0" />
                  <span className="pl-4">{item.label}</span>
                </Link>
              );
            })}
            {/* Redes sociales - estilo Kaotiko (lista vertical) */}
            <div className="pt-3 mt-3 border-t border-gray-700">
              <p className="px-3 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Redes
              </p>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-md text-base font-bold tracking-wide flex items-center text-white hover:text-red-500 hover:border-red-600/50 border-l-2 border-transparent transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {social.name}
                </a>
              ))}
              <a
                href={socialConfig.social.ekaitzarenBegia}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-md text-base font-bold tracking-wide flex items-center gap-2 text-white hover:text-red-500 hover:border-red-600/50 border-l-2 border-transparent transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                <CloudLightning className="w-5 h-5 shrink-0" />
                Ekaitzaren Begia
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Banda ska decorativa inferior */}
      <div className="ska-stripes-horizontal h-1 w-full"></div>
    </>
  );
};

export default Navbar;
