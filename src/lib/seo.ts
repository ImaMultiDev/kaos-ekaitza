// SEO Configuration
export const seoConfig = {
  site: {
    name: "Kaos Ekaitza",
    title:
      "Kaos Ekaitza - Ska-Punk Antifascista | Música Consciente y Cambio Social",
    description:
      "Canal musical ska-punk antifascista que promueve la resistencia pacífica, justicia social y cambio positivo a través de la música consciente.",
    url: "https://kaosekaitza.com",
    logo: "/logo-512.png",
    logo192: "/logo-192.png",
    themeColor: "#dc2626",
    backgroundColor: "#000000",
  },

  // Keywords principales para SEO
  keywords: [
    "ska-punk",
    "antifascista",
    "música consciente",
    "resistencia pacífica",
    "justicia social",
    "kaos ekaitza",
    "música protesta",
    "punk rock",
    "ska",
    "antifascismo",
    "música social",
    "cambio social",
    "música política",
    "rock comprometido",
    "música libertaria",
    "ska-punk antifascista",
    "música consciente españa",
    "rock social",
    "punk comprometido",
    "ska político",
  ],

  // Estructura de datos JSON-LD
  structuredData: {
    organization: {
      "@context": "https://schema.org",
      "@type": "MusicGroup",
      name: "Kaos Ekaitza",
      description:
        "Canal musical ska-punk antifascista que promueve la resistencia pacífica y la justicia social",
      url: "https://kaosekaitza.com",
      logo: "https://kaosekaitza.com/logo-512.png",
      sameAs: [
        "https://www.youtube.com/@KaosEkaitza",
        "https://open.spotify.com/artist/kaosekaitza",
        "https://kaosekaitza.bandcamp.com",
      ],
      genre: ["Ska-Punk", "Punk Rock", "Ska", "Rock Social"],
      foundingDate: "2024",
      areaServed: "Worldwide",
      slogan: "La revolución comienza con una canción",
    },

    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Kaos Ekaitza",
      description:
        "Canal musical ska-punk antifascista que promueve la resistencia pacífica y la justicia social",
      url: "https://kaosekaitza.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://kaosekaitza.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  },

  // Configuración de Open Graph
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Kaos Ekaitza",
    images: [
      {
        url: "/logo-512.png",
        width: 512,
        height: 512,
        alt: "Kaos Ekaitza - Logo Ska-Punk Antifascista",
        type: "image/png",
      },
      {
        url: "/logo-192.png",
        width: 192,
        height: 192,
        alt: "Kaos Ekaitza - Logo Ska-Punk Antifascista",
        type: "image/png",
      },
    ],
  },

  // Configuración de Twitter Cards
  twitter: {
    card: "summary_large_image",
    site: "@KaosEkaitza",
    creator: "@KaosEkaitza",
  },

  // Configuración de robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Configuración de sitemap
  sitemap: {
    changefreq: "weekly",
    priority: 0.7,
  },
};
