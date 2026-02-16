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
} from "lucide-react";

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* DESKTOP NAV */}
            <div className="hidden md:block">
              <div className="ml-16 flex items-baseline gap-16">
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
              ? "max-h-64 opacity-100"
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
          </div>
        </div>
      </nav>

      {/* Banda ska decorativa inferior */}
      <div className="ska-stripes-horizontal h-1 w-full"></div>
    </>
  );
};

export default Navbar;
