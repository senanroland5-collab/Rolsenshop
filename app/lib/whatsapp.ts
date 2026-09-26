import { Vendor, CartItem, OrderForm } from './types';

export const formatWhatsAppMessage = (
  vendor: Vendor,
  cartItems: CartItem[],
  form: OrderForm
): string => {
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const itemsList = cartItems
    .map(
      (item) =>
        `• *${item.quantity}x* ${item.product.name} — _${(
          item.product.price * item.quantity
        ).toLocaleString('fr-FR')} FCFA_`
    )
    .join('\n');

  const locationInfo =
    form.city || form.neighborhood
      ? `${form.city || ''} ${form.neighborhood ? `(${form.neighborhood})` : ''}`.trim()
      : 'À convenir sur WhatsApp';

  const instructionsText = form.instructions
    ? `\n📝 *Note:* ${form.instructions}`
    : '';

  return `🛒 *NOUVELLE COMMANDE — ${vendor.storeName.toUpperCase()}*

👤 *Client:* ${form.fullName}
📞 *Téléphone:* ${form.phone}
📍 *Livraison:* ${locationInfo}${instructionsText}

📦 *DÉTAIL DE LA COMMANDE:*
${itemsList}

💰 *TOTAL DE LA COMMANDE:* *${totalAmount.toLocaleString('fr-FR')} FCFA*

---
_Commande passée via le catalogue ${vendor.storeName}_`;
};

export const generateWhatsAppLink = (
  vendor: Vendor,
  cartItems: CartItem[],
  form: OrderForm
): string => {
  const message = formatWhatsAppMessage(vendor, cartItems, form);
  const cleanPhone = vendor.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
};
