'use client';

import { useState } from 'react';
import { Wallet, ChevronDown, Copy, ExternalLink } from 'lucide-react';
import { getCeloConfig } from '../../env.config';
import { useTranslations } from 'next-intl';

interface WalletConnectProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export default function WalletConnect({ onConnect, onDisconnect }: WalletConnectProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const t = useTranslations('wallet');

  const handleConnect = async () => {
    try {
      // Simulate wallet connection
      const mockAddress = '0x1234...5678';
      setWalletAddress(mockAddress);
      setIsConnected(true);
      onConnect?.();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress('');
    setShowDropdown(false);
    onDisconnect?.();
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  const openExplorer = () => {
    const celoConfig = getCeloConfig();
    const explorerUrl = `${celoConfig.explorerUrl}/address/${walletAddress}`;
    window.open(explorerUrl, '_blank');
  };

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '8px 16px',
          backgroundColor: '#3E7C4A',
          color: '#FFFFFF',
          fontWeight: '500',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Wallet style={{ width: '16px', height: '16px', marginRight: '8px' }} />
        {t('connect')}
      </button>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '8px 16px',
          backgroundColor: '#F5F1E7',
          color: '#1C1C1C',
          fontWeight: '500',
          borderRadius: '8px',
          border: '1px solid #9A9A9A',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <Wallet style={{ width: '16px', height: '16px', marginRight: '8px' }} />
        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        <ChevronDown style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
      </button>

      {showDropdown && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '8px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #9A9A9A',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          minWidth: '200px',
          zIndex: 50
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #9A9A9A' }}>
            <p style={{ fontSize: '0.875rem', color: '#9A9A9A', margin: 0 }}>{t('connected')}</p>
            <p style={{ fontSize: '0.875rem', color: '#1C1C1C', margin: '4px 0 0 0', fontFamily: 'monospace' }}>
              {walletAddress}
            </p>
          </div>
          <div style={{ padding: '8px 0' }}>
            <button
              onClick={copyAddress}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                color: '#1C1C1C',
                transition: 'background-color 0.2s ease'
              }}
            >
              <Copy style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              {t('copyAddress')}
            </button>
            <button
              onClick={openExplorer}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                color: '#1C1C1C',
                transition: 'background-color 0.2s ease'
              }}
            >
              <ExternalLink style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              {t('viewExplorer')}
            </button>
            <button
              onClick={handleDisconnect}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                color: '#D88FA0',
                transition: 'background-color 0.2s ease'
              }}
            >
              {t('disconnect')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
