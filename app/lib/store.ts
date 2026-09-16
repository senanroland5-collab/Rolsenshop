import { Vendor, Product } from './types';

// Mock initial data for local state fallback/demo mode
export const MOCK_VENDOR: Vendor = {
  uid: 'vendor_1',
  storeName: 'Boutique Wax & Elegance',
  slug: 'wax-elegance',
  whatsappNumber: '22990000000',
  description: 'Robes en pagne Wax de haute qualité, accessoires d’Afrique de l’Ouest et confections sur mesure.',
  logoUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=150&auto=format&fit=crop&q=80',
  createdAt: new Date().toISOString(),
  subscriptionStatus: 'trial',
  trialEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    vendorUid: 'vendor_1',
    name: 'Robe Pagne Super Wax Hollandais',
    price: 25000,
    currency: 'FCFA',
    description: 'Magnifique robe moderne taillée dans un vrai Super Wax hollandais aux couleurs éclatantes.',
    photoUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&auto=format&fit=crop&q=80',
    badge: 'best_seller',
    rating: 4.9,
    ratingCount: 28,
    isLimitedStock: true,
    stockCount: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_2',
    vendorUid: 'vendor_1',
    name: 'Ensemble Homme Agbada Brodé',
    price: 45000,
    currency: 'FCFA',
    description: 'Ensemble 3 pièces brodé main avec motif traditionnel royal.',
    photoUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=80',
    badge: 'new',
    rating: 5.0,
    ratingCount: 14,
    isLimitedStock: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_3',
    vendorUid: 'vendor_1',
    name: 'Sac à main en Pagne & Cuir',
    price: 15000,
    currency: 'FCFA',
    description: 'Sac artisanal fait main par nos maroquiniers locaux à Cotonou.',
    photoUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80',
    badge: 'none',
    rating: 4.7,
    ratingCount: 9,
    isLimitedStock: true,
    stockCount: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_4',
    vendorUid: 'vendor_1',
    name: 'Gellé / Foulard de Tête Assorti',
    price: 5000,
    currency: 'FCFA',
    description: 'Foulard prêt à attacher, idéal pour mariages et cérémonies.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    badge: 'none',
    rating: 4.8,
    ratingCount: 31,
    isLimitedStock: false,
    createdAt: new Date().toISOString(),
  }
];

export const formatPrice = (price: number, currency: string = 'FCFA'): string => {
  return `${price.toLocaleString('fr-FR')} ${currency}`;
};
