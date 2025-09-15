'use client';

import { useCallback } from 'react';
import { getReferralTag, submitReferral } from '@divvi/referral-sdk';
import { useAccount, useWalletClient } from 'wagmi';

// Divvi consumer address for Copoazú Labs
const DIVVI_CONSUMER_ADDRESS = '0x32b3fC1212D336c0F46DE9961B0599b92b79eEf0';

export function useDivvi() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const generateReferralTag = useCallback(() => {
    if (!address) {
      throw new Error('No wallet connected');
    }

    return getReferralTag({
      user: address,
      consumer: DIVVI_CONSUMER_ADDRESS,
    });
  }, [address]);

  const submitReferralTransaction = useCallback(async (txHash: string) => {
    if (!walletClient) {
      throw new Error('Wallet client not available');
    }

    try {
      const chainId = await walletClient.getChainId();
      
      await submitReferral({
        txHash,
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
  };
}
