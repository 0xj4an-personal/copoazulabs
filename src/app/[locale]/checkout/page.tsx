'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Wallet } from 'lucide-react';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const { state } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t('emptyCart')}
          </h1>
          <p className="text-gray-600 mb-8">
            {t('emptyCartDescription')}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('continueShopping')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToProducts')}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('title')}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {t('orderSummary')}
            </h2>
            
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t('quantity')}: {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>{t('total')}</span>
                <span>{formatPrice(state.totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {t('paymentMethods')}
            </h2>

            <div className="space-y-4">
              {/* Crypto Payment */}
              <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 cursor-pointer transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {t('cryptoPayment')}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t('cryptoPaymentDescription')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Traditional Payment */}
              <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 cursor-pointer transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {t('traditionalPayment')}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t('traditionalPaymentDescription')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              {t('completeOrder')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
