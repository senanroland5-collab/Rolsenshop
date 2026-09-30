import Link from 'next/link';

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-brand-bg py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-xs border border-gray-100">
        <Link href="/" className="text-brand font-bold text-sm hover:underline mb-6 inline-block">
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Mentions Légales
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Conforme au Code du Numérique du Bénin (Loi N° 2017-20).
        </p>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Éditeur de la Plateforme</h2>
            <p><strong>Plateforme :</strong> Rolsenshop</p>
            <p><strong>Siège social :</strong> Cotonou, République du Bénin</p>
            <p><strong>Contact :</strong> support@rolsenshop.com | +229 64 40 44 10</p>
            <p><strong>Autorité de Contrôle :</strong> APDP (Autorité de Protection des Données Personnelles du Bénin)</p>
          </section>
        </div>
      </div>
    </main>
  );
}
