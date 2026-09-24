import Link from 'next/link';

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-brand-bg py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-xs border border-gray-100">
        <Link href="/" className="text-brand font-bold text-sm hover:underline mb-6 inline-block">
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Politique de Gestion des Cookies
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')} — Rolsenshop.
        </p>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Utilisation Minimale des Cookies</h2>
            <p>
              Rolsenshop utilise uniquement des cookies strictement nécessaires au fonctionnement de la session du panier d&apos;achat et à la sauvegarde de vos préférences de consentement. Aucun cookie tiers publicitaire n&apos;est déposé sans votre accord.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. Types de Cookies Utilisés</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Cookies Techniques :</strong> Sauvegarde temporaire du panier d&apos;achat sur votre navigateur.</li>
              <li><strong>Cookies de Préférences :</strong> Mémorisation de votre choix de consentement aux cookies.</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
