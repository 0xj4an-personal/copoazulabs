import { CartItem, CartTotals } from '@/types/cart';

export const DISCOUNT_PERCENTAGE = 10;

/**
 * Calculate cart totals with optional verification discount
 */
export function calculateCartTotals(items: CartItem[], isVerified: boolean = false): CartTotals {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (isVerified) {
    const discountedPrice = Math.round(totalPrice * (1 - DISCOUNT_PERCENTAGE / 100));
    return {
      totalItems,
      totalPrice,
      discountedPrice,
      discountPercentage: DISCOUNT_PERCENTAGE
    };
  }

  return {
    totalItems,
    totalPrice,
    discountedPrice: totalPrice,
    discountPercentage: 0
  };
}

/**
 * Generate unique cart item ID
 */
export function generateCartItemId(productId: string, size?: string, color?: string): string {
  const parts = [productId];
  if (size) parts.push(size);
  if (color) parts.push(color);
  return parts.join('-');
}

/**
 * Validate cart item structure
 */
export function isValidCartItem(item: any): item is CartItem {
  return (
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.price === 'number' &&
    typeof item.quantity === 'number' &&
    typeof item.image === 'string' &&
    item.quantity > 0 &&
    item.price >= 0
  );
}

/**
 * Safe localStorage operations for cart data
 */
export const cartStorage = {
  get: (): CartItem[] => {
    if (typeof window === 'undefined') return [];

    try {
      const saved = localStorage.getItem('cart');
      if (!saved) return [];

      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed.items)) return [];

      return parsed.items.filter(isValidCartItem);
    } catch (error) {
      console.warn('Failed to load cart from localStorage:', error);
      return [];
    }
  },

  set: (items: CartItem[], totals: Pick<CartTotals, 'totalItems' | 'totalPrice'>): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('cart', JSON.stringify({
        items,
        totalItems: totals.totalItems,
        totalPrice: totals.totalPrice,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Failed to save cart to localStorage:', error);
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem('cart');
    } catch (error) {
      console.warn('Failed to clear cart from localStorage:', error);
    }
  }
};

/**
 * Format price for display
 */
export function formatPrice(price: number, currency: string = 'cCOP'): string {
  return `${price.toLocaleString('es-CO')} ${currency}`;
}

/**
 * Calculate discount amount
 */
export function calculateDiscountAmount(originalPrice: number, discountedPrice: number): number {
  return Math.max(0, originalPrice - discountedPrice);
}