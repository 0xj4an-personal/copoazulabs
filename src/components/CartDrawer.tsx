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
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-brand-white dark:bg-brand-dark shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          state.isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ touchAction: 'pan-y' }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-brand-neutral dark:border-brand-neutral">
            <h2 className="text-xl font-semibold text-brand-dark dark:text-brand-background">
              {t('title')} ({state.totalItems})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-brand-background/50 dark:hover:bg-dark-surface/50 active:bg-brand-neutral/20 dark:active:bg-brand-neutral/20 rounded-full transition-colors touch-manipulation"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <X className="w-5 h-5 text-brand-dark dark:text-brand-background" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-brand-neutral dark:text-brand-neutral mb-4" />
                <h3 className="text-lg font-medium text-brand-dark dark:text-brand-background mb-2">
                  {t('empty')}
                </h3>
                <p className="text-brand-neutral dark:text-brand-neutral mb-6">
                  {t('emptyDescription')}
                </p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-accent transition-colors"
                >
                  {t('continueShopping')}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 border border-brand-neutral dark:border-brand-neutral rounded-lg"
                  >
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-brand-background dark:bg-dark-surface rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-brand-dark dark:text-brand-background truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-brand-neutral dark:text-brand-neutral">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-brand-background/50 dark:hover:bg-dark-surface/50 rounded-full transition-colors"
                      >
                        <Minus className="w-4 h-4 text-brand-dark dark:text-brand-background" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center text-brand-dark dark:text-brand-background">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-brand-background/50 dark:hover:bg-dark-surface/50 rounded-full transition-colors"
                      >
                        <Plus className="w-4 h-4 text-brand-dark dark:text-brand-background" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 hover:bg-brand-purple/10 dark:hover:bg-brand-purple/20 text-brand-purple dark:text-brand-purple rounded-full transition-colors"
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
            <div className="border-t border-brand-neutral dark:border-brand-neutral p-6 space-y-4">
              {/* Total */}
              <div className="space-y-2">
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-sm text-brand-neutral dark:text-brand-background">
                    <span>Subtotal:</span>
                    <span>{formatPrice(state.totalPrice)}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-sm text-brand-primary dark:text-brand-light">
                    <span>Descuento ({discountPercentage}%):</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-semibold text-brand-dark dark:text-brand-background border-t pt-2">
                  <span>{t('total')}</span>
                  <span>{formatPrice(finalPrice)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={clearCart}
                  className="w-full px-4 py-2 text-sm text-brand-purple dark:text-brand-purple hover:text-brand-purple dark:hover:text-brand-purple hover:bg-brand-purple/10 dark:hover:bg-brand-purple/20 rounded-lg transition-colors"
                >
                  {t('clearCart')}
                </button>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full px-4 py-3 bg-brand-primary text-white text-center rounded-lg hover:bg-brand-accent transition-colors"
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
