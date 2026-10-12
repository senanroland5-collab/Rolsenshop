import { CartItem, Vendor, OrderForm } from '@/app/lib/types';

export interface AnalyticsEvent {
  type: 'store_view' | 'product_view' | 'whatsapp_order';
  vendorSlug: string;
  productId?: string;
  amount?: number;
  timestamp: string;
}

export function trackStoreView(vendorSlug: string): void {
  if (typeof window === 'undefined') return;
  const event: AnalyticsEvent = {
    type: 'store_view',
    vendorSlug,
    timestamp: new Date().toISOString(),
  };
  saveAnalyticsEvent(event);
}

export function trackProductView(vendorSlug: string, productId: string): void {
  if (typeof window === 'undefined') return;
  const event: AnalyticsEvent = {
    type: 'product_view',
    vendorSlug,
    productId,
    timestamp: new Date().toISOString(),
  };
  saveAnalyticsEvent(event);
}

export function trackWhatsAppOrder(
  vendor: Vendor,
  cartItems: CartItem[],
  form: OrderForm
): void {
  if (typeof window === 'undefined') return;

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const event: AnalyticsEvent = {
    type: 'whatsapp_order',
    vendorSlug: vendor.slug,
    amount: totalAmount,
    timestamp: new Date().toISOString(),
  };
  saveAnalyticsEvent(event);

  // Append order to local dashboard mock orders array for real-time seller visibility
  try {
    const newOrder = {
      id: `ord_${Date.now()}`,
      customerName: form.fullName,
      customerPhone: form.phone,
      city: `${form.city || 'Non spécifiée'}${form.neighborhood ? ` (${form.neighborhood})` : ''}`,
      itemsCount: cartItems.reduce((a, b) => a + b.quantity, 0),
      totalAmount,
      date: new Date().toISOString(),
      status: 'initiated' as const,
    };

    const existingOrdersJson = localStorage.getItem('vendor_orders');
    const existingOrders = existingOrdersJson ? JSON.parse(existingOrdersJson) : [];
    localStorage.setItem('vendor_orders', JSON.stringify([newOrder, ...existingOrders]));
  } catch (err) {
    console.error('Failed to log order event to storage:', err);
  }
}

function saveAnalyticsEvent(event: AnalyticsEvent): void {
  try {
    const existingJson = localStorage.getItem('store_analytics');
    const events: AnalyticsEvent[] = existingJson ? JSON.parse(existingJson) : [];
    events.push(event);
    localStorage.setItem('store_analytics', JSON.stringify(events.slice(-100)));
  } catch (err) {
    console.error('Failed to save analytics event:', err);
  }
}
