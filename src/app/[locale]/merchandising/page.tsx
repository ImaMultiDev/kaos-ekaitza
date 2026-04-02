import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShoppingBag, Shield } from "lucide-react";
import MerchProductGrid from "@/components/MerchProductGrid";
import { merchProductEuCopy } from "@/data/merch-products-eu";
import { routing } from "@/i18n/routing";
import { RevealSection } from "@/components/motion/RevealSection";
import { defaultOgImages, defaultTwitterImageUrls } from "@/lib/og-defaults";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MerchPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDesc"),
      url: `https://kaosekaitza.com/${locale}/merchandising`,
      type: "website",
      images: [...defaultOgImages],
    },
    twitter: {
      card: "summary_large_image",
      images: [...defaultTwitterImageUrls],
    },
  };
}

const rawMerchProducts = [
  {
    id: 1,
    name: "Camiseta Logo Circular",
    category: "ropa",
    description:
      "Camiseta de algodón negra con logo circular en el pecho, para Hombre y Mujer.",
    price: "10€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1775145079/IMG-20260331-WA0016_crspbn.jpg", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 2,
    name: "Camiseta Logo 'Kaos Ekaitza'",
    category: "ropa",
    description:
      "Camiseta de algodón negra con logo en el pecho, para Hombre y Mujer.",
    price: "10€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1775145080/IMG-20260331-WA0015_1_um5ylw.jpg", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 3,
    name: "Camiseta Logo pecho entero",
    category: "ropa",
    description:
      "Camiseta de algodón negra con logo amplio en el pecho, para Hombre y Mujer.",
    price: "10€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1775145079/IMG-20260331-WA0017_jbz454.jpg", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 4,
    name: "Camiseta Logo Delante y Detras",
    category: "ropa",
    description:
      "Camiseta de algodón negra con Logo delante y detrás, para Hombre y Mujer.",
    price: "15€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1775145081/IMG-20260331-WA0018_bsmgnt.jpg", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 5,
    name: "Sudadera Logo Circular",
    category: "ropa",
    description:
      "Sudadera de algodón negra con logo circular en el pecho, unisex.",
    price: "25€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1775145080/IMG-20260331-WA0020_1_qmcxjw.jpg", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },

  {
    id: 6,
    name: "Sudadera sin capucha con logo 'Kaos Ekaitza'",
    category: "ropa",
    description: "Sudadera sin capucha con logo en el pecho, unisex.",
    price: "25€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1775145080/IMG-20260331-WA0019_fcjagk.jpg", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
];

export default async function MerchandisingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Merch");
  const products = rawMerchProducts.map((p) => {
    const eu = merchProductEuCopy[p.id];
    if (locale === "eu" && eu) {
      return { ...p, name: eu.name, description: eu.description };
    }
    return p;
  });

  return (
    <div className="min-h-screen bg-black">
      <RevealSection className="w-full">
        <section className="py-8 md:pt-16 md:pb-7 bg-gradient-punk">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white mb-5 md:mb-4 tracking-tight max-md:px-1">
              {t("heroTitle")}{" "}
              <span className="text-red-500">{t("heroAccent")}</span>
            </h1>
            <p className="hidden md:block text-lg text-white/80 max-w-2xl mx-auto mb-4 md:mb-3 leading-relaxed">
              {t("heroSubtitle")}
            </p>
          </div>
        </section>
      </RevealSection>

      {/* Sin RevealSection aquí: bloques altos + whileInView en móvil podían dejar la galería en opacity 0 */}
      <section className="pt-4 pb-12 md:pt-3 md:pb-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MerchProductGrid products={products} storeInProgress={false} />
        </div>
      </section>

      <RevealSection className="w-full" delay={0.04}>
        <section className="py-20 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-red-500" />
                  {t("shippingTitle")}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {t("shippingBody")}
                </p>
              </div>

              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-red-500" />
                  {t("paymentTitle")}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {t("paymentBody")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>
    </div>
  );
}
