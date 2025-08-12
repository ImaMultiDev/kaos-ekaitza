import Link from "next/link";
import Image from "next/image";
import { Music, Heart, Shield, Users } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Banda ska decorativa superior */}
      <div className="ska-stripes-horizontal h-1 w-full"></div>

      <footer className="bg-black border-t-2 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sobre el Canal */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src="/logo-192.png"
                    alt="Kaos Ekaitza Logo"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-punk text-lg">KAOS EKAITZA</h3>
                  <p className="text-red-500 text-sm font-semibold">
                    SKA-PUNK ANTIFASCISTA
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Música consciente y cambio social. Promovemos la resistencia
                pacífica, la justicia social y el antifascismo a través del
                ska-punk. Unidos por la música, luchamos por un mundo más justo.
              </p>
              <div className="flex items-center space-x-4 text-sm text-red-500">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>Paz</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Resistencia</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Comunidad</span>
                </div>
              </div>
            </div>

            {/* Enlaces Rápidos */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                Enlaces Rápidos
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/album"
                    className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center"
                  >
                    <Music className="w-4 h-4 mr-2" /> Discografía
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sobre-nosotros"
                    className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center"
                  >
                    <Heart className="w-4 h-4 mr-2" /> Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center"
                  >
                    <Users className="w-4 h-4 mr-2" /> Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Valores */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                Nuestros Valores
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-red-500" /> Antifascismo
                </li>
                <li className="flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" /> Justicia
                  Social
                </li>
                <li className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-red-500" /> Comunidad
                </li>
              </ul>
            </div>
          </div>

          <div className="ska-stripes h-2 w-full my-8 rounded"></div>

          {/* Copyright */}
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              &copy; {currentYear} Kaos Ekaitza. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Construyendo un mundo mejor, una canción a la vez.{" "}
              <span className="text-red-500 font-semibold">
                &ldquo;No al fascismo, sí a la música.&rdquo;
              </span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
