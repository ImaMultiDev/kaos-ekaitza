"use client";

import { Shirt, Package, Disc } from "lucide-react";

export type CategoryFilter = "ropa" | "articulos" | "albumes" | "todos";
export type GenderFilter = "hombre" | "mujer" | "unisex" | "todos";

type Props = {
  category: CategoryFilter;
  gender: GenderFilter;
  onCategoryChange: (c: CategoryFilter) => void;
  onGenderChange: (g: GenderFilter) => void;
  showGenderFilters: boolean;
};

export default function MerchFilters({
  category,
  gender,
  onCategoryChange,
  onGenderChange,
  showGenderFilters,
}: Props) {
  return (
    <div className="flex flex-col gap-4 mb-12">
      {/* Filtro por categoría */}
      <div>
        <p className="text-gray-400 text-sm font-semibold mb-3">Categoría</p>
        <div className="flex flex-wrap gap-2">
          {[
            { id: "todos" as const, label: "Todos", icon: null },
            { id: "ropa" as const, label: "Ropa", icon: Shirt },
            { id: "articulos" as const, label: "Artículos", icon: Package },
            { id: "albumes" as const, label: "Álbumes", icon: Disc },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onCategoryChange(id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                category === id
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtro por género (solo cuando categoria = ropa) */}
      {showGenderFilters && (
        <div>
          <p className="text-gray-400 text-sm font-semibold mb-3">Ropa para</p>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "todos" as const, label: "Todos" },
              { id: "hombre" as const, label: "Hombre" },
              { id: "mujer" as const, label: "Mujer" },
              { id: "unisex" as const, label: "Unisex" },
            ].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => onGenderChange(id)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                  gender === id
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
