import React, { useState } from 'react';
import { FiX, FiCopy, FiDownload, FiCheck, FiShare2 } from 'react-icons/fi';
import { Vendor } from '@/app/lib/types';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor;
}

export default function QRCodeModal({ isOpen, onClose, vendor }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://rolsenshop.com';
  const shopUrl = `${origin}/${vendor.slug}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shopUrl)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shopUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `QR_Code_${vendor.slug}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-2 transition"
        >
          <FiX className="text-lg" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-brand-light text-brand text-xs font-bold px-3 py-1 rounded-full mb-2">
            <FiShare2 />
            <span>Partage & Impression</span>
          </div>
          <h3 className="text-xl font-extrabold text-gray-900">
            QR Code de votre boutique
          </h3>
          <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
            Scannez ce code pour accéder directement au catalogue WhatsApp de <span className="font-bold text-gray-800">{vendor.storeName}</span>.
          </p>
        </div>

        {/* QR Code Canvas Frame */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center justify-center mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-3">
            <img
              src={qrCodeUrl}
              alt={`QR Code ${vendor.storeName}`}
              className="w-48 h-48 object-contain"
            />
          </div>
          <span className="font-mono text-xs text-brand font-bold bg-white px-3 py-1 rounded-lg border border-gray-200">
            {shopUrl}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm py-3 px-4 rounded-xl transition flex items-center justify-center gap-2"
          >
            {copied ? <FiCheck className="text-green-600" /> : <FiCopy />}
            <span>{copied ? 'Lien copié !' : 'Copier le lien'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex-1 bg-brand hover:bg-brand-dark text-white font-bold text-sm py-3 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-2"
          >
            <FiDownload />
            <span>Télécharger PNG</span>
          </button>
        </div>
      </div>
    </div>
  );
}
