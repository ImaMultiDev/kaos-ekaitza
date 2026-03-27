import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShoppingBag, Shield, Construction } from "lucide-react";
import MerchProductGrid from "@/components/MerchProductGrid";
import MerchPasswordGate from "@/components/MerchPasswordGate";
import { merchProductEuCopy } from "@/data/merch-products-eu";
import { routing } from "@/i18n/routing";

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
    },
  };
}

const rawMerchProducts = [
  {
    id: 1,
    name: "Camiseta negra de hombre 'Kaos Ekaitza' V01",
    category: "ropa",
    gender: "hombre",
    description:
      "Camiseta de algodón negra con diseño Kaos Ekaitza. Corte masculino.",
    price: "15€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771191009/HOMBRE_01_yhhssf.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 2,
    name: "Camiseta negra de mujer 'Kaos Ekaitza'",
    category: "ropa",
    gender: "mujer",
    description:
      "Camiseta de algodón negra con diseño Kaos Ekaitza. Corte femenino.",
    price: "15€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771191599/MUJER_01_e2l1cv.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 3,
    name: "Camiseta negra de hombre 'Kaos Ekaitza' V02",
    category: "ropa",
    gender: "hombre",
    description:
      "Camiseta de algodón blanca con diseño Kaos Ekaitza. Corte masculino.",
    price: "15€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771191008/HOMBRE_02_v7nxzz.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 4,
    name: "Camiseta negra de mujer 'Kaos Ekaitza'",
    category: "ropa",
    gender: "mujer",
    description:
      "Camiseta de algodón negra con diseño Kaos Ekaitza. Corte femenino.",
    price: "15€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771191598/MUJER_02_w2tk9q.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 5,
    name: "Camiseta negra de hombre 'Kaos Ekaitza' V03",
    category: "ropa",
    gender: "hombre",
    description:
      "Camiseta de algodón negra con diseño Kaos Ekaitza. Corte masculino.",
    price: "15€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771191011/HOMBRE_03_cmgdfu.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 6,
    name: "Camiseta negra de mujer 'Kaos Ekaitza' V03",
    category: "ropa",
    gender: "mujer",
    description:
      "Camiseta de algodón negra con diseño Kaos Ekaitza. Corte femenino.",
    price: "15€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771192073/MUJER_04_qfly5y.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 7,
    name: "Camiseta negra de hombre 'Kaos Ekaitza' V04",
    category: "ropa",
    gender: "hombre",
    description:
      "Camiseta de algodón negra con diseño Kaos Ekaitza. Corte masculino.",
    price: "15€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771185287/Oficial03_hfxjth.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 8,
    name: "Camiseta negra de mujer 'Kaos Ekaitza' V04",
    category: "ropa",
    gender: "mujer",
    description:
      "Camiseta de algodón negra con diseño Kaos Ekaitza. Corte femenino.",
    price: "15€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771185892/MUJER_NEGRA01_zohx2o.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 9,
    name: "Camiseta blanca de hombre 'Kaos Ekaitza' V01",
    category: "ropa",
    gender: "hombre",
    description:
      "Camiseta de algodón blanca con diseño Kaos Ekaitza. Corte masculino.",
    price: "15€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771191409/HOMBRE_BLANCA_01_n709cc.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 10,
    name: "Camiseta blanca de mujer 'Kaos Ekaitza' V01",
    category: "ropa",
    gender: "mujer",
    description:
      "Camiseta de algodón blanca con diseño Kaos Ekaitza. Corte femenino.",
    price: "15€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771191594/MUJER_BLANCA02_kboybt.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 11,
    name: "Camiseta blanca de hombre 'Kaos Ekaitza' V02",
    category: "ropa",
    gender: "hombre",
    description:
      "Camiseta de algodón blanca con diseño Kaos Ekaitza. Corte masculino.",
    price: "15€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771191410/HOMBRE_BLANCA_02_cm5tv6.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 12,
    name: "Camiseta blanca de mujer 'Kaos Ekaitza' V02",
    category: "ropa",
    gender: "mujer",
    description:
      "Camiseta de algodón blanca con diseño Kaos Ekaitza. Corte femenino.",
    price: "15€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771191594/MUJER_BLANCA03_u3kwmm.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 13,
    name: "Camiseta blanca de hombre 'Kaos Ekaitza' V03",
    category: "ropa",
    gender: "hombre",
    description:
      "Camiseta de algodón blanca con diseño Kaos Ekaitza. Corte masculino.",
    price: "15€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771185314/Blanca02_tnmyft.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 15,
    name: "Camiseta blanca de mujer 'Kaos Ekaitza' V03",
    category: "ropa",
    gender: "mujer",
    description:
      "Camiseta de algodón blanca con diseño Kaos Ekaitza. Corte femenino.",
    price: "15€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771185892/MUJER_BLANCA01B_yuxiis.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },

  {
    id: 16,
    name: "Camiseta negra de hombre 'Renace'",
    category: "ropa",
    gender: "hombre",
    description:
      "Camiseta de algodón negra con diseño Renace. Corte masculino.",
    price: "15€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771186582/CAMISETA_RENACE_xnfxq5.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 17,
    name: "Camiseta negra de mujer 'Renace'",
    category: "ropa",
    gender: "mujer",
    description: "Camiseta de algodón negra con diseño Renace. Corte femenino.",
    price: "15€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771186681/CAMISETA_RENACE_MUJER_dmwyhd.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 18,
    name: "Chaqueta unisex 'Kaos Ekaitza' V01",
    category: "ropa",
    gender: "unisex",
    description:
      "Chaqueta unisex con diseño Kaos Ekaitza. Perfecta para cualquier ocasión.",
    price: "35€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771250176/Chaqueta_KAOS_EKAITZA_00_ecfjzo.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 19,
    name: "Chaqueta unisex 'Kaos Ekaitza' V02",
    category: "ropa",
    gender: "unisex",
    description:
      "Chaqueta unisex con diseño Kaos Ekaitza. Perfecta para cualquier ocasión.",
    price: "35€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771250176/Chaqueta_KAOS_EKAITZA_01_pg3zx5.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 20,
    name: "Chaqueta unisex 'Kaos Ekaitza' V03",
    category: "ropa",
    gender: "unisex",
    description:
      "Chaqueta unisex con diseño Kaos Ekaitza. Perfecta para cualquier ocasión.",
    price: "35€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771186183/Chaqueta_KAOS_EKAITZA_cn9w4m.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 21,
    name: "Sudadera unisex 'Kaos Ekaitza' V01",
    category: "ropa",
    gender: "unisex",
    description: "Sudadera unisex con diseño Kaos Ekaitza. Cómoda y cálida.",
    price: "30€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771186210/SUDADERA_SIN_CAPUCHA_KAOS_EKAITZA_af0jpn.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 22,
    name: "Sudadera unisex 'Kaos Ekaitza' V02",
    category: "ropa",
    gender: "unisex",
    description: "Sudadera unisex con diseño Kaos Ekaitza. Cómoda y cálida.",
    price: "30€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771249966/SUDADERA_SIN_CAPUCHA_KAOS_EKAITZA_01_hi4okp.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },

  {
    id: 23,
    name: "Sudadera con capucha 'Kaos Ekaitza' V02",
    category: "ropa",
    gender: "unisex",
    description:
      "Sudadera con capucha y diseño Kaos Ekaitza. Unisex, cómoda y abrigada.",
    price: "30€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771249966/SUDADERA_CON_CAPUCHA_KAOS_EKAITZA_00_leqv7q.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 24,
    name: "Sudadera con capucha 'Kaos Ekaitza' V03",
    category: "ropa",
    gender: "unisex",
    description:
      "Sudadera con capucha y diseño Kaos Ekaitza. Unisex, cómoda y abrigada.",
    price: "30€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771249966/SUDADERA_CON_CAPUCHA_KAOS_EKAITZA_01_ydl3wl.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 25,
    name: "Sudadera con capucha 'Kaos Ekaitza' V01",
    category: "ropa",
    gender: "unisex",
    description:
      "Sudadera con capucha y diseño Kaos Ekaitza. Unisex, cómoda y abrigada.",
    price: "30€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771186213/SUDADERA_CON_CAPUCHA_KAOS_EKAITZA_zpqi4w.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 27,
    name: "Mecheros 'Kaos Ekaitza' V01",
    category: "accesorio",
    description:
      "Mecheros con diseño Kaos Ekaitza. Estilo urbano y resistente.",
    price: "1€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771192857/MECHEROS02_dnz5ep.png", // Cloudinary URL
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 28,
    name: "Mecheros 'Kaos Ekaitza' V02",
    category: "accesorio",
    description:
      "Mecheros con diseño Kaos Ekaitza. Estilo urbano y resistente.",
    price: "1€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771193548/Mecheros00_wetlly.png", // Cloudinary URL/upload/v1771186180/Bombe
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 29,
    name: "Album físico 01 'Kaos Ekaitza - Gritos en la Tormenta' ",
    category: "album",
    description: "Album físico 01 de Kaos Ekaitza. Gritos en la Tormenta.",
    price: "10€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771193380/Album01_uqju7h.png", // Cloudinary URL/upload/v1771186180/Bombe
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
  {
    id: 30,
    name: "Album físico 02 'Kaos Ekaitza - Revienta el Silencio' ",
    category: "album",
    description: "Album físico 02 de Kaos Ekaitza. Revienta el Silencio.",
    price: "10€",
    image:
      "https://res.cloudinary.com/dzuug3ahf/image/upload/v1771193421/Album02_t9stnd.png", // Cloudinary URL/upload/v1771186180/Bombe
    available: true,
    externalUrl: null,
    contactRequired: true,
  },
];

const instagramHandle = "@kaosekaitza";
const instagramUrl = "https://instagram.com/kaosekaitza";

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

  const isProtected = !!process.env.MERCH_PASSWORD;

  return (
    <MerchPasswordGate protected={isProtected}>
      <div className="min-h-screen bg-black">
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-punk">
          <div className="text-center mb-4">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              {t("heroTitle")}{" "}
              <span className="text-red-500">{t("heroAccent")}</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t("heroSubtitle")}
            </p>
          </div>
        </section>

        <section className=" bg-gray-900 border-y border-gray-800">
          <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="bg-amber-600/10 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <div className="flex items-start gap-4">
                <Construction className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {t("wipTitle")}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    {t("wipP1")}
                  </p>
                  <p className="text-gray-400 text-sm italic">
                    {t("wipP2a")}{" "}
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-amber-300 font-semibold underline"
                    >
                      {instagramHandle}
                    </a>{" "}
                    {t("wipP2b")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MerchProductGrid products={products} storeInProgress />
          </div>
        </section>

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
      </div>
    </MerchPasswordGate>
  );
}
