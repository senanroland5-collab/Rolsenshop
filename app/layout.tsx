
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rolsenshop — La Marketplace de l'Afrique de l'Ouest",
  description: "Achetez et vendez en ligne au Bénin. Vendeurs vérifiés, paiement MTN MoMo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}