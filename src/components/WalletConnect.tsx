'use client';

import { useState, useEffect } from 'react';
import { Wallet, ChevronDown, Copy, ExternalLink, AlertCircle } from 'lucide-react';
import { getCeloConfig } from '../../env.config';
import { useTranslations } from 'next-intl';

interface WalletConnectProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export default function WalletConnect({ onConnect, onDisconnect }: WalletConnectProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('wallet');

  // Check if wallet is already connected on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      checkConnection();
    }
  }, []);

  const checkConnection = async () => {
    try {
      if (typeof window === 'undefined' || !window.ethereum) return;
      
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest']
        });
        setAddress(accounts[0]);
        setBalance(balance);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('No wallet detected. Please install MetaMask or another Web3 wallet.');
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest']
        });
        setAddress(accounts[0]);
        setBalance(balance);
        setIsConnected(true);
        onConnect?.();
      }
    } catch (error: any) {
      setError(error.message || 'Failed to connect wallet');
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAddress('');
    setBalance('');
    setShowDropdown(false);
    setError(null);
    onDisconnect?.();
  };

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (bal: string) => {
    if (!bal) return '0';
    const wei = parseInt(bal, 16);
    const ether = wei / Math.pow(10, 18);
    return ether.toFixed(4);
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  const openExplorer = () => {
    if (address) {
      const celoConfig = getCeloConfig();
      const explorerUrl = `${celoConfig.explorerUrl}/address/${address}`;
      window.open(explorerUrl, '_blank');
    }
  };

  const switchToCeloNetwork = async () => {
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('No wallet detected');
      }

      // Celo Mainnet with Celo Colombia RPC
      const celoMainnet = {
        chainId: '0xa4ec', // 42220 in hex (Celo Mainnet)
        chainName: 'Celo Mainnet',
        nativeCurrency: {
          name: 'CELO',
          symbol: 'CELO',
          decimals: 18,
        },
        rpcUrls: ['https://rpc.celocolombia.org'],
        blockExplorerUrls: ['https://explorer.celo.org/'],
      };

      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: celoMainnet.chainId }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [celoMainnet],
          });
        } else {
          throw switchError;
        }
      }
    } catch (error: any) {
      setError(error.message || 'Failed to switch to Celo network');
    }
  };

  if (!isConnected) {
    return (
      <div>
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 16px',
            backgroundColor: isConnecting ? '#9CA3AF' : '#3E7C4A',
            color: '#FFFFFF',
            fontWeight: '500',
            borderRadius: '8px',
            border: 'none',
            cursor: isConnecting ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            opacity: isConnecting ? 0.7 : 1
          }}
        >
          <Wallet style={{ width: '16px', height: '16px', marginRight: '8px' }} />
          {isConnecting ? t('connecting') : t('connect')}
        </button>
        {error && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            padding: '8px 12px',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '6px',
            color: '#DC2626',
            fontSize: '0.75rem',
            maxWidth: '250px',
            zIndex: 50
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle style={{ width: '12px', height: '12px' }} />
              {error}
            </div>
          </div>
        )}
      </div>
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
        {formatAddress(address)}
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
              {address}
            </p>
            <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: '4px 0 0 0' }}>
              Balance: {formatBalance(balance)} CELO
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
              onClick={switchToCeloNetwork}
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
              <Wallet style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              {t('switchToCelo')}
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
