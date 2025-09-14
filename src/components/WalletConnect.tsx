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
        {error && (
          <div className="absolute top-full right-0 mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400 text-xs max-w-xs z-50">
            <div className="flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {error}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="inline-flex items-center px-4 py-2 bg-[#F5F1E7] dark:bg-gray-800 text-[#1C1C1C] dark:text-gray-100 font-medium rounded-lg border border-[#9A9A9A] dark:border-gray-600 cursor-pointer transition-all duration-200 active:scale-95 touch-manipulation"
        style={{ minWidth: '44px', minHeight: '44px' }}
      >
        <Wallet className="w-4 h-4 mr-2" />
        {formatAddress(address)}
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-900 border border-[#9A9A9A] dark:border-gray-600 rounded-lg shadow-lg min-w-[200px] z-50">
          <div className="p-3 border-b border-[#9A9A9A] dark:border-gray-600">
            <p className="text-sm text-[#9A9A9A] dark:text-gray-400 m-0">{t('connected')}</p>
            <p className="text-sm text-[#1C1C1C] dark:text-gray-100 mt-1 m-0 font-mono">
              {address}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 m-0">
              Balance: {formatBalance(balance)} CELO
            </p>
          </div>
          <div className="py-2">
            <button
              onClick={copyAddress}
              className="flex items-center w-full px-4 py-2 bg-transparent border-none cursor-pointer text-sm text-[#1C1C1C] dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <Copy className="w-4 h-4 mr-2" />
              {t('copyAddress')}
            </button>
            <button
              onClick={openExplorer}
              className="flex items-center w-full px-4 py-2 bg-transparent border-none cursor-pointer text-sm text-[#1C1C1C] dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {t('viewExplorer')}
            </button>
            <button
              onClick={switchToCeloNetwork}
              className="flex items-center w-full px-4 py-2 bg-transparent border-none cursor-pointer text-sm text-[#1C1C1C] dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <Wallet className="w-4 h-4 mr-2" />
              {t('switchToCelo')}
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
