'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiShoppingBag, FiPackage, FiSettings, FiExternalLink, FiLogOut, FiCheckCircle, FiClock, FiPlus, FiEdit2, FiTrash2, FiTrendingUp, FiCheck, FiX } from 'react-icons/fi';
import { MOCK_VENDOR, MOCK_PRODUCTS } from '@/app/lib/store';
import { Vendor, Product } from '@/app/lib/types';
import ProductModal from '@/app/components/ProductModal';

interface MockOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  city: string;
  itemsCount: number;
  totalAmount: number;
  date: string;
  status: 'initiated' | 'completed';
}

const INITIAL_ORDERS: MockOrder[] = [
  {
    id: 'ord_101',
    customerName: 'Kouassi Marc',
    customerPhone: '+229 97 00 11 22',
    city: 'Cotonou (Cadjehoun)',
    itemsCount: 2,
    totalAmount: 7000,
    date: '2025-01-20T14:30:00.000Z',
    status: 'completed',
  },
  {
    id: 'ord_102',
    customerName: 'Aïchatou Bio',
    customerPhone: '+229 61 44 55 66',
    city: 'Porto-Novo',
    itemsCount: 1,
    totalAmount: 4500,
    date: '2025-01-22T09:15:00.000Z',
    status: 'initiated',
  },
  {
    id: 'ord_103',
    customerName: 'Sègbégnon Fabrice',
    customerPhone: '+229 95 88 99 00',
    city: 'Abomey-Calavi',
    itemsCount: 3,
    totalAmount: 13500,
    date: '2025-01-24T16:45:00.000Z',
    status: 'completed',
  },
];

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings'>('products');
  const [orders, setOrders] = useState<MockOrder[]>(INITIAL_ORDERS);
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

  // Save to localStorage whenever updated
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vendor_data', JSON.stringify(vendor));
    }
  }, [vendor]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vendor_products', JSON.stringify(products));
    }
  }, [products]);

  // Settings form state
  const [storeName, setStoreName] = useState(vendor.storeName);
  const [slug, setSlug] = useState(vendor.slug);
  const [whatsappNumber, setWhatsappNumber] = useState(vendor.whatsappNumber);
  const [description, setDescription] = useState(vendor.description);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Update form when vendor updates
  useEffect(() => {
    setStoreName(vendor.storeName);
    setSlug(vendor.slug);
    setWhatsappNumber(vendor.whatsappNumber);
    setDescription(vendor.description);
  }, [vendor]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedVendor: Vendor = {
      ...vendor,
      storeName,
      slug: slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-'),
      whatsappNumber: whatsappNumber.replace(/[^0-9]/g, ''),
      description,
    };
    setVendor(updatedVendor);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Days remaining in trial
  const daysLeftInTrial = Math.max(
    0,
    Math.ceil(
      (new Date(vendor.trialEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )
  );

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="RolsenShop Logo" className="h-8 w-auto object-contain" />
              <span className="text-xl font-black text-brand font-heading">
                RolsenShop
              </span>
            </Link>
            <span className="bg-brand-light text-brand text-xs font-bold px-2.5 py-1 rounded-full">
              Espace Vendeur
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={`/${vendor.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark transition bg-brand/5 hover:bg-brand/10 px-3.5 py-1.5 rounded-lg"
            >
              <FiExternalLink /> Voir ma boutique
            </Link>
            <button
              onClick={() => router.push('/auth/login')}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center gap-1.5"
            >
              <FiLogOut /> Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Subscription Status Banner */}
        <div className="mb-6 bg-gradient-to-r from-brand to-purple-700 rounded-2xl p-5 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
              <FiClock />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">Abonnement actif (Formule 6 mois)</h3>
                <span className="bg-white/20 text-xs px-2.5 py-0.5 rounded-full font-medium">
                  {daysLeftInTrial} jours restants
                </span>
              </div>
              <p className="text-sm text-white/80">
                Votre catalogue est public pour une durée de 6 mois et recevra toutes les commandes directement sur votre WhatsApp.
              </p>
            </div>
          </div>
          <button
            onClick={() => alert("Option d'abonnement bientôt disponible ! Contactez le support.")}
            className="bg-white text-brand font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-100 transition shrink-0"
          >
            Activer l&apos;abonnement pro
          </button>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-2">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-1">
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition ${
                  activeTab === 'products'
                    ? 'bg-brand text-white shadow-sm font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiPackage className="text-lg" /> Mes Produits ({products.length})
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition ${
                  activeTab === 'orders'
                    ? 'bg-brand text-white shadow-sm font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiTrendingUp className="text-lg" /> Commandes & Ventes ({orders.length})
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition ${
                  activeTab === 'settings'
                    ? 'bg-brand text-white shadow-sm font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiSettings className="text-lg" /> Paramètres de Boutique
              </button>
            </div>

            {/* Quick Shop Summary */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Aperçu boutique</h4>
              <div>
                <p className="text-xs text-gray-500">Nom de la boutique</p>
                <p className="font-bold text-gray-900">{vendor.storeName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Lien public</p>
                <p className="font-mono text-xs text-brand truncate">site.com/{vendor.slug}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Numéro WhatsApp</p>
                <p className="font-medium text-gray-800">+{vendor.whatsappNumber}</p>
              </div>
            </div>
          </div>

          {/* Main Area */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' ? (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Suivi des Commandes WhatsApp</h2>
                    <p className="text-sm text-gray-500">Consultez les demandes initiées sur le site et validez vos ventes livrées.</p>
                  </div>
                  <div className="bg-brand-light/60 text-brand px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                    <FiTrendingUp className="text-base" />
                    <span>CA Confirmé : {orders.filter(o => o.status === 'completed').reduce((acc, o) => acc + o.totalAmount, 0).toLocaleString('fr-FR')} FCFA</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <span>Historique des Demandes ({orders.length})</span>
                    <span>Statut de Règlement</span>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {orders.map((order) => (
                      <div key={order.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-900 text-sm">{order.customerName}</h4>
                            <span className="text-xs text-brand font-mono font-medium">{order.customerPhone}</span>
                          </div>
                          <p className="text-xs text-gray-500">📍 {order.city} • {order.itemsCount} article(s)</p>
                          <p className="text-xs text-gray-400 mt-1">📅 {new Date(order.date).toLocaleDateString('fr-FR')} à {new Date(order.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>

                        <div className="flex items-center gap-4 self-end sm:self-auto">
                          <div className="text-right">
                            <span className="block text-xs text-gray-400 font-medium uppercase">Montant</span>
                            <span className="text-base font-black text-brand">{order.totalAmount.toLocaleString('fr-FR')} FCFA</span>
                          </div>

                          {order.status === 'completed' ? (
                            <button
                              onClick={() => {
                                setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'initiated' } : o));
                              }}
                              className="bg-green-100 text-green-800 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 hover:bg-green-200 transition"
                            >
                              <FiCheck className="text-sm" /> Livré & Confirmé
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'completed' } : o));
                              }}
                              className="bg-amber-100 text-amber-900 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 hover:bg-amber-200 transition"
                            >
                              <FiClock className="text-sm" /> Valider la Vente
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : activeTab === 'settings' ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Paramètres de la Boutique</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Modifiez le nom de votre boutique, votre slug personnalisé et votre contact WhatsApp.
                </p>

                {savedSuccess && (
                  <div className="mb-6 bg-green-50 border border-green-200 text-green-700 text-sm p-4 rounded-xl flex items-center gap-2">
                    <FiCheckCircle className="text-lg shrink-0" />
                    <span>Vos informations de boutique ont été mises à jour avec succès !</span>
                  </div>
                )}

                <form onSubmit={handleSaveSettings} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nom de la boutique
                    </label>
                    <input
                      type="text"
                      required
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-xl px-3.5 py-2.5 shadow-sm focus:ring-brand focus:border-brand sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Lien personnalisé (Slug URL)
                    </label>
                    <div className="mt-1 flex rounded-xl shadow-sm">
                      <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm font-mono">
                        site.com/
                      </span>
                      <input
                        type="text"
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="flex-1 block w-full min-w-0 border border-gray-300 rounded-r-xl px-3.5 py-2.5 focus:ring-brand focus:border-brand sm:text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Numéro WhatsApp (recevra les commandes)
                    </label>
                    <input
                      type="tel"
                      required
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-xl px-3.5 py-2.5 shadow-sm focus:ring-brand focus:border-brand sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description de la boutique
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-xl px-3.5 py-2.5 shadow-sm focus:ring-brand focus:border-brand sm:text-sm"
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                      type="submit"
                      className="bg-brand text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-brand-dark transition shadow-sm"
                    >
                      Enregistrer les modifications
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Gestion des Produits</h2>
                    <p className="text-sm text-gray-500">Ajoutez et éditez les articles affichés dans votre vitrine public</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setIsModalOpen(true);
                    }}
                    className="bg-brand text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-brand-dark transition"
                  >
                    + Ajouter un produit
                  </button>
                </div>

                {/* Product List */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase">Catalogue Actuel</span>
                    <button
                      onClick={() => {
                        setEditingProduct(null);
                        setIsModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 bg-brand text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-brand-dark transition"
                    >
                      <FiPlus /> Ajouter un produit
                    </button>
                  </div>

                  {products.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-sm">
                      Aucun produit dans votre catalogue. Cliquez sur &quot;Ajouter un produit&quot; pour commencer.
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {products.map((p) => (
                        <div key={p.id} className="p-4 sm:p-5 flex items-center gap-4 hover:bg-gray-50/50 transition">
                          <img
                            src={p.photoUrl}
                            alt={p.name}
                            className="w-16 h-16 rounded-xl object-cover border border-gray-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-gray-900 truncate">{p.name}</h4>
                              {p.badge === 'best_seller' && (
                                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  Best Seller
                                </span>
                              )}
                              {p.badge === 'new' && (
                                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  Nouveau
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 truncate">{p.description}</p>
                            <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                              <span className="text-brand font-bold text-sm">
                                {p.price.toLocaleString('fr-FR')} {p.currency}
                              </span>
                              <span>• ⭐ {p.rating} ({p.ratingCount || 0})</span>
                              {p.isLimitedStock && (
                                <span className="text-amber-600 font-semibold">⚠️ Stock limité ({p.stockCount})</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingProduct(p);
                                setIsModalOpen(true);
                              }}
                              className="p-2 text-gray-400 hover:text-brand hover:bg-brand-light rounded-lg transition"
                              title="Modifier"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Voulez-vous vraiment supprimer "${p.name}" ?`)) {
                                  setProducts(products.filter((item) => item.id !== p.id));
                                }
                              }}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Supprimer"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <ProductModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  productToEdit={editingProduct}
                  onSave={(productData, id) => {
                    if (id) {
                      setProducts(
                        products.map((p) =>
                          p.id === id ? { ...p, ...productData } : p
                        )
                      );
                    } else {
                      const newProduct: Product = {
                        ...productData,
                        id: `prod_${Date.now()}`,
                        vendorUid: vendor.uid,
                        createdAt: new Date().toISOString(),
                      };
                      setProducts([newProduct, ...products]);
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
