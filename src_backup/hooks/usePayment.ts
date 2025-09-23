'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useWalletClient } from 'wagmi';
import { parseUnits, encodeFunctionData, erc20Abi } from 'viem';
import { PAYMENT_CONFIG } from '@/config/web3';
import { useWallet } from './useWallet';
import { useDivvi } from './useDivvi';

export function usePayment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const { hasEnoughCCOP, ccopBalanceRaw } = useWallet();
  const { addReferralToTransaction, submitReferralTransaction } = useDivvi();
  const { writeContract } = useWriteContract();
  const { data: walletClient } = useWalletClient();

  // Watch for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash ? (txHash.startsWith('0x') ? txHash : `0x${txHash}`) as `0x${string}` : undefined,
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

      // Encode the transfer function call
      const transferData = encodeFunctionData({
        abi: erc20Abi,
        functionName: 'transfer',
        args: [PAYMENT_CONFIG.receiverAddress, amountInWei],
      });

      // Add Divvi referral tag to the transaction data
      const dataWithReferral = addReferralToTransaction(transferData);

      // Use wallet client for custom transaction with referral data
      if (walletClient) {
        try {
          const hash = await walletClient.sendTransaction({
            to: PAYMENT_CONFIG.token.address as `0x${string}`,
            data: dataWithReferral as `0x${string}`,
            value: BigInt(0),
          });
          
          setTxHash(hash);
          setPaymentStatus('success');
          
          // Submit referral to Divvi after successful transaction
          try {
            await submitReferralTransaction(hash);
          } catch (referralError) {
            console.error('Failed to submit referral to Divvi:', referralError);
            // Don't fail the payment if referral submission fails
          }
        } catch (error) {
          throw error;
        }
      } else {
        // Fallback to regular writeContract if wallet client not available
        writeContract({
          address: PAYMENT_CONFIG.token.address,
          abi: erc20Abi,
          functionName: 'transfer',
          args: [PAYMENT_CONFIG.receiverAddress, amountInWei],
        }, {
          onSuccess: async (hash) => {
            setTxHash(hash);
            setPaymentStatus('success');
            
            // Submit referral to Divvi after successful transaction
            try {
              await submitReferralTransaction(hash);
            } catch (referralError) {
              console.error('Failed to submit referral to Divvi:', referralError);
              // Don't fail the payment if referral submission fails
            }
          },
          onError: (error) => {
            throw error;
          }
        });
      }
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