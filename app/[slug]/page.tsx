'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FiMessageCircle, FiShoppingBag, FiInfo, FiCheck, FiMapPin, FiStar } from 'react-icons/fi';
import { MOCK_VENDOR, MOCK_PRODUCTS } from '@/app/lib/store';
import { Vendor, Product, CartItem } from '@/app/lib/types';
import ProductCard from '@/app/components/ProductCard';
import CartDrawer from '@/app/components/CartDrawer';
import CheckoutModal from '@/app/components/CheckoutModal';
import PoweredByBadge from '@/app/components/PoweredByBadge';
import VendorRatingModal from '@/app/components/VendorRatingModal';

export default function ShopPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Local state for vendor catalog & cart
  const [vendor, setVendor] = useState<Vendor>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vendor_data');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return MOCK_VENDOR;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vendor_products');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return MOCK_PRODUCTS;
  });

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'vintage' | 'semi-vintage'>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  // Filter products by category tab
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'vintage') {
      return p.name.toLowerCase().includes('vintage') && !p.name.toLowerCase().includes('semi-vintage');
    }
    if (selectedCategory === 'semi-vintage') {
      return p.name.toLowerCase().includes('semi-vintage');
    }
    return true;
  });

  const vintageCount = products.filter((p) => p.name.toLowerCase().includes('vintage') && !p.name.toLowerCase().includes('semi-vintage')).length;
  const semiVintageCount = products.filter((p) => p.name.toLowerCase().includes('semi-vintage')).length;

  // Cart helper functions
  const handleAddToCart = (product: Product) => {
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

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Subscription status check
  const isExpired = vendor.subscriptionStatus === 'expired';

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-between">
      <div>
        {/* Header / Store Banner */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-xs">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsRatingModalOpen(true)}
                className="group flex items-center gap-3 text-left focus:outline-none"
                title="Cliquer pour évaluer ce vendeur"
              >
                {vendor.logoUrl ? (
                  <img
                    src={vendor.logoUrl}
                    alt={vendor.storeName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand/20 shadow-xs group-hover:scale-105 transition"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-brand text-white font-bold text-xl flex items-center justify-center group-hover:scale-105 transition">
                    {vendor.storeName.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-extrabold text-gray-900 leading-tight group-hover:text-brand transition">
                      {vendor.storeName}
                    </h1>
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-200/60">
                      <FiStar className="fill-amber-500 text-amber-500" /> 4.9 (28 avis)
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1 max-w-md">
                    {vendor.description}
                  </p>
                </div>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(vendor.storeName + ' Cotonou Bénin')}`}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-xl transition"
              >
                <FiMapPin className="text-red-500 text-sm" /> Google Maps
              </a>

              <a
                href={`https://wa.me/${vendor.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-xl transition"
              >
                <FiMessageCircle className="text-brand text-sm" /> Contact
              </a>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-brand text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-brand-dark transition shadow-xs flex items-center gap-2"
              >
                <FiShoppingBag className="text-lg" />
                <span className="hidden sm:inline">Panier</span>
                {totalCartCount > 0 && (
                  <span className="bg-white text-brand text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Store Banner Notice if Expired */}
        {isExpired && (
          <div className="bg-amber-50 border-b border-amber-200 p-4 text-center text-xs font-medium text-amber-800">
            <FiInfo className="inline text-base mr-1 -mt-0.5" />
            L&apos;abonnement de cette boutique est arrivé à terme. Vous pouvez parcourir le catalogue mais les commandes peuvent être retardées.
          </div>
        )}

        {/* Hero Store Description Banner */}
        <section className="bg-white py-6 border-b border-gray-100 mb-6">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-brand-light/40 border border-brand/10 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight transition duration-200 hover:text-brand">
                  Commandez en un clic et finalisez sur WhatsApp
                </h2>
                <p className="text-sm text-gray-600 mt-1.5 max-w-xl leading-relaxed font-medium">
                  Sélectionnez vos articles ci-dessous, renseignez vos informations de livraison et envoyez votre commande directement au vendeur par message pré-rempli.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-600 font-medium">
                <span className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-2xs">
                  <FiCheck className="text-brand" /> Paiement direct
                </span>
                <span className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-2xs">
                  <FiCheck className="text-brand" /> Envoi gratuit sur WhatsApp
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Product Catalog Grid */}
        <main className="max-w-6xl mx-auto px-4 mb-16">
          <div className="relative overflow-hidden bg-gradient-to-r from-white via-brand-light/30 to-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Animated Glow Dot */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-2xl pointer-events-none animate-pulse"></div>

            <div className="flex items-center gap-3.5 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-brand text-white flex items-center justify-center text-2xl shadow-md shrink-0 transition-transform duration-300 hover:scale-110">
                🛍️
              </div>
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                  <span>Sélection Officielle de la Boutique</span>
                  <span className="w-2 h-2 rounded-full bg-brand animate-ping inline-block"></span>
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Parcourez nos tissus & créations d&apos;exception et commandez directement sur WhatsApp
                </p>
              </div>
            </div>

            {/* Interactive Category Tabs */}
            <div className="flex items-center gap-1.5 bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200/60 text-xs font-bold self-stretch sm:self-auto justify-center relative z-10">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-2 rounded-xl transition duration-200 flex items-center gap-1.5 ${
                  selectedCategory === 'all'
                    ? 'bg-brand text-white shadow-xs font-black scale-102'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                }`}
              >
                <span>Tous</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {products.length}
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory('vintage')}
                className={`px-3.5 py-2 rounded-xl transition duration-200 flex items-center gap-1.5 ${
                  selectedCategory === 'vintage'
                    ? 'bg-brand text-white shadow-xs font-black scale-102'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                }`}
              >
                <span>Vintage</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === 'vintage' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {vintageCount}
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory('semi-vintage')}
                className={`px-3.5 py-2 rounded-xl transition duration-200 flex items-center gap-1.5 ${
                  selectedCategory === 'semi-vintage'
                    ? 'bg-brand text-white shadow-xs font-black scale-102'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                }`}
              >
                <span>Semi-Vintage</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === 'semi-vintage' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {semiVintageCount}
                </span>
              </button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center text-gray-500 border border-gray-100">
              Aucun article ne correspond à cette catégorie pour le moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  vendorSlug={vendor.slug}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Cart & Checkout Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
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

      <VendorRatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        vendorName={vendor.storeName}
      />

      {/* Viral Powered By Badge */}
      <PoweredByBadge />
    </div>
  );
}
