'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, encodeFunctionData, erc20Abi } from 'viem';
import { PAYMENT_CONFIG } from '@/config/web3';
import { useWallet } from './useWallet';

export function usePayment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const { hasEnoughCCOP, ccopBalanceRaw } = useWallet();
  const { writeContract } = useWriteContract();

  // Watch for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}`,
    query: {
      enabled: !!txHash,
    },
  });

  const payWithCCOP = async (amount: number) => {
    try {
      setIsProcessing(true);
      setPaymentStatus('pending');
      setError(null);

      // Check if user has enough cCOP balance
      if (!hasEnoughCCOP(amount)) {
        const availableBalance = ccopBalanceRaw ? parseFloat(ccopBalanceRaw.formatted) : 0;
        throw new Error(
          `Insufficient cCOP balance. Required: ${amount.toLocaleString('es-CO')} cCOP, Available: ${availableBalance.toLocaleString('es-CO')} cCOP`
        );
      }

      // Convert amount to wei (cCOP has 18 decimals)
      const amountInWei = parseUnits(amount.toString(), PAYMENT_CONFIG.token.decimals);

      // Execute the transfer using wagmi
      writeContract({
        address: PAYMENT_CONFIG.token.address,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [PAYMENT_CONFIG.receiverAddress, amountInWei],
      }, {
        onSuccess: (hash) => {
          setTxHash(hash);
          setPaymentStatus('success');
        },
        onError: (error) => {
          throw error;
        }
      });
    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      const errorMessage = error?.message || 'Payment failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetPayment = () => {
    setPaymentStatus('idle');
    setTxHash('');
    setError(null);
    setIsProcessing(false);
  };

  return {
    // State
    isProcessing,
    paymentStatus,
    txHash,
    error,
    isConfirming,
    isConfirmed,

    // Actions
    payWithCCOP,
    resetPayment,

    // Utilities
    formatAmount: (amount: number) => amount.toLocaleString('es-CO'),
    getExplorerUrl: (hash: string) =>
      `${PAYMENT_CONFIG.network.blockExplorers?.default.url}/tx/${hash}`,
  };
}