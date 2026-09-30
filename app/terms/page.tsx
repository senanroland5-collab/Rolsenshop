import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brand-bg py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-xs border border-gray-100">
        <Link href="/" className="text-brand font-bold text-sm hover:underline mb-6 inline-block">
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Conditions Générales d&apos;Utilisation (CGU / CGV)
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')} — Rolsenshop Bénin.
        </p>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Objet de la Plateforme</h2>
            <p>
              Rolsenshop met à disposition des commerçants indépendants un outil de création de catalogue numérique. Rolsenshop agit exclusivement comme un intermédiaire technique facilitant la génération de messages de commande WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. Responsabilité des Ventes</h2>
            <p>
              Chaque vendeur est seul responsable de la qualité de ses produits, des prix affichés en FCFA, des délais de livraison et des modalités de règlement convenues directement sur WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. Abonnements Vendeurs</h2>
            <p>
              Les nouveaux vendeurs bénéficient d&apos;une période d&apos;essai gratuite de 14 jours. À l&apos;expiration de l&apos;essai, un abonnement mensuel ou annuel est requis pour maintenir le catalogue actif.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
