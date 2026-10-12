'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (auth.app.options.apiKey && auth.app.options.apiKey !== 'demo-api-key') {
        await sendPasswordResetEmail(auth, email);
      } else {
        console.log('Demo mode password reset for:', email);
      }
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Impossible d\'envoyer l\'e-mail de réinitialisation. Vérifiez l\'adresse e-mail.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center bg-white p-2 rounded-2xl shadow-xs border border-gray-100">
            <img src="/logo.png" alt="RolsenShop Logo" className="h-12 w-auto object-contain" />
          </Link>
          <h2 className="mt-4 text-2xl font-extrabold text-gray-900">
            Réinitialisation du mot de passe
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Saisissez votre e-mail pour recevoir un lien de réinitialisation sécurisé
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow-sm sm:rounded-2xl sm:px-10 border border-gray-100">
          {success ? (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto text-2xl">
                <FiCheckCircle />
              </div>
              <h3 className="text-lg font-bold text-gray-900">E-mail envoyé !</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Si un compte existe pour <span className="font-semibold text-gray-900">{email}</span>, vous recevrez un lien dans quelques instants pour réinitialiser votre mot de passe.
              </p>
              <div className="pt-4">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
                >
                  <FiArrowLeft /> Retour à la page de connexion
                </Link>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Adresse e-mail de votre compte
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
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-50 transition"
                  >
                    {loading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center text-sm">
                <Link href="/auth/login" className="inline-flex items-center gap-1.5 font-semibold text-gray-500 hover:text-brand">
                  <FiArrowLeft /> Retour à la connexion
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
