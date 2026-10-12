export interface Vendor {
  uid: string;
  storeName: string;
  slug: string;
  whatsappNumber: string;
  description: string;
  logoUrl?: string;
  createdAt: string;
  subscriptionStatus: 'trial' | 'active' | 'expired';
  trialEndDate: string;
  subscriptionEndDate?: string;
}

export interface Product {
  id: string;
  vendorUid: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  photoUrl: string;
  badge?: 'best_seller' | 'new' | 'none';
  rating: number; // 1 to 5
  ratingCount?: number;
  isLimitedStock?: boolean;
  stockCount?: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderForm {
  fullName: string;
  phone: string;
  city: string;
  neighborhood: string;
  instructions?: string;
}
