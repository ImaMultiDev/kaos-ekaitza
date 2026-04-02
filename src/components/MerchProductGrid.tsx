"use client";

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

export default function MerchProductGrid({
  products,
  storeInProgress = false,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <MerchProductCard
          key={product.id}
          product={product}
          storeInProgress={storeInProgress}
        />
      ))}
    </div>
  );
}
