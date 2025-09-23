'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/contexts/CartContext';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function CartDrawer() {
  const t = useTranslations('cart');
  const { state, updateQuantity, removeItem, clearCart, closeCart, finalPrice, discountAmount, discountPercentage } = useCart();

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('es-CO')} cCOP`;
  };

  return (
    <>
      {/* Backdrop */}
      {state.isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          state.isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ touchAction: 'pan-y' }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {t('title')} ({state.totalItems})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 rounded-full transition-colors touch-manipulation"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <X className="w-5 h-5 text-gray-900 dark:text-gray-100" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {t('empty')}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {t('emptyDescription')}
                </p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {t('continueShopping')}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                      >
                        <Minus className="w-4 h-4 text-gray-900 dark:text-gray-100" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center text-gray-900 dark:text-gray-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                      >
                        <Plus className="w-4 h-4 text-gray-900 dark:text-gray-100" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 dark:text-red-400 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
              {/* Total */}
              <div className="space-y-2">
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                    <span>Subtotal:</span>
                    <span>{formatPrice(state.totalPrice)}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-sm text-green-600 dark:text-green-400">
                    <span>Descuento ({discountPercentage}%):</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-semibold text-gray-900 dark:text-gray-100 border-t pt-2">
                  <span>{t('total')}</span>
                  <span>{formatPrice(finalPrice)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={clearCart}
                  className="w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  {t('clearCart')}
                </button>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full px-4 py-3 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors"
                >
                  {t('checkout')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
