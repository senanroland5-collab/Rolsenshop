import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#10B981",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://rolsenshop.com"),
  title: {
    default: "RolsenShop — Marketplace & Catalogues WhatsApp au Bénin",
    template: "%s | RolsenShop",
  },
  description: "Créez votre catalogue de produits en ligne et recevez vos commandes directement sur WhatsApp au Bénin et en Afrique de l'Ouest. Solution simple et 100% rapide pour commerçants.",
  keywords: [
    "RolsenShop",
    "Boutique WhatsApp Bénin",
    "Catalogue en ligne Bénin",
    "E-commerce Bénin",
    "Vente WhatsApp Cotonou",
    "Vendeur WhatsApp Afrique de l'Ouest",
    "Les croq's colombe",
    "Irashop",
  ],
  authors: [{ name: "RolsenShop Team" }],
  creator: "RolsenShop",
  publisher: "RolsenShop",
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
  openGraph: {
    type: "website",
    locale: "fr_BJ",
    url: "https://rolsenshop.com",
    title: "RolsenShop — Catalogues Produits & Commandes WhatsApp",
    description: "Plateforme de vente directe par WhatsApp pour les commerçants du Bénin. Créez votre vitrine en un clic.",
    siteName: "RolsenShop",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Logo RolsenShop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RolsenShop — Vente sur WhatsApp au Bénin",
    description: "Créez votre catalogue de produits et recevez des commandes directement sur WhatsApp.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="font-sans bg-brand-bg text-brand-dark antialiased">
        {children}
      </body>
    </html>
  );
}
