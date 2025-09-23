'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/contexts/CartContext';
import { useVerification } from '@/contexts/VerificationContext';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Wallet } from 'lucide-react';
import CeloPayment from '@/components/CeloPayment';
import VerificationButton from '@/components/VerificationButton';
import VerificationPopup from '@/components/VerificationPopup';
import DivviStatus from '@/components/DivviStatus';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const tVerification = useTranslations('verification');
  const { state, finalPrice, discountAmount, discountPercentage } = useCart();
  const { isVerified, setVerified } = useVerification();
  const [selectedPaymentMethod] = useState<'celo'>('celo');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string>('');
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);

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
      <div className="min-h-screen bg-[#F5F1E7] dark:bg-[#1C1C1C] flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1C1C1C] dark:text-[#F5F1E7] mb-4 transition-colors duration-200">
            {t('emptyCart')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-200">
            {t('emptyCartDescription')}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-[#3E7C4A] text-white rounded-lg hover:bg-[#2d5f3a] transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('continueShopping')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E7] dark:bg-[#1C1C1C] py-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-[#3E7C4A] hover:text-[#2d5f3a] mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToProducts')}
          </Link>
          <h1 className="text-3xl font-bold text-[#1C1C1C] dark:text-[#F5F1E7] transition-colors duration-200">
            {t('title')}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200">
            <h2 className="text-xl font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] mb-6 transition-colors duration-200">
              {t('orderSummary')}
            </h2>
            
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 transition-colors duration-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-[#1C1C1C] dark:text-[#F5F1E7] transition-colors duration-200">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                      {t('quantity')}: {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-[#1C1C1C] dark:text-[#F5F1E7] transition-colors duration-200">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Verification Section */}
            {!isVerified && (
              <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6 transition-colors duration-200">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {tVerification('checkout.title')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {tVerification('checkout.subtitle')}
                  </p>
                  <VerificationButton 
                    onClick={() => setShowVerificationPopup(true)} 
                    variant="checkout"
                  />
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6 transition-colors duration-200">
              <div className="space-y-2">
                {discountAmount > 0 && (
                  <>
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                      <span>Subtotal:</span>
                      <span>{formatPrice(state.totalPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-green-600 dark:text-green-400">
                      <span>Descuento ({discountPercentage}%):</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center text-lg font-semibold border-t pt-2">
                  <span className="text-[#1C1C1C] dark:text-[#F5F1E7] transition-colors duration-200">{t('total')}</span>
                  <span className="text-[#1C1C1C] dark:text-[#F5F1E7] transition-colors duration-200">{formatPrice(finalPrice)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200">
            <h2 className="text-xl font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] mb-6 transition-colors duration-200">
              {t('paymentMethods')}
            </h2>

            {paymentError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
                <p className="text-red-600 dark:text-red-400 text-sm m-0">
                  {paymentError}
                </p>
              </div>
            )}

            {/* Divvi Status */}
            <DivviStatus />

            {/* Payment Method */}
            <div className="mb-6">
              <div className="border-2 border-[#3E7C4A] rounded-lg p-4 bg-green-50 dark:bg-green-900/20 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-[#3E7C4A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] m-0 mb-1 transition-colors duration-200">
                    cCOP on Celo Network
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 m-0 transition-colors duration-200">
                    Pay with cCOP tokens on Celo network
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Component */}
            <CeloPayment
              totalPrice={finalPrice}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          </div>
        </div>
      </div>

      {/* Verification Popup */}
      <VerificationPopup
        isOpen={showVerificationPopup}
        onClose={() => setShowVerificationPopup(false)}
        onVerificationComplete={(verified) => {
          setVerified(verified);
          setShowVerificationPopup(false);
        }}
      />
    </div>
  );
}
