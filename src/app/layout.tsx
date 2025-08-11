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
  title: "Kaos Ekaitza - Canal Musical Ska-Punk Antifascista",
  description:
    "Música consciente y cambio social. Promovemos la resistencia pacífica, la justicia social y el antifascismo a través del ska-punk. Unidos por la música, luchamos por un mundo más justo.",
  keywords: [
    "ska-punk",
    "antifascista",
    "música consciente",
    "resistencia pacífica",
    "justicia social",
    "kaos ekaitza",
  ],
  authors: [{ name: "Kaos Ekaitza" }],
  creator: "Kaos Ekaitza",
  publisher: "Kaos Ekaitza",
  robots: "index, follow",
  openGraph: {
    title: "Kaos Ekaitza - Canal Musical Ska-Punk Antifascista",
    description: "Música consciente y cambio social a través del ska-punk",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaos Ekaitza - Ska-Punk Antifascista",
    description: "Música consciente y cambio social",
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
