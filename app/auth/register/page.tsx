'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebase';
import { Vendor } from '@/app/lib/types';

export default function RegisterPage() {
  const router = useRouter();
  const [storeName, setStoreName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!storeName || !whatsappNumber || !email || !password) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setLoading(true);

    const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, '');
    const slug = generateSlug(storeName) || `shop-${Date.now()}`;

    try {
      if (auth.app.options.apiKey && auth.app.options.apiKey !== 'demo-api-key') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        const vendorData: Vendor = {
          uid,
          storeName,
          slug,
          whatsappNumber: cleanWhatsapp,
          description: `Bienvenue chez ${storeName} ! Découvrez notre catalogue de produits.`,
          createdAt: new Date().toISOString(),
          subscriptionStatus: 'trial',
          trialEndDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
        };

        await setDoc(doc(db, 'vendors', uid), vendorData);
      } else {
        // Local demo mode fallback
        console.log('Registered demo vendor:', { storeName, slug, cleanWhatsapp, email });
      }

      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Une erreur est survenue lors de la création du compte.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold text-gray-900">
              Rolsen<span className="text-brand">shop</span>
            </span>
          </Link>
          <h2 className="mt-4 text-2xl font-extrabold text-gray-900">
            Créez votre catalogue WhatsApp gratuit
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Commencez à vendre directement sur WhatsApp en moins de 2 minutes
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow-sm sm:rounded-2xl sm:px-10 border border-gray-100">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom de la boutique
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="ex: Wax & Élégance Cotonou"
                  className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Numéro WhatsApp
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  required
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="ex: 22990000000 ou 0122990000"
                  className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm"
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Les commandes de vos clients arriveront sur ce numéro
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Adresse e-mail
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vendeur@exemple.com"
                  className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-50 transition"
              >
                {loading ? 'Création de votre boutique...' : 'Lancer ma boutique gratuitement 🚀'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Vous avez déjà un compte ? </span>
            <Link href="/auth/login" className="font-semibold text-brand hover:underline">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
