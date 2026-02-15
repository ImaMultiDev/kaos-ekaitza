"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Instagram,
  ExternalLink,
  Shirt,
  Disc,
  ShoppingBag,
  Music,
  X,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  available: boolean;
  externalUrl: string | null;
  contactRequired: boolean;
};

type Props = { product: Product; storeInProgress?: boolean };

export default function MerchProductCard({ product, storeInProgress = false }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="bg-gray-900 border-2 border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-red-600 group">
        {/* Imagen del producto - clickeable */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="relative h-64 w-full bg-gray-800 overflow-hidden block text-left cursor-pointer"
        >
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
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />
          {!product.available && (
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              Agotado
            </div>
          )}
        </button>

        {/* Información del producto - título y precio clickeables */}
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

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-left w-full hover:opacity-90 transition-opacity cursor-pointer"
          >
            <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            <span className="text-2xl font-black text-red-500">{product.price}</span>
          </button>

          {/* Botones de acción */}
          <div className="space-y-2 mt-4">
            {storeInProgress ? (
              <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 text-gray-400 font-bold rounded-lg cursor-not-allowed">
                Tienda en proceso — No disponible
              </div>
            ) : product.externalUrl ? (
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
                href="https://instagram.com/kaosekaitza"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
              >
                <Instagram className="w-5 h-5" />
                Contactar por Instagram
              </a>
            ) : (
              <button
                type="button"
                className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                disabled={!product.available}
              >
                Agregar al Carrito
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal vista ampliada */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada del producto"
        >
          <div
            className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-red-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              {product.image ? (
                <div className="relative aspect-square w-full min-h-[280px]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 512px"
                  />
                </div>
              ) : (
                <div className="aspect-square flex items-center justify-center bg-gray-800">
                  <Shirt className="w-24 h-24 text-gray-600" />
                </div>
              )}

              <div className="p-6 border-t border-gray-800">
                <h3 className="text-2xl font-black text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-400 mb-4">{product.description}</p>
                <span className="text-3xl font-black text-red-500 block mb-6">
                  {product.price}
                </span>
                {storeInProgress ? (
                  <div className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gray-700 text-gray-400 font-bold rounded-lg">
                    Tienda en proceso — No disponible
                  </div>
                ) : (
                  <a
                    href="https://instagram.com/kaosekaitza"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    Contactar por Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
