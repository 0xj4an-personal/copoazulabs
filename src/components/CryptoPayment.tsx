'use client';

import { useState } from 'react';
import { Coins, ArrowRight, Check } from 'lucide-react';
import { blockchainConfig } from '../../env.config';

interface CryptoPaymentProps {
  amount: number;
  onPaymentComplete?: (method: string) => void;
}

export default function CryptoPayment({ amount, onPaymentComplete }: CryptoPaymentProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const celoConfig = blockchainConfig;
  
  const paymentMethods = [
    { id: 'ccop', name: 'cCOP', symbol: 'cCOP', rate: 1, network: 'Celo' },
  ];

  const handlePayment = async (method: string) => {
    setIsProcessing(true);
    setSelectedMethod(method);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete?.(method);
    }, 2000);
  };

  return (
    <div style={{
      backgroundColor: 'var(--brand-white)',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{
          width: '60px',
          height: '60px',
          backgroundColor: 'var(--brand-primary)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px'
        }}>
          <Coins style={{ width: '30px', height: '30px', color: 'var(--brand-white)' }} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--brand-dark)', marginBottom: '8px' }}>
          Crypto Payment
        </h3>
        <p style={{ color: 'var(--brand-neutral)', fontSize: '0.875rem' }}>
          Pay with your preferred cryptocurrency
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{
          backgroundColor: 'var(--brand-background)',
          padding: '16px',
          borderRadius: '8px',
          textAlign: 'center',
          marginBottom: '16px'
        }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--brand-neutral)', margin: '0 0 4px 0' }}>Total Amount</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--brand-dark)', margin: 0 }}>
            ${amount}
          </p>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => handlePayment(method.id)}
              disabled={isProcessing}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: selectedMethod === method.id ? 'var(--brand-background)' : 'var(--brand-white)',
                border: `2px solid ${selectedMethod === method.id ? 'var(--brand-primary)' : 'var(--brand-neutral)'}`,
                borderRadius: '8px',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                opacity: isProcessing ? 0.6 : 1
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: 'var(--brand-primary)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Coins style={{ width: '16px', height: '16px', color: 'var(--brand-white)' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--brand-dark)', margin: 0 }}>
                    {method.name}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--brand-neutral)', margin: 0 }}>
                    {(amount * method.rate).toFixed(6)} {method.symbol}
                  </p>
                </div>
              </div>
              
              {selectedMethod === method.id && !isProcessing && (
                <Check style={{ width: '20px', height: '20px', color: 'var(--brand-primary)' }} />
              )}
              
              {isProcessing && selectedMethod === method.id && (
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid var(--brand-primary)',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {isProcessing && (
        <div style={{
          backgroundColor: 'var(--brand-background)',
          padding: '16px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--brand-dark)', margin: 0 }}>
            Processing payment with {paymentMethods.find(m => m.id === selectedMethod)?.name}...
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
