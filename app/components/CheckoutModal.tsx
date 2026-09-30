import React, { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Vendor, CartItem, OrderForm } from '@/app/lib/types';
import { generateWhatsAppLink } from '@/app/lib/whatsapp';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  vendor: Vendor;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  vendor,
}: CheckoutModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [instructions, setInstructions] = useState('');

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert('Veuillez renseigner votre nom et votre numéro de téléphone.');
      return;
    }

    const form: OrderForm = {
      fullName,
      phone,
      city,
      neighborhood,
      instructions,
    };

    const link = generateWhatsAppLink(vendor, cartItems, form);
    window.open(link, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-2"
        >
          <FiX className="text-lg" />
        </button>

        <div className="mb-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-whatsapp bg-whatsapp-light px-2.5 py-1 rounded-full">
            Finalisation WhatsApp
          </span>
          <h3 className="text-xl font-black text-gray-900 mt-2">
            Coordonnées de livraison
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Remplissez ce court formulaire pour envoyer le récapitulatif directement au vendeur.
          </p>
        </div>

        {/* Order Brief Summary */}
        <div className="mb-5 bg-gray-50 border border-gray-100 p-3.5 rounded-xl space-y-2">
          <div className="text-xs font-bold text-gray-700 uppercase">Récapitulatif</div>
          <div className="text-xs text-gray-600 max-h-24 overflow-y-auto space-y-1">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex justify-between">
                <span className="truncate max-w-[220px]">
                  {item.quantity}x {item.product.name}
                </span>
                <span className="font-semibold text-gray-800">
                  {(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA
                </span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-gray-200 flex justify-between text-xs font-black text-gray-900">
            <span>Total:</span>
            <span className="text-brand font-black">
              {totalAmount.toLocaleString('fr-FR')} FCFA
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Nom complet *
            </label>
            <input
              type="text"
              required
              placeholder="ex: Amina Kora"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-whatsapp focus:border-whatsapp"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Numéro de Téléphone / WhatsApp *
            </label>
            <input
              type="tel"
              required
              placeholder="ex: +229 97 00 00 00"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-whatsapp focus:border-whatsapp"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Ville (Optionnel)
              </label>
              <input
                type="text"
                placeholder="ex: Cotonou"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3.5 py-2 text-sm focus:ring-whatsapp focus:border-whatsapp"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Quartier (Optionnel)
              </label>
              <input
                type="text"
                placeholder="ex: Cadjehoun"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3.5 py-2 text-sm focus:ring-whatsapp focus:border-whatsapp"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Instructions spéciales (Optionnel)
            </label>
            <textarea
              rows={2}
              placeholder="Couleur préférée, créneau de livraison..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2 text-sm focus:ring-whatsapp focus:border-whatsapp"
            />
          </div>

          {/* Reserved Exclusive WhatsApp Green CTA Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full bg-whatsapp hover:bg-whatsapp-dark text-white font-black text-sm py-3.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="text-xl" /> Envoyer la commande sur WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
