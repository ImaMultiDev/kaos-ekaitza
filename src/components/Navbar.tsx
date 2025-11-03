"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Home, Music, Users, Mail, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/album", label: "Album", icon: Music },
    { href: "/merchandising", label: "Merchandising", icon: ShoppingBag },
    { href: "/sobre-nosotros", label: "Sobre Nosotros", icon: Users },
    { href: "/contacto", label: "Contacto", icon: Mail },
  ];

  return (
    <>
      <nav className="bg-black border-b-2 border-red-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center punk-hover">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo-192.png"
                  alt="Kaos Ekaitza Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="ml-3">
                <h1 className="text-punk text-xl font-black">KAOS EKAITZA</h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-16 flex items-baseline gap-16">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-white hover:text-red-500 p-2 rounded-md text-md font-bold tracking-wide transition-all duration-300 flex items-center punk-hover"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-md" style={{ paddingLeft: "12px" }}>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-red-500 focus:outline-none focus:text-red-500 transition-colors duration-300"
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

        {/* Mobile Navigation */}
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
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-red-500 px-3 py-2 rounded-md text-base font-bold tracking-wide transition-all duration-300 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="w-5 h-5" />
                  <span style={{ paddingLeft: "16px" }}>{item.label}</span>
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
