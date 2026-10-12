import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-brand-bg py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-xs border border-gray-100">
        <Link href="/" className="text-brand font-bold text-sm hover:underline mb-6 inline-block">
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Politique de Confidentialité & Protection des Données Personnel
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')} — Conforme au Code du Numérique de la République du Bénin (Loi N° 2017-20) et aux directives de l&apos;APDP.
        </p>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Principe de Minimisation des Données</h2>
            <p>
              Rolsenshop applique strictement le principe de minimisation des données personnelles. Nous ne collectons que les informations strictement nécessaires à la mise en relation entre le client et le vendeur pour le traitement de la commande sur WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. Données Collectées</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Pour les clients :</strong> Nom, prénom, numéro WhatsApp / téléphone, ville et quartier de livraison, instructions optionnelles de commande.</li>
              <li><strong>Pour les vendeurs :</strong> Nom de boutique, numéro WhatsApp professionnel, adresse e-mail, identifiants de compte.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. Absence de Traitement de Paiement en Ligne</h2>
            <p>
              Rolsenshop ne stocke et ne traite aucun numéro de carte bancaire ou compte Mobile Money. Toutes les transactions financières sont exécutées directement et de gré à gré entre l&apos;acheteur et le vendeur via WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. Vos Droits (APDP Bénin)</h2>
            <p>
              Conformément à la réglementation béninoise relative à la protection des données à caractère personnel, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;opposition et de suppression de vos données. Pour exercer ce droit, contactez-nous à : <strong>contact@rolsenshop.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
