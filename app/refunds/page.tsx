import Link from 'next/link';

export default function RefundsPage() {
  return (
    <main className="min-h-screen bg-brand-bg py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-xs border border-gray-100">
        <Link href="/" className="text-brand font-bold text-sm hover:underline mb-6 inline-block">
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Politique de Remboursement & Réclamations
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')} — Rolsenshop.
        </p>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Modalités de Remboursement Produits</h2>
            <p>
              Les retours, échanges et remboursements de produits sont gérés directement par chaque marchand indépendant selon ses conditions de vente convenues sur WhatsApp lors du paiement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. Service Abonnement Vendeurs</h2>
            <p>
              Les frais d&apos;abonnement souscrits par les commerçants sur Rolsenshop sont remboursables sur demande au prorata dans les 7 jours suivant le renouvellement en cas d&apos;interruption technique majeure non résolue.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
