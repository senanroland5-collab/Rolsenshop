'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiMessageCircle, FiShoppingBag, FiCheckCircle } from 'react-icons/fi';
import { MOCK_VENDOR, MOCK_PRODUCTS } from '@/app/lib/store';
import { Vendor, Product, CartItem } from '@/app/lib/types';
import { generateWhatsAppLink } from '@/app/lib/whatsapp';
import CartDrawer from '@/app/components/CartDrawer';
import CheckoutModal from '@/app/components/CheckoutModal';
import PoweredByBadge from '@/app/components/PoweredByBadge';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const productId = params?.id as string;

  const [vendor] = useState<Vendor>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vendor_data');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return MOCK_VENDOR;
  });

  const [products] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vendor_products');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return MOCK_PRODUCTS;
  });

  const product = products.find((p) => p.id === productId) || products[0];

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleAddToCart = () => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleDirectWhatsAppContact = () => {
    const directCartItem: CartItem = { product, quantity: 1 };
    const url = generateWhatsAppLink(vendor, [directCartItem], {
      fullName: 'Client direct',
      phone: 'Non renseigné',
      city: '',
      neighborhood: '',
      instructions: '',
    });
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-between font-sans">
      <div>
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-xs">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              href={`/${vendor.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-brand transition"
            >
              <FiArrowLeft className="text-lg" /> Retour au catalogue
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-brand text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-brand-dark transition shadow-xs flex items-center gap-2"
            >
              <FiShoppingBag className="text-lg" />
              <span className="hidden sm:inline">Panier</span>
              {cart.length > 0 && (
                <span className="bg-white text-brand text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Product Detail Container */}
        <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Section */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 relative">
              <img
                src={product.photoUrl}
                alt={`Photo de ${product.name}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info & Action Section */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="inline-block bg-brand-light text-brand text-xs font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                  {vendor.storeName}
                </div>

                <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-amber-500 font-extrabold text-lg">★ {product.rating.toFixed(1)}</span>
                  {product.ratingCount && (
                    <span className="text-gray-400 text-sm">({product.ratingCount} avis clients)</span>
                  )}
                </div>

                <div className="text-3xl font-black text-brand mb-6 tracking-tight">
                  {product.price.toLocaleString('fr-FR')} {product.currency}
                </div>

                <div className="border-t border-b border-gray-100 py-4 mb-6">
                  <h3 className="font-bold text-gray-900 text-sm mb-2 uppercase tracking-wider">Description de l&apos;article</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-2.5 mb-8 text-xs text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="text-brand text-base shrink-0" />
                    <span>Contact & négociation directe avec le vendeur sur WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="text-brand text-base shrink-0" />
                    <span>Paiement direct de gré à gré à la livraison ou par Mobile Money</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-brand text-white font-bold text-sm py-3.5 px-6 rounded-2xl hover:bg-brand-dark active:scale-95 transition shadow-sm flex items-center justify-center gap-2"
                >
                  <FiShoppingBag /> Ajouter au panier
                </button>

                <button
                  onClick={handleDirectWhatsAppContact}
                  className="flex-1 bg-whatsapp text-white font-bold text-sm py-3.5 px-6 rounded-2xl hover:bg-whatsapp-dark active:scale-95 transition shadow-sm flex items-center justify-center gap-2"
                >
                  <FiMessageCircle className="text-lg" /> Contacter le vendeur
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={(id, delta) => {
          setCart((prev) =>
            prev
              .map((item) => {
                if (item.product.id === id) {
                  const qty = item.quantity + delta;
                  return qty > 0 ? { ...item, quantity: qty } : null;
                }
                return item;
              })
              .filter(Boolean) as CartItem[]
          );
        }}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        vendor={vendor}
      />

      <PoweredByBadge />
    </div>
  );
}
