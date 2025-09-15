'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useTranslations } from 'next-intl';
import { useDivvi } from '@/hooks/useDivvi';
import { ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

export default function DivviStatus() {
  const { address } = useAccount();
  const { consumerAddress } = useDivvi();
  const t = useTranslations('divvi');
  const [isDivviEnabled, setIsDivviEnabled] = useState(false);

  useEffect(() => {
    // Check if Divvi is enabled (you can add more sophisticated checks here)
    setIsDivviEnabled(true);
  }, []);

  if (!address) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {isDivviEnabled ? (
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          )}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {t('referralTracking')}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {isDivviEnabled 
                ? t('earnRewards')
                : t('settingUp')
              }
            </p>
          </div>
        </div>
        <a
          href={`https://celoscan.io/address/${consumerAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <span>{t('viewOnCeloscan')}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
