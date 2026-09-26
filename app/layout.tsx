import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Rolsenshop — Marketplace de Vente Directe sur WhatsApp au Bénin",
  description: "Catalogue produits en ligne pour commerçants d'Afrique de l'Ouest. Contactez les vendeurs directement sur WhatsApp.",
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
