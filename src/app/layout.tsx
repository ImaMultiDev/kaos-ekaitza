import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title:
    "Kaos Ekaitza - Ska-Punk Antifascista | Música Consciente y Cambio Social",
  description:
    "Canal musical ska-punk antifascista que promueve la resistencia pacífica, justicia social y cambio positivo. Escucha música consciente que lucha por un mundo más justo. Únete a la revolución musical.",
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
    title:
      "Kaos Ekaitza - Ska-Punk Antifascista | Música Consciente y Cambio Social",
    description:
      "Canal musical ska-punk antifascista que promueve la resistencia pacífica, justicia social y cambio positivo. Escucha música consciente que lucha por un mundo más justo.",
    type: "website",
    locale: "es_ES",
    url: "https://kaosekaitza.com",
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
      {
        url: "/logo.png",
        width: 1400,
        height: 1400,
        alt: "Kaos Ekaitza - Logo Principal Ska-Punk Antifascista",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@KaosEkaitza",
    creator: "@KaosEkaitza",
    title:
      "Kaos Ekaitza - Ska-Punk Antifascista | Música Consciente y Cambio Social",
    description:
      "Canal musical ska-punk antifascista que promueve la resistencia pacífica, justicia social y cambio positivo. Escucha música consciente que lucha por un mundo más justo.",
    images: ["/logo.png", "/logo-512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
