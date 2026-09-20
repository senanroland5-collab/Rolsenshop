import Link from 'next/link';
import { FiShoppingBag, FiArrowRight, FiCheckCircle, FiStar, FiZap, FiPhoneCall } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-bg flex flex-col justify-between">
      <div>
        {/* NAVBAR */}
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-2xl text-gray-900">
              Vendor<span className="text-brand">Hub</span>
            </span>
            <span className="bg-brand-light text-brand text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Afrique de l&apos;Ouest
            </span>
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
            <div className="inline-flex items-center gap-2 bg-brand-light border border-brand/20 text-brand px-4 py-1.5 rounded-full text-xs font-bold mb-6">
              <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
              🌍 Solution N°1 de catalogues WhatsApp en Afrique de l&apos;Ouest
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 leading-tight mb-6">
              Créez votre catalogue produits & recevez des commandes <span className="text-brand">WhatsApp</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              Permettez à vos clients de parcourir vos articles, remplir leur panier et vous envoyer leur commande pré-remplie directement sur WhatsApp. Sans commission, sans frais cachés.
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

            {/* Platform Stats */}
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
                <div className="text-2xl sm:text-3xl font-black text-brand">14 Jours</div>
                <div className="text-gray-500 text-xs mt-1 font-medium">Essai gratuit sans engagement</div>
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
              Une solution simple et adaptée au marché ouest-africain pour numériser votre catalogue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-light text-brand flex items-center justify-center text-2xl font-bold">
                📱
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Espace Vendeur Intuitif</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Ajoutez facilement vos produits avec photos, prix en FCFA, descriptions, badges (Best Seller, Nouveau) et niveau de stock.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-whatsapp-light text-whatsapp flex items-center justify-center text-2xl font-bold">
                <FaWhatsapp />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Commande Directe WhatsApp</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Le client remplit son panier et génère un message WhatsApp pré-rempli avec le total et l&apos;adresse de livraison.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl font-bold">
                ⚡
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Croissance Virale</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Chaque vitrine inclut le badge &quot;Propulsé par VendorHub&quot; pour attirer de nouveaux commerçants vers votre plateforme.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-8 px-6 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-extrabold text-gray-900 text-base">
            Vendor<span className="text-brand">Hub</span>
          </div>
          <p>© {new Date().getFullYear()} VendorHub — Solution de catalogue pour commerçants d&apos;Afrique de l&apos;Ouest.</p>
          <div className="flex gap-4 font-semibold text-gray-600">
            <Link href="/auth/login" className="hover:text-brand">Connexion</Link>
            <Link href="/auth/register" className="hover:text-brand">Inscription</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
