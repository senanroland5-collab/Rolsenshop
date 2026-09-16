import React from 'react';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

export default function PoweredByBadge() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-6 px-4 mt-12 text-center text-xs text-gray-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} VendorHub — Plateforme de Catalogues WhatsApp Afrique de l&apos;Ouest</p>

        <Link
          href="/auth/register"
          className="inline-flex items-center gap-1.5 bg-brand-light text-brand font-bold px-3.5 py-1.5 rounded-full hover:bg-brand/15 transition shadow-2xs"
        >
          <span>Propulsé par VendorHub</span>
          <span className="text-gray-400 font-normal">| Créer ma boutique</span>
          <FiArrowUpRight className="text-sm" />
        </Link>
      </div>
    </footer>
  );
}
