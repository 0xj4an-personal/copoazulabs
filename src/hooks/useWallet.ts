'use client';

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { getCurrentNetwork, CCOP_TOKEN } from '@/config/web3';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

/**
 * Custom hook for wallet connection and management
 * Provides a simplified interface for wallet operations
 */
export function useWallet() {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { open, close } = useAppKit();
  const [ensName, setEnsName] = useState<string | null>(null);

  // Get CELO balance
  const { data: celoBalance } = useBalance({
    address,
    query: {
      enabled: !!address,
    },
  });

  // Get cCOP token balance
  const { data: ccopBalance } = useBalance({
    address,
    token: CCOP_TOKEN.address,
    query: {
      enabled: !!address,
    },
  });

  const network = getCurrentNetwork();

  // Function to resolve ENS name
  const resolveENS = async (addr: string) => {
    try {
      // Check if we have a cached result
      const cacheKey = `ens_${addr}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { name, timestamp } = JSON.parse(cached);
        // Cache for 24 hours
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          return name;
        }
      }

      // Use Ethereum mainnet provider for ENS resolution
      // ENS is primarily on Ethereum mainnet
      const ethereumProvider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
      
      // Resolve ENS name for the address
      const ensName = await ethereumProvider.lookupAddress(addr);
      
      console.log(`ENS Resolution for ${addr}:`, ensName);
      
      // Cache the result
      if (ensName) {
        localStorage.setItem(cacheKey, JSON.stringify({
          name: ensName,
          timestamp: Date.now()
        }));
      }

      return ensName;
    } catch (error) {
      console.error('Error resolving ENS:', error);
      return null;
    }
  };

  // Effect to resolve ENS name when address changes
  useEffect(() => {
    if (address) {
      // Clear any existing cache for this address to force fresh resolution
      const cacheKey = `ens_${address}`;
      localStorage.removeItem(cacheKey);
      
      // Also clear any old cache entries that might contain mock data
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('ens_') && localStorage.getItem(key)?.includes('example.eth')) {
          localStorage.removeItem(key);
        }
      });
      
      resolveENS(address).then(setEnsName);
    } else {
      setEnsName(null);
    }
  }, [address]);

  // Format address for display
  const formatAddress = (addr: string | undefined) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Format balance for display
  const formatBalance = (balance: any, symbol: string = 'CELO') => {
    if (!balance) return `0 ${symbol}`;
    const formatted = parseFloat(balance.formatted).toFixed(4);
    return `${formatted} ${symbol}`;
  };

  // Get display name (ENS name or formatted address)
  const getDisplayName = () => {
    if (!address) return '';
    return ensName || formatAddress(address);
  };

  return {
    // Connection state
    address,
    isConnected,
    isConnecting: isConnecting || isReconnecting,

    // Balances
    celoBalance: celoBalance ? formatBalance(celoBalance, 'CELO') : '0 CELO',
    ccopBalance: ccopBalance ? formatBalance(ccopBalance, 'cCOP') : '0 cCOP',
    celoBalanceRaw: celoBalance,
    ccopBalanceRaw: ccopBalance,

    // Network info
    network,
    chainId: network.id,

    // ENS info
    ensName,
    displayName: getDisplayName(),

    // Actions
    connect: () => open(),
    disconnect,
    openModal: () => open(),
    closeModal: () => close(),

    // Utilities
    formatAddress: () => formatAddress(address),
    shortAddress: formatAddress(address),

    // Available connectors
    connectors,

    // Helper methods
    hasEnoughCCOP: (requiredAmount: number) => {
      if (!ccopBalance) return false;
      return parseFloat(ccopBalance.formatted) >= requiredAmount;
    },

    hasEnoughCELO: (requiredAmount: number) => {
      if (!celoBalance) return false;
      return parseFloat(celoBalance.formatted) >= requiredAmount;
    },
  };
}

/**
 * Hook for checking if user is connected to the correct network
 */
export function useNetworkCheck() {
  const { address } = useAccount();
  const network = getCurrentNetwork();

  return {
    isCorrectNetwork: true, // We're only supporting Celo, so always true
    targetNetwork: network,
    switchToCorrectNetwork: () => {
      // Network switching is handled by AppKit automatically
    },
  };
}