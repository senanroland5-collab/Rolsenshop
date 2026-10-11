'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FiMessageCircle, FiShoppingBag, FiInfo, FiCheck } from 'react-icons/fi';
import { getStoreData } from '@/app/lib/store';
import { Vendor, Product, CartItem } from '@/app/lib/types';
import ProductCard from '@/app/components/ProductCard';
import CartDrawer from '@/app/components/CartDrawer';
import CheckoutModal from '@/app/components/CheckoutModal';
import PoweredByBadge from '@/app/components/PoweredByBadge';
import { trackStoreView } from '@/app/lib/analytics';
import { useEffect } from 'react';

export default function ShopPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'irashop';
  const storeData = getStoreData(slug);

  // Local state for vendor catalog & cart
  const [vendor, setVendor] = useState<Vendor>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`vendor_data_${slug}`);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return storeData.vendor;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`vendor_products_${slug}`);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return storeData.products;
  });

  useEffect(() => {
    const data = getStoreData(slug);
    setVendor(data.vendor);
    setProducts(data.products);
  }, [slug]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (vendor?.slug) {
      trackStoreView(vendor.slug);
    }
  }, [vendor?.slug]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Filter products by category tab
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.name.toLowerCase().includes(selectedCategory);
  });

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
      <head>
        <title>{`${vendor.storeName} | Catalogue WhatsApp Officiel`}</title>
        <meta name="description" content={vendor.description || `Commandez directement auprès de ${vendor.storeName} via WhatsApp.`} />
        <meta property="og:title" content={`${vendor.storeName} - Catalogue WhatsApp`} />
        <meta property="og:description" content={vendor.description || `Parcourez le catalogue et passez commande directement sur WhatsApp.`} />
        <meta property="og:image" content={vendor.logoUrl || '/logo.png'} />
        <meta property="og:type" content="website" />
      </head>
      <div>
        {/* Header / Store Banner */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-xs">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 text-left">
                {vendor.logoUrl ? (
                  <img
                    src={vendor.logoUrl}
                    alt={vendor.storeName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand/20 shadow-xs"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-brand text-white font-bold text-xl flex items-center justify-center">
                    {vendor.storeName.charAt(0)}
                  </div>
                )}
                <div>
                  <h1 className="text-xl font-extrabold text-gray-900 leading-tight">
                    Boutique {vendor.storeName}
                  </h1>
                  <p className="text-xs text-gray-500 line-clamp-1 max-w-md">
                    {vendor.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
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
              <div className="w-12 h-12 rounded-2xl bg-brand text-white flex items-center justify-center text-xl shadow-md shrink-0 transition-transform duration-300 hover:scale-110">
                <FiShoppingBag />
              </div>
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                  <span>Catalogue Officiel de la Boutique {vendor.storeName}</span>
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Parcourez nos articles et commandez directement sur WhatsApp
                </p>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center text-gray-500 border border-gray-100">
              Aucun article disponible pour le moment.
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

      {/* Viral Powered By Badge */}
      <PoweredByBadge />
    </div>
  );
}
