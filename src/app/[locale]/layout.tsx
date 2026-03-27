import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RootMeta" });

  return {
    title: {
      default: t("titleDefault"),
      template: "%s | Kaos Ekaitza",
    },
    description: t("description"),
    keywords: [
      "ska-punk",
      "antifascista",
      "kaos ekaitza",
      "euskara",
      "nafarroa",
      "música consciente",
    ],
    authors: [{ name: "Kaos Ekaitza", url: "https://kaosekaitza.com" }],
    creator: "Kaos Ekaitza",
    publisher: "Kaos Ekaitza",
    robots:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/logo-192.png", sizes: "192x192", type: "image/png" },
        { url: "/logo-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon" }],
    },
    manifest: "/manifest.json",
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      locale: locale === "eu" ? "eu_ES" : "es_ES",
      url: "https://kaosekaitza.com",
      siteName: "Kaos Ekaitza",
      images: [
        {
          url: "/logo-512.png",
          width: 512,
          height: 512,
          alt: "Kaos Ekaitza",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@KaosEkaitza",
      creator: "@KaosEkaitza",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: ["/logo.png", "/logo-512.png"],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale === "eu" ? "eu" : "es"} className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
