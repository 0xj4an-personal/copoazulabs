'use client';

import { useCallback } from 'react';
import { getReferralTag, submitReferral } from '@divvi/referral-sdk';
import { useAccount, useWalletClient } from 'wagmi';

// Divvi consumer address from environment variable
const DIVVI_CONSUMER_ADDRESS = process.env.NEXT_PUBLIC_DIVVI_CONSUMER_ADDRESS || '';

// Helper function to validate and format address
const getValidConsumerAddress = (): `0x${string}` => {
  if (!DIVVI_CONSUMER_ADDRESS) {
    throw new Error('NEXT_PUBLIC_DIVVI_CONSUMER_ADDRESS environment variable is not set');
  }
  
  if (!DIVVI_CONSUMER_ADDRESS.startsWith('0x')) {
    throw new Error('Invalid Divvi consumer address format');
  }
  
  return DIVVI_CONSUMER_ADDRESS as `0x${string}`;
};

export function useDivvi() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const generateReferralTag = useCallback(() => {
    if (!address) {
      throw new Error('No wallet connected');
    }

    const consumerAddress = getValidConsumerAddress();

    return getReferralTag({
      user: address,
      consumer: consumerAddress,
    });
  }, [address]);

  const submitReferralTransaction = useCallback(async (txHash: string) => {
    if (!walletClient) {
      throw new Error('Wallet client not available');
    }

    try {
      const chainId = await walletClient.getChainId();
      
      // Ensure txHash is properly formatted as a hex string
      const formattedTxHash = txHash.startsWith('0x') ? txHash : `0x${txHash}`;
      
      await submitReferral({
        txHash: formattedTxHash as `0x${string}`,
        chainId,
      });

      console.log('✅ Referral submitted to Divvi successfully');
    } catch (error) {
      console.error('❌ Failed to submit referral to Divvi:', error);
      // Don't throw error to avoid breaking the main transaction flow
    }
  }, [walletClient]);

  const addReferralToTransaction = useCallback((originalData: string) => {
    try {
      const referralTag = generateReferralTag();
      return originalData + referralTag;
    } catch (error) {
      console.error('❌ Failed to generate referral tag:', error);
      // Return original data if referral tag generation fails
      return originalData;
    }
  }, [generateReferralTag]);

  return {
    generateReferralTag,
    submitReferralTransaction,
    addReferralToTransaction,
    consumerAddress: DIVVI_CONSUMER_ADDRESS,
    getValidConsumerAddress,
  };
}
