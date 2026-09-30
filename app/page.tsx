import Link from 'next/link';
import { FiShoppingBag, FiArrowRight, FiSmartphone, FiTrendingUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import CookieBanner from '@/app/components/CookieBanner';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-bg flex flex-col justify-between">
      <div>
        {/* NAVBAR */}
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center bg-white p-1 rounded-xl shadow-2xs border border-gray-100">
              <img src="/logo.png" alt="RolsenShop Logo" className="h-10 w-auto object-contain" />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-gray-700 hover:text-brand text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl transition"
            >
              Connexion
            </Link>
            <Link
              href="/auth/register"
              className="bg-brand text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-brand-dark transition shadow-xs"
            >
              Créer ma boutique
            </Link>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-white border-b border-gray-100 py-16 sm:py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto">

            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 leading-tight mb-6">
              Votre catalogue de produits en ligne relié à <span className="text-brand">WhatsApp</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              Mettez en avant vos articles, permettez à vos clients de constituer un panier et de vous commander directement via WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className="w-full sm:w-auto bg-brand text-white font-extrabold text-base px-8 py-4 rounded-xl hover:bg-brand-dark transition shadow-md flex items-center justify-center gap-2"
              >
                Lancer ma boutique gratuitement <FiArrowRight className="text-lg" />
              </Link>
              <Link
                href="/irashop"
                className="w-full sm:w-auto border border-gray-200 text-gray-700 font-bold text-base px-8 py-4 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <FiShoppingBag className="text-brand" /> Voir la boutique Irashop
              </Link>
            </div>

            {/* Platform Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-12 mt-12 border-t border-gray-100 max-w-2xl mx-auto text-left sm:text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-brand">100%</div>
                <div className="text-gray-500 text-xs mt-1 font-medium">Commandes directes WhatsApp</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-brand">0 FCFA</div>
                <div className="text-gray-500 text-xs mt-1 font-medium">Commission sur les ventes</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-brand">6 Mois</div>
                <div className="text-gray-500 text-xs mt-1 font-medium">Formule 6 mois incluse</div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
              Tout ce dont votre commerce local a besoin
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Une solution simple pour numériser votre catalogue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-3 hover:border-brand/30 transition">
              <div className="w-12 h-12 rounded-xl bg-brand-light text-brand flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">
                <FiSmartphone className="animate-pulse" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Espace Vendeur Intuitif</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Ajoutez facilement vos produits avec photos, prix en FCFA, descriptions et stock.
              </p>
            </div>

            <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-3 hover:border-whatsapp/30 transition">
              <div className="w-12 h-12 rounded-xl bg-whatsapp-light text-whatsapp flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">
                <FaWhatsapp className="animate-bounce" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Commande Directe WhatsApp</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Le client remplit son panier et génère un message WhatsApp pré-rempli avec le total et l&apos;adresse de livraison.
              </p>
            </div>

            <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-3 hover:border-brand-cyan/30 transition">
              <div className="w-12 h-12 rounded-xl bg-brand-light text-brand-cyan flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">
                <FiTrendingUp className="animate-pulse" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Croissance Virale</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Chaque vitrine inclut le badge &quot;Propulsé par RolsenShop&quot; pour attirer de nouveaux commerçants vers votre plateforme.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-8 px-6 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="bg-white p-1 rounded-xl border border-gray-100 inline-block">
            <img src="/logo.png" alt="RolsenShop Logo" className="h-9 w-auto object-contain" />
          </Link>
          <p>© {new Date().getFullYear()} Rolsenshop — Solution de catalogue pour commerçants.</p>
          <div className="flex flex-wrap gap-4 font-semibold text-gray-600 justify-center">
            <Link href="/privacy" className="hover:text-brand">Confidentialité</Link>
            <Link href="/terms" className="hover:text-brand">CGU</Link>
            <Link href="/cookies" className="hover:text-brand">Cookies</Link>
            <Link href="/refunds" className="hover:text-brand">Remboursement</Link>
            <Link href="/mentions-legales" className="hover:text-brand">Mentions Légales</Link>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </main>
  );
}
