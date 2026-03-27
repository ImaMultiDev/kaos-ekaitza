"use client";

import { Shirt, Package, Disc } from "lucide-react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Merch");

  const categories: {
    id: CategoryFilter;
    labelKey: "catAll" | "catClothes" | "catArticles" | "catAlbums";
    icon: typeof Shirt | null;
  }[] = [
    { id: "todos", labelKey: "catAll", icon: null },
    { id: "ropa", labelKey: "catClothes", icon: Shirt },
    { id: "articulos", labelKey: "catArticles", icon: Package },
    { id: "albumes", labelKey: "catAlbums", icon: Disc },
  ];

  const genders: { id: GenderFilter; labelKey: "genAll" | "genMen" | "genWomen" | "genUnisex" }[] = [
    { id: "todos", labelKey: "genAll" },
    { id: "hombre", labelKey: "genMen" },
    { id: "mujer", labelKey: "genWomen" },
    { id: "unisex", labelKey: "genUnisex" },
  ];

  return (
    <div className="flex flex-col gap-4 mb-12">
      <div>
        <p className="text-gray-400 text-sm font-semibold mb-3">
          {t("filterCategory")}
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map(({ id, labelKey, icon: Icon }) => (
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
              {t(labelKey)}
            </button>
          ))}
        </div>
      </div>

      {showGenderFilters && (
        <div>
          <p className="text-gray-400 text-sm font-semibold mb-3">
            {t("filterGender")}
          </p>
          <div className="flex flex-wrap gap-2">
            {genders.map(({ id, labelKey }) => (
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
                {t(labelKey)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
