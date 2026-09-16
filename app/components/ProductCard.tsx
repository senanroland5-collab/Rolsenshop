import React from 'react';
import { Product } from '@/app/lib/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.photoUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            {product.badge === 'best_seller' && (
              <span className="bg-amber-500 text-white font-black text-[10px] uppercase px-2.5 py-1 rounded-full shadow-xs">
                🔥 Best Seller
              </span>
            )}
            {product.badge === 'new' && (
              <span className="bg-brand text-white font-black text-[10px] uppercase px-2.5 py-1 rounded-full shadow-xs">
                ✨ Nouveau
              </span>
            )}
            {product.isLimitedStock && (
              <span className="bg-red-500 text-white font-black text-[10px] uppercase px-2.5 py-1 rounded-full shadow-xs">
                ⚠️ Stock Limité {product.stockCount ? `(${product.stockCount})` : ''}
              </span>
            )}
          </div>
        </div>

        {/* Info Content */}
        <div className="p-4">
          <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mb-1">
            <span>★</span>
            <span>{product.rating.toFixed(1)}</span>
            {product.ratingCount && (
              <span className="text-gray-400 font-normal">({product.ratingCount})</span>
            )}
          </div>

          <h4 className="font-bold text-gray-900 text-sm line-clamp-1 mb-1 group-hover:text-brand transition">
            {product.name}
          </h4>

          <p className="text-xs text-gray-500 line-clamp-2 mb-3">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer Price & Add to Cart Action */}
      <div className="p-4 pt-0 flex items-center justify-between border-t border-gray-50 mt-auto">
        <div>
          <span className="block text-[10px] text-gray-400 font-semibold uppercase">Prix</span>
          <span className="text-base font-extrabold text-brand">
            {product.price.toLocaleString('fr-FR')} {product.currency}
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="bg-brand text-white text-xs font-bold px-3.5 py-2.5 rounded-xl hover:bg-brand-dark active:scale-95 transition shadow-2xs"
        >
          Ajouter +
        </button>
      </div>
    </div>
  );
}
