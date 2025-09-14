'use client';

import { useState } from 'react';
import { Coins, ArrowRight, Check } from 'lucide-react';
import { getCeloConfig } from '../../env.config';

interface CryptoPaymentProps {
  amount: number;
  onPaymentComplete?: (method: string) => void;
}

export default function CryptoPayment({ amount, onPaymentComplete }: CryptoPaymentProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const celoConfig = getCeloConfig();
  
  const paymentMethods = [
    { id: 'celo', name: 'CELO', symbol: 'CELO', rate: 2.5, network: 'Celo' },
    { id: 'cusd', name: 'Celo Dollar', symbol: 'cUSD', rate: 1, network: 'Celo' },
    { id: 'ceur', name: 'Celo Euro', symbol: 'cEUR', rate: 0.92, network: 'Celo' },
    { id: 'creal', name: 'Celo Real', symbol: 'cREAL', rate: 5.2, network: 'Celo' },
    // Fallback to other networks if needed
    { id: 'usdc', name: 'USDC', symbol: 'USDC', rate: 1, network: 'Ethereum' },
    { id: 'usdt', name: 'USDT', symbol: 'USDT', rate: 1, network: 'Ethereum' },
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
      backgroundColor: '#FFFFFF',
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
          backgroundColor: '#3E7C4A',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px'
        }}>
          <Coins style={{ width: '30px', height: '30px', color: '#FFFFFF' }} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1C1C1C', marginBottom: '8px' }}>
          Crypto Payment
        </h3>
        <p style={{ color: '#9A9A9A', fontSize: '0.875rem' }}>
          Pay with your preferred cryptocurrency
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{
          backgroundColor: '#F5F1E7',
          padding: '16px',
          borderRadius: '8px',
          textAlign: 'center',
          marginBottom: '16px'
        }}>
          <p style={{ fontSize: '0.875rem', color: '#9A9A9A', margin: '0 0 4px 0' }}>Total Amount</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1C1C1C', margin: 0 }}>
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
                backgroundColor: selectedMethod === method.id ? '#F5F1E7' : '#FFFFFF',
                border: `2px solid ${selectedMethod === method.id ? '#3E7C4A' : '#9A9A9A'}`,
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
                  backgroundColor: '#3E7C4A',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Coins style={{ width: '16px', height: '16px', color: '#FFFFFF' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1C1C1C', margin: 0 }}>
                    {method.name}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#9A9A9A', margin: 0 }}>
                    {(amount * method.rate).toFixed(6)} {method.symbol}
                  </p>
                </div>
              </div>
              
              {selectedMethod === method.id && !isProcessing && (
                <Check style={{ width: '20px', height: '20px', color: '#3E7C4A' }} />
              )}
              
              {isProcessing && selectedMethod === method.id && (
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid #3E7C4A',
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
          backgroundColor: '#F5F1E7',
          padding: '16px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.875rem', color: '#1C1C1C', margin: 0 }}>
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
