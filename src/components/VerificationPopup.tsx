'use client';

import { useState, useEffect } from 'react';
import { X, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface VerificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationComplete: (verified: boolean) => void;
}

type VerificationStep = 'intro' | 'verifying' | 'success' | 'error';

export default function VerificationPopup({ isOpen, onClose, onVerificationComplete }: VerificationPopupProps) {
  const t = useTranslations('verification');
  const [step, setStep] = useState<VerificationStep>('intro');
  const [isVerified, setIsVerified] = useState(false);

  // Close popup with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleStartVerification = async () => {
    setStep('verifying');
    
    try {
      // Simulate Self verification process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, we'll simulate a successful verification
      // In production, this would integrate with Self's API
      const isSuccess = Math.random() > 0.1; // 90% success rate for demo
      
      if (isSuccess) {
        setStep('success');
        setIsVerified(true);
        onVerificationComplete(true);
        
        // Store verification status in localStorage
        localStorage.setItem('selfVerified', 'true');
        localStorage.setItem('verificationDate', new Date().toISOString());
      } else {
        setStep('error');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setStep('error');
    }
  };

  const handleClose = () => {
    setStep('intro');
    setIsVerified(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-8">
          {step === 'intro' && (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[brand-primary] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[brand-dark] dark:text-[brand-background] mb-2">
                  {t('title')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('subtitle')}
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[brand-primary]" />
                  <span className="text-gray-700 dark:text-gray-300">{t('benefits.discount')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[brand-primary]" />
                  <span className="text-gray-700 dark:text-gray-300">{t('benefits.secure')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[brand-primary]" />
                  <span className="text-gray-700 dark:text-gray-300">{t('benefits.exclusive')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleStartVerification}
                  className="w-full py-3 px-6 bg-[brand-primary] text-white rounded-lg font-semibold hover:bg-[brand-accent] transition-colors"
                >
                  {t('buttons.verify')}
                </button>
                <button
                  onClick={handleClose}
                  className="w-full py-3 px-6 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {t('buttons.maybeLater')}
                </button>
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                {t('privacy')}
              </p>
            </>
          )}

          {step === 'verifying' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-[brand-primary] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[brand-dark] dark:text-[brand-background] mb-2">
                {t('process.verifying')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('process.verifyingSubtitle')}
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-[brand-primary] h-2 rounded-full animate-pulse w-3/4"></div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[brand-dark] dark:text-[brand-background] mb-2">
                {t('process.success')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('process.successSubtitle')}
              </p>
              <button
                onClick={handleClose}
                className="w-full py-3 px-6 bg-[brand-primary] text-white rounded-lg font-semibold hover:bg-[brand-accent] transition-colors"
              >
                {t('buttons.startShopping')}
              </button>
            </div>
          )}

          {step === 'error' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[brand-dark] dark:text-[brand-background] mb-2">
                {t('process.error')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('process.errorSubtitle')}
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleStartVerification}
                  className="w-full py-3 px-6 bg-[brand-primary] text-white rounded-lg font-semibold hover:bg-[brand-accent] transition-colors"
                >
                  {t('buttons.tryAgain')}
                </button>
                <button
                  onClick={handleClose}
                  className="w-full py-3 px-6 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {t('buttons.continueWithout')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
