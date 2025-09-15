'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface VerificationContextType {
  isVerified: boolean;
  verificationDate: string | null;
  setVerified: (verified: boolean) => void;
  checkVerificationStatus: () => void;
  clearVerification: () => void;
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export function VerificationProvider({ children }: { children: React.ReactNode }) {
  const [isVerified, setIsVerified] = useState(false);
  const [verificationDate, setVerificationDate] = useState<string | null>(null);

  // Check verification status on mount
  useEffect(() => {
    checkVerificationStatus();
  }, []);

  const checkVerificationStatus = () => {
    if (typeof window !== 'undefined') {
      const verified = localStorage.getItem('selfVerified') === 'true';
      const date = localStorage.getItem('verificationDate');
      
      setIsVerified(verified);
      setVerificationDate(date);
    }
  };

  const setVerified = (verified: boolean) => {
    setIsVerified(verified);
    
    if (verified && typeof window !== 'undefined') {
      localStorage.setItem('selfVerified', 'true');
      localStorage.setItem('verificationDate', new Date().toISOString());
      setVerificationDate(new Date().toISOString());
    }
  };

  const clearVerification = () => {
    setIsVerified(false);
    setVerificationDate(null);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('selfVerified');
      localStorage.removeItem('verificationDate');
    }
  };

  return (
    <VerificationContext.Provider 
      value={{ 
        isVerified, 
        verificationDate, 
        setVerified, 
        checkVerificationStatus,
        clearVerification 
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
}

export function useVerification() {
  const context = useContext(VerificationContext);
  if (context === undefined) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return context;
}
