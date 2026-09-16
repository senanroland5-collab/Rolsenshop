import React from 'react';
import { FiX, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { CartItem } from '@/app/lib/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onProceedToCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiShoppingBag className="text-xl text-brand" />
              <h3 className="font-bold text-gray-900 text-lg">Mon Panier</h3>
              <span className="bg-brand-light text-brand font-bold text-xs px-2.5 py-0.5 rounded-full">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} articles
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full"
            >
              <FiX className="text-lg" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-5 flex-1 overflow-y-auto divide-y divide-gray-100">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-gray-400 space-y-3">
                <FiShoppingBag className="text-4xl mx-auto stroke-1" />
                <p className="text-sm font-medium">Votre panier est vide</p>
                <p className="text-xs text-gray-400">
                  Ajoutez des articles depuis la vitrine pour passer commande.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-4 items-center">
                  <img
                    src={item.product.photoUrl}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-brand font-bold mt-0.5">
                      {item.product.price.toLocaleString('fr-FR')} {item.product.currency}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="p-1 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-200"
                    >
                      <FiMinus className="text-xs" />
                    </button>
                    <span className="text-xs font-bold text-gray-800 w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="p-1 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-200"
                    >
                      <FiPlus className="text-xs" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Action */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50 space-y-4">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-gray-600">Total estimé</span>
                <span className="text-xl text-brand font-black">
                  {totalAmount.toLocaleString('fr-FR')} FCFA
                </span>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full bg-brand text-white font-extrabold text-sm py-3.5 px-4 rounded-xl hover:bg-brand-dark transition shadow-md flex items-center justify-center gap-2"
              >
                Commander maintenant <FiArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
