import React from 'react';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

export default function PoweredByBadge() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-6 px-4 mt-12 text-center text-xs text-gray-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Rolsenshop — Plateforme de Catalogues WhatsApp Afrique de l&apos;Ouest</p>

        <Link
          href="/auth/register"
          className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-800 font-bold px-4 py-1.5 rounded-full hover:bg-gray-50 transition shadow-2xs"
        >
          <img src="/logo.png" alt="RolsenShop" className="h-5 w-auto object-contain" />
          <span className="text-xs">Propulsé par RolsenShop</span>
          <span className="text-gray-400 font-normal">| Créer ma boutique</span>
          <FiArrowUpRight className="text-sm text-brand" />
        </Link>
      </div>
    </footer>
  );
}
