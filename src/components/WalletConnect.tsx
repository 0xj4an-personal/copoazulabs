'use client';

import { useState } from 'react';
import { Wallet, ChevronDown, Copy, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useWallet } from '@/hooks/useWallet';
import { getCurrentNetwork } from '@/config/web3';

interface WalletConnectProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export default function WalletConnect({ onConnect, onDisconnect }: WalletConnectProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const t = useTranslations('wallet');

  const {
    address,
    isConnected,
    isConnecting,
    celoBalance,
    ccopBalance,
    connect,
    disconnect,
    shortAddress,
    displayName,
    ensName,
  } = useWallet();

  const network = getCurrentNetwork();

  const handleConnect = async () => {
    try {
      await connect();
      onConnect?.();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleDisconnect = () => {
    try {
      disconnect();
      setShowDropdown(false);
      onDisconnect?.();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  const copyAddress = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address);
        // Show a brief success feedback
        const originalText = document.title;
        document.title = 'Address copied!';
        setTimeout(() => {
          document.title = originalText;
        }, 1000);
      } catch (error) {
        console.error('Failed to copy address:', error);
      }
    }
  };

  const openExplorer = () => {
    if (address) {
      const explorerUrl = `${network.blockExplorers?.default.url}/address/${address}`;
      window.open(explorerUrl, '_blank');
    }
  };

  if (!isConnected) {
    return (
      <div className="relative">
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className={`inline-flex items-center px-4 py-2 text-white font-medium rounded-lg border-none cursor-pointer transition-all duration-200 shadow-lg active:scale-95 touch-manipulation ${
            isConnecting
              ? 'bg-gray-400 cursor-not-allowed opacity-70'
              : 'bg-green-600 hover:bg-green-700'
          }`}
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          <Wallet className="w-4 h-4 mr-2" />
          {isConnecting ? t('connecting') : t('connect')}
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="inline-flex items-center px-4 py-2 bg-brand-background dark:bg-dark-surface text-brand-dark dark:text-brand-background font-medium rounded-lg border border-brand-neutral dark:border-brand-neutral cursor-pointer transition-all duration-200 active:scale-95 touch-manipulation"
        style={{ minWidth: '44px', minHeight: '44px' }}
      >
        <Wallet className="w-4 h-4 mr-2" />
        {displayName}
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 bg-brand-white dark:bg-brand-dark border border-brand-neutral dark:border-brand-neutral rounded-lg shadow-lg min-w-[250px] z-50">
          <div className="p-3 border-b border-brand-neutral dark:border-brand-neutral">
            <p className="text-sm text-brand-neutral dark:text-brand-neutral m-0">{t('connected')}</p>
            <div className="mt-1">
              {ensName ? (
                <div>
                  <p 
                    className="text-sm text-brand-dark dark:text-brand-background m-0 font-medium cursor-pointer hover:text-brand-primary dark:hover:text-brand-light transition-colors"
                    onClick={copyAddress}
                    title={`${t('clickToCopy')}: ${ensName}`}
                  >
                    {ensName}
                  </p>
                  <p 
                    className="text-xs text-brand-neutral dark:text-brand-neutral m-0 font-mono cursor-pointer hover:text-brand-primary dark:hover:text-brand-light transition-colors"
                    onClick={copyAddress}
                    title={`${t('clickToCopy')}: ${address}`}
                  >
                    {shortAddress}
                  </p>
                </div>
              ) : (
                <p 
                  className="text-sm text-brand-dark dark:text-brand-background m-0 font-mono cursor-pointer hover:text-brand-primary dark:hover:text-brand-light transition-colors"
                  onClick={copyAddress}
                  title={`${t('clickToCopy')}: ${address}`}
                >
                  {shortAddress}
                </p>
              )}
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 m-0">
                CELO: {celoBalance}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 m-0">
                cCOP: {ccopBalance}
              </p>
            </div>
          </div>
          <div className="py-2">
            <button
              onClick={copyAddress}
              className="flex items-center w-full px-4 py-2 bg-transparent border-none cursor-pointer text-sm text-brand-dark dark:text-brand-background hover:bg-brand-light/20 dark:hover:bg-brand-neutral/20 transition-colors duration-200"
            >
              <Copy className="w-4 h-4 mr-2" />
              {t('copyAddress')}
            </button>
            <button
              onClick={openExplorer}
              className="flex items-center w-full px-4 py-2 bg-transparent border-none cursor-pointer text-sm text-brand-dark dark:text-brand-background hover:bg-brand-light/20 dark:hover:bg-brand-neutral/20 transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {t('viewExplorer')}
            </button>
            <button
              onClick={handleDisconnect}
              className="flex items-center w-full px-4 py-2 bg-transparent border-none cursor-pointer text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
            >
              {t('disconnect')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
