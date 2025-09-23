'use client';

import { Shield, CheckCircle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useVerification } from '@/contexts/VerificationContext';

export default function VerificationStatus() {
  const t = useTranslations('verification');
  const { isVerified, verificationDate, clearVerification } = useVerification();

  if (!isVerified) {
    return null;
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-green-700 dark:text-green-300">
          {t('status.verified')}
        </span>
        <span className="text-xs text-green-600 dark:text-green-400">
          {t('status.discountActive')}
        </span>
      </div>
      <button
        onClick={clearVerification}
        className="ml-2 p-1 hover:bg-green-200 dark:hover:bg-green-800/30 rounded transition-colors"
        aria-label="Cerrar sesión de verificación"
      >
        <X className="w-3 h-3 text-green-600 dark:text-green-400" />
      </button>
    </div>
  );
}
