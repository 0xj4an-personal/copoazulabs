'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Wallet, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { usePayment } from '@/hooks/usePayment';
import { useWallet } from '@/hooks/useWallet';
import { PAYMENT_CONFIG } from '@/config/web3';

interface CeloPaymentProps {
  totalPrice: number;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
}

export default function CeloPayment({ totalPrice, onPaymentSuccess, onPaymentError }: CeloPaymentProps) {
  const t = useTranslations('checkout');
  const { isConnected, connect, ccopBalance } = useWallet();
  const {
    isProcessing,
    paymentStatus,
    txHash,
    error,
    isConfirming,
    payWithCCOP,
    getExplorerUrl,
    formatAmount,
  } = usePayment();

  const handleCeloPayment = async () => {
    try {
      if (!isConnected) {
        await connect();
        return;
      }

      await payWithCCOP(totalPrice);
      onPaymentSuccess();
    } catch (error: any) {
      console.error('Payment error:', error);
      onPaymentError(error.message || 'Payment failed');
    }
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-brand-primary" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-brand-purple" />;
      default:
        return <Wallet className="w-5 h-5 text-brand-primary" />;
    }
  };

  const getStatusText = () => {
    if (isConfirming) return 'Confirming transaction...';

    switch (paymentStatus) {
      case 'pending':
        return 'Processing payment...';
      case 'success':
        return 'Payment successful!';
      case 'error':
        return 'Payment failed';
      default:
        return isConnected ? 'Pay with cCOP' : 'Connect wallet to pay';
    }
  };

  return (
    <div style={{ 
      border: '2px solid #3D7DD6', 
      borderRadius: '8px', 
      padding: '16px',
      backgroundColor: paymentStatus === 'success' ? 'var(--brand-background)' : paymentStatus === 'error' ? 'var(--brand-background)' : 'var(--brand-white)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        {getStatusIcon()}
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontWeight: '600', 
            color: '#1B1B2E',
            marginBottom: '4px'
          }}>
            {getStatusText()}
          </h3>
          <p style={{ 
            fontSize: '14px', 
            color: '#C6CED6',
            margin: 0
          }}>
            {t('cryptoPaymentDescription')}
          </p>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#F5F8FA', 
        borderRadius: '6px', 
        padding: '12px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', color: '#C6CED6' }}>Amount:</span>
          <span style={{ fontWeight: '600', color: '#1B1B2E' }}>
            {formatAmount(totalPrice)} cCOP
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', color: '#C6CED6' }}>Network:</span>
          <span style={{ fontWeight: '600', color: '#1B1B2E' }}>
            {PAYMENT_CONFIG.network.name}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', color: '#C6CED6' }}>Your cCOP:</span>
          <span style={{ fontWeight: '600', color: '#1B1B2E' }}>
            {ccopBalance}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', color: '#C6CED6' }}>Recipient:</span>
          <span style={{
            fontSize: '12px',
            fontFamily: 'monospace',
            color: '#C6CED6'
          }}>
            {PAYMENT_CONFIG.receiverAddress.slice(0, 6)}...{PAYMENT_CONFIG.receiverAddress.slice(-4)}
          </span>
        </div>
      </div>

      {paymentStatus === 'success' && txHash && (
        <div style={{ 
          backgroundColor: '#F5F8FA', 
          border: '1px solid #B4E2F9',
          borderRadius: '6px', 
          padding: '12px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <CheckCircle className="w-4 h-4 text-brand-primary" />
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#1B1B2E' }}>
              Transaction Successful
            </span>
          </div>
          <a
            href={getExplorerUrl(txHash)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              color: '#3D7DD6',
              textDecoration: 'none'
            }}
          >
            View on Celo Explorer
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {error && (
        <div style={{
          backgroundColor: '#F5F8FA',
          border: '1px solid #C6CED6',
          borderRadius: '6px',
          padding: '12px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle className="w-4 h-4 text-brand-purple" />
            <span style={{ fontSize: '14px', color: '#1B1B2E' }}>
              {error}
            </span>
          </div>
        </div>
      )}

      <button
        onClick={handleCeloPayment}
        disabled={isProcessing || isConfirming || paymentStatus === 'success'}
        style={{
          width: '100%',
          padding: '12px 24px',
          backgroundColor: paymentStatus === 'success' ? '#3D7DD6' : isConnected ? '#1A49FF' : '#C6CED6',
          color: 'var(--brand-white)',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isProcessing || isConfirming || paymentStatus === 'success' ? 'not-allowed' : 'pointer',
          opacity: isProcessing || isConfirming || paymentStatus === 'success' ? 0.7 : 1,
          transition: 'all 0.2s ease'
        }}
      >
        {getStatusText()}
      </button>
    </div>
  );
}
