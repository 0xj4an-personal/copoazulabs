import {
  calculateCartTotals,
  generateCartItemId,
  isValidCartItem,
  formatPrice,
  calculateDiscountAmount,
} from '@/lib/utils/cart-utils'
import { CartItem } from '@/types/cart'

describe('Cart Utils', () => {
  const mockCartItems: CartItem[] = [
    {
      id: 'item-1',
      name: 'Test Product 1',
      price: 100000,
      quantity: 2,
      image: '/test-image-1.jpg',
    },
    {
      id: 'item-2',
      name: 'Test Product 2',
      price: 50000,
      quantity: 1,
      image: '/test-image-2.jpg',
    },
  ]

  describe('calculateCartTotals', () => {
    it('calculates totals correctly without verification', () => {
      const totals = calculateCartTotals(mockCartItems, false)

      expect(totals.totalItems).toBe(3)
      expect(totals.totalPrice).toBe(250000)
      expect(totals.discountedPrice).toBe(250000)
      expect(totals.discountPercentage).toBe(0)
    })

    it('calculates totals correctly with verification discount', () => {
      const totals = calculateCartTotals(mockCartItems, true)

      expect(totals.totalItems).toBe(3)
      expect(totals.totalPrice).toBe(250000)
      expect(totals.discountedPrice).toBe(225000) // 10% discount
      expect(totals.discountPercentage).toBe(10)
    })

    it('handles empty cart', () => {
      const totals = calculateCartTotals([], false)

      expect(totals.totalItems).toBe(0)
      expect(totals.totalPrice).toBe(0)
      expect(totals.discountedPrice).toBe(0)
      expect(totals.discountPercentage).toBe(0)
    })
  })

  describe('generateCartItemId', () => {
    it('generates ID with product ID only', () => {
      const id = generateCartItemId('product-123')
      expect(id).toBe('product-123')
    })

    it('generates ID with product ID and size', () => {
      const id = generateCartItemId('product-123', 'M')
      expect(id).toBe('product-123-M')
    })

    it('generates ID with product ID, size, and color', () => {
      const id = generateCartItemId('product-123', 'M', 'red')
      expect(id).toBe('product-123-M-red')
    })
  })

  describe('isValidCartItem', () => {
    it('validates correct cart item', () => {
      const validItem: CartItem = {
        id: 'test-id',
        name: 'Test Product',
        price: 100,
        quantity: 1,
        image: '/test.jpg',
      }

      expect(isValidCartItem(validItem)).toBe(true)
    })

    it('rejects item with missing required fields', () => {
      const invalidItem = {
        id: 'test-id',
        name: 'Test Product',
        // missing price, quantity, image
      }

      expect(isValidCartItem(invalidItem)).toBe(false)
    })

    it('rejects item with invalid types', () => {
      const invalidItem = {
        id: 'test-id',
        name: 'Test Product',
        price: 'invalid-price', // should be number
        quantity: 1,
        image: '/test.jpg',
      }

      expect(isValidCartItem(invalidItem)).toBe(false)
    })

    it('rejects item with negative quantity', () => {
      const invalidItem = {
        id: 'test-id',
        name: 'Test Product',
        price: 100,
        quantity: -1, // negative quantity
        image: '/test.jpg',
      }

      expect(isValidCartItem(invalidItem)).toBe(false)
    })

    it('rejects item with negative price', () => {
      const invalidItem = {
        id: 'test-id',
        name: 'Test Product',
        price: -100, // negative price
        quantity: 1,
        image: '/test.jpg',
      }

      expect(isValidCartItem(invalidItem)).toBe(false)
    })
  })

  describe('formatPrice', () => {
    it('formats price with default currency', () => {
      const formatted = formatPrice(100000)
      expect(formatted).toBe('100,000 cCOP')
    })

    it('formats price with custom currency', () => {
      const formatted = formatPrice(100000, 'USD')
      expect(formatted).toBe('100,000 USD')
    })

    it('handles zero price', () => {
      const formatted = formatPrice(0)
      expect(formatted).toBe('0 cCOP')
    })
  })

  describe('calculateDiscountAmount', () => {
    it('calculates discount amount correctly', () => {
      const discount = calculateDiscountAmount(100000, 90000)
      expect(discount).toBe(10000)
    })

    it('handles no discount case', () => {
      const discount = calculateDiscountAmount(100000, 100000)
      expect(discount).toBe(0)
    })

    it('handles edge case where discounted price is higher', () => {
      // Should not happen in practice, but function should handle gracefully
      const discount = calculateDiscountAmount(100000, 110000)
      expect(discount).toBe(0) // Should return 0, not negative
    })
  })
})