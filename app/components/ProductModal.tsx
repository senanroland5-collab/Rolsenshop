'use client';

import { useState } from 'react';
import { FiX, FiUpload, FiStar } from 'react-icons/fi';
import { Product } from '@/app/lib/types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id' | 'vendorUid' | 'createdAt'>, id?: string) => void;
  productToEdit?: Product | null;
}

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  productToEdit,
}: ProductModalProps) {
  const [name, setName] = useState(productToEdit?.name || '');
  const [price, setPrice] = useState(productToEdit?.price ? String(productToEdit.price) : '');
  const [currency] = useState('FCFA');
  const [description, setDescription] = useState(productToEdit?.description || '');
  const [photoUrl, setPhotoUrl] = useState(productToEdit?.photoUrl || '');
  const [badge, setBadge] = useState<'best_seller' | 'new' | 'none'>(productToEdit?.badge || 'none');
  const [rating, setRating] = useState<number>(productToEdit?.rating || 5.0);
  const [isLimitedStock, setIsLimitedStock] = useState<boolean>(productToEdit?.isLimitedStock || false);
  const [stockCount, setStockCount] = useState<string>(
    productToEdit?.stockCount ? String(productToEdit.stockCount) : ''
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !photoUrl) {
      alert('Veuillez remplir le nom, le prix et l’image du produit.');
      return;
    }

    onSave(
      {
        name,
        price: Number(price),
        currency,
        description,
        photoUrl,
        badge,
        rating: Number(rating),
        ratingCount: productToEdit?.ratingCount || 1,
        isLimitedStock,
        stockCount: isLimitedStock && stockCount ? Number(stockCount) : undefined,
      },
      productToEdit?.id
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-2"
        >
          <FiX className="text-lg" />
        </button>

        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {productToEdit ? 'Modifier le Produit' : 'Ajouter un nouveau produit'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Nom du produit *
            </label>
            <input
              type="text"
              required
              placeholder="ex: Robe Wax Pagne Hollandais"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2 text-sm focus:ring-brand focus:border-brand"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Prix ({currency}) *
              </label>
              <input
                type="number"
                required
                min={0}
                placeholder="15000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3.5 py-2 text-sm focus:ring-brand focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Badge du produit
              </label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value as any)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-brand focus:border-brand bg-white"
              >
                <option value="none">Aucun</option>
                <option value="best_seller">🔥 Best Seller</option>
                <option value="new">✨ Nouveau</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              URL de la photo *
            </label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/..."
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2 text-sm focus:ring-brand focus:border-brand"
            />
            {photoUrl && (
              <div className="mt-2 h-24 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                <img src={photoUrl} alt="Aperçu" className="h-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Description du produit
            </label>
            <textarea
              rows={2}
              placeholder="Couleurs disponibles, taille, détails..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2 text-sm focus:ring-brand focus:border-brand"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1 flex items-center gap-1">
                Note initiale (1-5 <FiStar className="text-amber-400 fill-amber-400" />)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-xl px-3.5 py-2 text-sm focus:ring-brand focus:border-brand"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="inline-flex items-center gap-2 cursor-pointer mb-2">
                <input
                  type="checkbox"
                  checked={isLimitedStock}
                  onChange={(e) => setIsLimitedStock(e.target.checked)}
                  className="rounded text-brand focus:ring-brand w-4 h-4"
                />
                <span className="text-xs font-bold text-gray-700">Stock limité</span>
              </label>

              {isLimitedStock && (
                <input
                  type="number"
                  placeholder="Qté (ex: 3)"
                  value={stockCount}
                  onChange={(e) => setStockCount(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-1.5 text-xs focus:ring-brand focus:border-brand"
                />
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-dark transition shadow-sm"
            >
              Enregistrer le produit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
