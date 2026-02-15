"use client";

import { useState } from "react";
import MerchFilters, {
  type CategoryFilter,
  type GenderFilter,
} from "@/components/MerchFilters";
import MerchProductCard from "@/components/MerchProductCard";

export type Product = {
  id: number;
  name: string;
  category: string;
  gender?: string;
  description: string;
  price: string;
  image: string;
  available: boolean;
  externalUrl: string | null;
  contactRequired: boolean;
};

type Props = {
  products: Product[];
  storeInProgress?: boolean;
};

function filterByCategory(product: Product, category: CategoryFilter): boolean {
  if (category === "todos") return true;
  if (category === "ropa") return product.category === "ropa";
  if (category === "articulos") return product.category === "accesorio";
  if (category === "albumes") return product.category === "album";
  return true;
}

function filterByGender(product: Product, gender: GenderFilter): boolean {
  if (gender === "todos") return true;
  if (!product.gender) return true; // articulos/albumes no tienen gender
  return product.gender === gender;
}

export default function MerchProductGrid({
  products,
  storeInProgress = false,
}: Props) {
  const [category, setCategory] = useState<CategoryFilter>("todos");
  const [gender, setGender] = useState<GenderFilter>("todos");

  const filteredProducts = products.filter(
    (p) => filterByCategory(p, category) && filterByGender(p, gender)
  );

  return (
    <>
      <MerchFilters
        category={category}
        gender={gender}
        onCategoryChange={(c) => {
          setCategory(c);
          if (c !== "ropa") setGender("todos");
        }}
        onGenderChange={setGender}
        showGenderFilters={category === "ropa"}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <MerchProductCard
            key={product.id}
            product={product}
            storeInProgress={storeInProgress}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-400 py-12">
          No hay productos que coincidan con los filtros seleccionados.
        </p>
      )}
    </>
  );
}
