import React from 'react';
import { Product } from '@/app/lib/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-lg hover:-translate-y-1 transition duration-300 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.photoUrl || '/file.svg'}
            alt={`Photo de l'article ${product.name} - ${product.price} FCFA sur Rolsenshop`}
            className="w-full h-full object-cover group-hover:scale-108 transition duration-500 ease-out"
            loading="lazy"
          />
        </div>

        {/* Info Content */}
        <div className="p-4">
          <div className="flex items-center gap-1 text-xs text-amber-500 font-extrabold mb-1.5">
            <span className="text-sm">★</span>
            <span className="text-sm">{product.rating.toFixed(1)}</span>
            {product.ratingCount && (
              <span className="text-gray-400 font-medium text-xs">({product.ratingCount} avis)</span>
            )}
          </div>

          <h4 className="font-extrabold text-gray-900 text-base line-clamp-1 mb-1.5 group-hover:text-brand transition duration-200">
            {product.name}
          </h4>

          <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed font-normal">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer Price & Add to Cart Action */}
      <div className="p-4 pt-0 flex items-center justify-between border-t border-gray-50 mt-auto">
        <div>
          <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Prix Unitaire</span>
          <span className="text-lg font-black text-brand tracking-tight">
            {product.price.toLocaleString('fr-FR')} {product.currency}
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="bg-brand text-white text-xs font-black px-4 py-2.5 rounded-xl hover:bg-brand-dark active:scale-95 transition-all duration-200 shadow-xs hover:shadow-md flex items-center gap-1.5"
        >
          <span>Ajouter</span>
          <span className="text-sm font-light">+</span>
        </button>
      </div>
    </div>
  );
}
