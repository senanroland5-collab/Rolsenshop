import React from 'react';
import { FiX, FiMail, FiPhone, FiCheckCircle, FiStar, FiCalendar, FiShield } from 'react-icons/fi';
import { Vendor } from '@/app/lib/types';

interface VendorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor;
}

export default function VendorProfileModal({
  isOpen,
  onClose,
  vendor,
}: VendorProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative overflow-hidden">
        {/* Header close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full transition"
        >
          <FiX className="text-lg" />
        </button>

        {/* Vendor Header Info */}
        <div className="text-center pt-2 pb-6 border-b border-gray-100">
          {vendor.logoUrl ? (
            <img
              src={vendor.logoUrl}
              alt={vendor.storeName}
              className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-brand/10 shadow-sm mb-3"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-brand text-white font-black text-3xl flex items-center justify-center mx-auto mb-3 shadow-sm">
              {vendor.storeName.charAt(0)}
            </div>
          )}

          <h3 className="font-heading text-xl font-extrabold text-gray-900 flex items-center justify-center gap-1.5">
            <span>{vendor.storeName}</span>
            <FiCheckCircle className="text-brand text-lg" title="Boutique Vérifiée" />
          </h3>

          <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto leading-relaxed">
            {vendor.description || 'Boutique vérifiée sur RolsenShop'}
          </p>

          <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full mt-3">
            <FiStar className="text-amber-500 fill-amber-500" /> 4.9 / 5 (38 avis clients)
          </div>
        </div>

        {/* Contact & Details */}
        <div className="py-5 space-y-3.5 text-xs text-gray-700">
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
            <div className="w-8 h-8 rounded-xl bg-brand-light text-brand flex items-center justify-center text-sm font-bold shrink-0">
              <FiMail />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">E-mail Officiel</div>
              <div className="font-bold text-gray-900 truncate">{vendor.email || 'Non renseigné'}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
            <div className="w-8 h-8 rounded-xl bg-whatsapp-light text-whatsapp flex items-center justify-center text-sm font-bold shrink-0">
              <FiPhone />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Contact WhatsApp</div>
              <div className="font-bold text-gray-900 truncate">+{vendor.whatsappNumber}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
            <div className="w-8 h-8 rounded-xl bg-brand-light text-brand flex items-center justify-center text-sm font-bold shrink-0">
              <FiShield />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Statut du Compte</div>
              <div className="font-bold text-emerald-600 flex items-center gap-1">
                <FiCheckCircle /> Vendeur Vérifié RolsenShop
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <a
            href={`https://wa.me/${vendor.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-whatsapp text-white font-extrabold text-sm py-3.5 px-4 rounded-xl hover:bg-whatsapp-dark transition shadow-sm flex items-center justify-center gap-2"
          >
            <FiPhone /> Contacter directement sur WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
