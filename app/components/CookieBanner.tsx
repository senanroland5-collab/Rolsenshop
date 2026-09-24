'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside
      aria-label="Consentement relatif aux cookies"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md bg-white border border-gray-200 p-5 rounded-2xl shadow-xl z-50 text-xs text-gray-700"
    >
      <div className="font-bold text-gray-900 text-sm mb-1.5 flex items-center gap-1.5">
        <span>🍪</span> Respect de vos données personnelles
      </div>
      <p className="mb-3 leading-relaxed">
        Nous utilisons uniquement des cookies nécessaires au fonctionnement de votre panier et à la conformité au Code du Numérique du Bénin (APDP).
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={handleAccept}
          className="bg-brand text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-brand-dark transition"
        >
          Accepter
        </button>
        <button
          onClick={handleDecline}
          className="bg-gray-100 text-gray-700 font-medium px-3.5 py-2 rounded-xl text-xs hover:bg-gray-200 transition"
        >
          Refuser
        </button>
        <Link href="/privacy" className="text-brand font-semibold hover:underline ml-auto">
          En savoir plus
        </Link>
      </div>
    </aside>
  );
}
