'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Wallet, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

interface CeloPaymentProps {
  totalPrice: number;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
}

export default function CeloPayment({ totalPrice, onPaymentSuccess, onPaymentError }: CeloPaymentProps) {
  const t = useTranslations('checkout');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState<string>('');

  // Wallet address where payments will be sent
  const RECEIVER_ADDRESS = '0x06C000F406AdD41462E4899Ff3A22312d7AACF46';
  
  // cCOP token contract address on Celo (Celo Dollar - stablecoin)
  const CCOP_TOKEN_ADDRESS = '0x765DE816845861e75A25fCA122bb6898B8B1282a';
  
  // Celo network configuration
  const CELO_CONFIG = {
    rpcUrl: 'https://rpc.celocolombia.org',
    chainId: 42220, // Mainnet Celo
    chainName: 'Celo Mainnet',
    nativeCurrency: {
      name: 'CELO',
      symbol: 'CELO',
      decimals: 18,
    },
  };

  const handleCeloPayment = async () => {
    try {
      setIsProcessing(true);
      setPaymentStatus('pending');

      // Check if wallet is connected
      if (!window.ethereum) {
        throw new Error('Please install MetaMask or a compatible wallet');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const userAddress = accounts[0];

      // Switch to Celo network if not already connected
      await switchToCeloNetwork();

      // Send cCOP tokens (ERC-20 token on Celo network)
      // In a real implementation, you would interact with the cCOP token contract
      const amountInWei = (totalPrice * 1e18).toString(16); // Convert to wei (cCOP has 18 decimals)

      // Create transaction
      const transaction = {
        from: userAddress,
        to: RECEIVER_ADDRESS,
        value: '0x' + amountInWei,
        gas: '0x5208', // 21000 gas limit for simple transfer
      };

      // Send transaction
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transaction],
      });

      setTxHash(txHash);
      setPaymentStatus('success');
      onPaymentSuccess();

    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      onPaymentError(error.message || 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const switchToCeloNetwork = async () => {
    if (!window.ethereum) {
      throw new Error('Wallet not found');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xa4ec' }], // Celo mainnet chain ID in hex
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xa4ec',
                chainName: 'Celo Mainnet',
                rpcUrls: ['https://rpc.celocolombia.org'],
                nativeCurrency: {
                  name: 'CELO',
                  symbol: 'CELO',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://explorer.celo.org'],
              },
            ],
          });
        } catch (addError) {
          throw new Error('Failed to add Celo network to wallet');
        }
      } else {
        throw new Error('Failed to switch to Celo network');
      }
    }
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Wallet className="w-5 h-5 text-green-600" />;
    }
  };

  const getStatusText = () => {
    switch (paymentStatus) {
      case 'pending':
        return 'Processing payment...';
      case 'success':
        return 'Payment successful!';
      case 'error':
        return 'Payment failed';
      default:
        return 'Pay with cCOP';
    }
  };

  return (
    <div style={{ 
      border: '2px solid #10B981', 
      borderRadius: '8px', 
      padding: '16px',
      backgroundColor: paymentStatus === 'success' ? '#F0FDF4' : paymentStatus === 'error' ? '#FEF2F2' : '#FFFFFF'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        {getStatusIcon()}
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontWeight: '600', 
            color: '#111827',
            marginBottom: '4px'
          }}>
            {getStatusText()}
          </h3>
          <p style={{ 
            fontSize: '14px', 
            color: '#6B7280',
            margin: 0
          }}>
            {t('cryptoPaymentDescription')}
          </p>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#F9FAFB', 
        borderRadius: '6px', 
        padding: '12px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', color: '#6B7280' }}>Amount:</span>
          <span style={{ fontWeight: '600', color: '#111827' }}>
            {totalPrice.toLocaleString('es-CO')} cCOP
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', color: '#6B7280' }}>Network:</span>
          <span style={{ fontWeight: '600', color: '#111827' }}>Celo</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', color: '#6B7280' }}>Wallet:</span>
          <span style={{ 
            fontSize: '12px', 
            fontFamily: 'monospace',
            color: '#6B7280'
          }}>
            {RECEIVER_ADDRESS.slice(0, 6)}...{RECEIVER_ADDRESS.slice(-4)}
          </span>
        </div>
      </div>

      {paymentStatus === 'success' && txHash && (
        <div style={{ 
          backgroundColor: '#F0FDF4', 
          border: '1px solid #BBF7D0',
          borderRadius: '6px', 
          padding: '12px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#065F46' }}>
              Transaction Successful
            </span>
          </div>
          <a
            href={`https://explorer.celo.org/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              color: '#059669',
              textDecoration: 'none'
            }}
          >
            View on Celo Explorer
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      <button
        onClick={handleCeloPayment}
        disabled={isProcessing || paymentStatus === 'success'}
        style={{
          width: '100%',
          padding: '12px 24px',
          backgroundColor: paymentStatus === 'success' ? '#10B981' : '#059669',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isProcessing || paymentStatus === 'success' ? 'not-allowed' : 'pointer',
          opacity: isProcessing || paymentStatus === 'success' ? 0.7 : 1,
          transition: 'all 0.2s ease'
        }}
      >
        {isProcessing ? 'Processing...' : paymentStatus === 'success' ? 'Payment Complete' : 'Pay with cCOP'}
      </button>
    </div>
  );
}
