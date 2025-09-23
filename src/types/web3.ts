export interface WalletInfo {
  address: string;
  isConnected: boolean;
  balance?: string;
  chainId?: number;
  ensName?: string;
}

export interface PaymentStatus {
  status: 'idle' | 'pending' | 'success' | 'error';
  txHash?: string;
  error?: string;
  isConfirming?: boolean;
}

export interface TokenInfo {
  symbol: string;
  name: string;
  decimals: number;
  address: string;
  balance?: string;
}

export interface NetworkInfo {
  chainId: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  currency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export interface TransactionInfo {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasPrice?: string;
  gasUsed?: string;
  blockNumber?: number;
  timestamp?: number;
}

export interface PaymentRequest {
  amount: number;
  token: TokenInfo;
  recipient: string;
  metadata?: Record<string, any>;
}

export interface Web3ContextType {
  isConnected: boolean;
  address?: string;
  balance?: string;
  chainId?: number;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchChain: (chainId: number) => Promise<void>;
  paymentStatus: PaymentStatus;
  makePayment: (request: PaymentRequest) => Promise<void>;
}