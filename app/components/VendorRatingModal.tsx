'use client';

import { useState } from 'react';
import { FiStar, FiX, FiCheckCircle } from 'react-icons/fi';

interface VendorRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendorName: string;
}

export default function VendorRatingModal({
  isOpen,
  onClose,
  vendorName,
}: VendorRatingModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-xl border border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <FiX className="text-xl" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto">
              <FiCheckCircle />
            </div>
            <h3 className="font-heading font-black text-xl text-gray-900">
              Avis Enregistré !
            </h3>
            <p className="text-sm text-gray-500">
              Merci d&apos;avoir évalué {vendorName}. Votre note contribue à la confiance sur RolsenShop.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-xs font-bold text-brand uppercase tracking-wider block mb-1">
                Évaluer la boutique
              </span>
              <h3 className="font-heading font-black text-2xl text-gray-900">
                Donner un avis sur {vendorName}
              </h3>
            </div>

            {/* Rating Stars */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                Votre note globale
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-2xl transition hover:scale-125 focus:outline-none"
                  >
                    <FiStar
                      className={`${
                        star <= (hoverRating || rating)
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-sm font-bold text-gray-700 ml-2">
                  {rating} / 5
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Votre Nom / Prénom
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="ex: Marc Kouassi"
                className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-brand focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Votre Commentaire (optionnel)
              </label>
              <textarea
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Racontez votre expérience d'achat avec ce vendeur..."
                className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-brand focus:border-brand"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand text-white font-bold text-sm py-3 rounded-xl hover:bg-brand-dark transition shadow-sm"
            >
              Publier mon avis
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
