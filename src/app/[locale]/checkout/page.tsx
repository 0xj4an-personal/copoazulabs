'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Wallet } from 'lucide-react';
import CeloPayment from '@/components/CeloPayment';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const { state } = useCart();
  const [selectedPaymentMethod] = useState<'celo'>('celo');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string>('');

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('es-CO')} cCOP`;
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    setPaymentError('');
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
    setPaymentSuccess(false);
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
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
              {t('paymentMethods')}
            </h2>

            {paymentError && (
              <div style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '6px',
                padding: '12px',
                marginBottom: '16px'
              }}>
                <p style={{ color: '#DC2626', fontSize: '14px', margin: 0 }}>
                  {paymentError}
                </p>
              </div>
            )}

            {/* Payment Method */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ 
                border: '2px solid #10B981',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#F0FDF4',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  backgroundColor: '#DCFCE7', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Wallet className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>
                    cCOP on Celo Network
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                    Pay with cCOP tokens on Celo network
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Component */}
            <CeloPayment
              totalPrice={state.totalPrice}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
