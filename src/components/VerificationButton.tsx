'use client';

import { Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface VerificationButtonProps {
  onClick: () => void;
  variant?: 'header' | 'checkout';
}

export default function VerificationButton({ onClick, variant = 'header' }: VerificationButtonProps) {
  const t = useTranslations('verification');

  if (variant === 'header') {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-2 bg-brand-primary text-brand-white rounded-lg font-medium hover:bg-brand-accent transition-colors text-sm"
        title={t('buttons.verify')}
      >
        <Shield className="w-4 h-4" />
        <span className="hidden sm:inline">Verificar</span>
      </button>
    );
  }

  // Checkout variant
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-brand-primary to-brand-accent text-brand-white rounded-lg font-semibold hover:from-brand-accent hover:to-brand-primary transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <Shield className="w-5 h-5" />
      <div className="text-left">
        <div className="text-lg">{t('buttons.verify')}</div>
        <div className="text-sm opacity-90">¡Obtén 10% de descuento!</div>
      </div>
    </button>
  );
}
