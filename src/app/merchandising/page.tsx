import { Metadata } from "next";
import {
  ShoppingBag,
  Instagram,
  ExternalLink,
  Music,
  Shirt,
  Disc,
  Shield,
} from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Merchandising - Kaos Ekaitza | Tienda Oficial",
  description:
    "Descubre nuestra tienda oficial de merchandising. Camisetas, álbumes físicos, posters y más productos con el logo y mensaje de Kaos Ekaitza.",
  keywords: [
    "merchandising kaos ekaitza",
    "tienda ska-punk",
    "camisetas antifascistas",
    "álbumes físicos",
    "merch kaos ekaitza",
    "productos música consciente",
  ],
  openGraph: {
    title: "Merchandising - Kaos Ekaitza | Tienda Oficial",
    description:
      "Descubre nuestra tienda oficial de merchandising. Camisetas, álbumes físicos, posters y más productos.",
    url: "https://kaosekaitza.com/merchandising",
    type: "website",
  },
};

// Datos de productos (por ahora hardcodeados, después se pueden mover a Prisma)
const products = [
  {
    id: 1,
    name: "Camiseta 'Kaos Ekaitza: Alerta Antifascista'",
    category: "ropa",
    description:
      "Camiseta personalizada de Kaos Ekaitza: Alerta Antifascista con diseño exclusivo",
    price: "25€",
    image:
      "https://res.cloudinary.com/dzt73baf9/image/upload/v1762140927/personaliza-tu-camiseta-personalizada--id_4ae6a119-813e-4543-a54e-4b085a534811-removebg-preview_nhfr47.png",
    available: true,
    externalUrl: null, // Si tienes una URL de tienda externa
    contactRequired: true,
  },
  {
    id: 2,
    name: "Álbum Físico 'Gritos en la Tormenta'",
    category: "musica",
    description: "CD físico del primer álbum con letras y diseño especial",
    price: "10€",
    image:
      "https://res.cloudinary.com/dzt73baf9/image/upload/v1762140436/ChatGPT_Image_5_sept_2025__17_28_21-removebg-preview_kbansb.png",
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
];

const instagramHandle = "@kaosekaitza";
const instagramUrl = "https://instagram.com/kaosekaitza";

export default function MerchandisingPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Header */}
      <section className="py-20 bg-gradient-punk">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag className="w-16 h-16 text-white mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Merchandising Oficial
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Lleva el mensaje de Kaos Ekaitza contigo. Camisetas, álbumes físicos
            y más productos para apoyar la música consciente y el cambio social.
          </p>
          <div className="ska-stripes h-2 w-48 mx-auto rounded"></div>
        </div>
      </section>

      {/* Información de compra */}
      <section className="py-12 bg-gray-900 border-y border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-600/10 border-l-4 border-red-600 p-6 rounded-r-lg">
            <div className="flex items-start gap-4">
              <Instagram className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-bold text-lg mb-2">
                  ¿Cómo comprar?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Por el momento, puedes adquirir nuestros productos
                  contactándonos directamente por Instagram. Escríbenos a{" "}
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-400 font-semibold underline"
                  >
                    {instagramHandle}
                  </a>{" "}
                  y te indicaremos el proceso de compra, envío y pago.
                </p>
                <p className="text-gray-400 text-sm italic">
                  Próximamente: tienda online con pago directo y envíos
                  automatizados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Nuestros <span className="text-red-500">Productos</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cada producto es una declaración de resistencia. Lleva el mensaje
              del ska-punk antifascista contigo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden punk-hover transition-all duration-300 hover:border-red-600 group"
              >
                {/* Imagen del producto */}
                <div className="relative h-64 bg-gradient-punk overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {product.category === "ropa" && (
                        <Shirt className="w-16 h-16 text-white opacity-50" />
                      )}
                      {product.category === "musica" && (
                        <Disc className="w-16 h-16 text-white opacity-50" />
                      )}
                      {product.category === "accesorios" && (
                        <ShoppingBag className="w-16 h-16 text-white opacity-50" />
                      )}
                      {product.category === "pack" && (
                        <Music className="w-16 h-16 text-white opacity-50" />
                      )}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                  {!product.available && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Agotado
                    </div>
                  )}
                </div>

                {/* Información del producto */}
                <div className="p-6">
                  <div className="mb-2">
                    {product.category === "ropa" && (
                      <span className="inline-block bg-red-600/20 text-red-400 text-xs font-semibold px-2 py-1 rounded mb-2">
                        Ropa
                      </span>
                    )}
                    {product.category === "musica" && (
                      <span className="inline-block bg-red-600/20 text-red-400 text-xs font-semibold px-2 py-1 rounded mb-2">
                        Música
                      </span>
                    )}
                    {product.category === "accesorios" && (
                      <span className="inline-block bg-red-600/20 text-red-400 text-xs font-semibold px-2 py-1 rounded mb-2">
                        Accesorio
                      </span>
                    )}
                    {product.category === "pack" && (
                      <span className="inline-block bg-red-600/20 text-red-400 text-xs font-semibold px-2 py-1 rounded mb-2">
                        Pack Especial
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-red-500">
                      {product.price}
                    </span>
                  </div>

                  {/* Botones de acción */}
                  <div className="space-y-2">
                    {product.externalUrl ? (
                      <a
                        href={product.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Comprar en Tienda Externa
                      </a>
                    ) : product.contactRequired ? (
                      <a
                        href={`https://instagram.com/kaosekaitza`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                        Contactar por Instagram
                      </a>
                    ) : (
                      <button
                        className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                        disabled={!product.available}
                      >
                        Agregar al Carrito
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de envíos e información adicional */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black border border-gray-800 rounded-lg p-6">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-red-500" />
                Envíos
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Realizamos envíos a toda España y Europa. Los costes de envío
                varían según el destino y se calcularán al contactarnos por
                Instagram.
              </p>
            </div>

            <div className="bg-black border border-gray-800 rounded-lg p-6">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-red-500" />
                Métodos de Pago
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Aceptamos transferencia bancaria y otros métodos de pago. Al
                contactarnos por Instagram te indicaremos todas las opciones
                disponibles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
