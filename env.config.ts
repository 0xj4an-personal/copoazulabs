// Environment Variables Configuration
// This file centralizes all environment variable access with type safety

export const env = {
  // Application Configuration
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Copoazú Labs',
  APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Web3 Fashion & Merchandise Marketplace',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0',
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  
  // Web3 Configuration - Celo Network
  CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID || '42220', // Celo Mainnet
  RPC_URL: process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.celocolombia.org',
  WALLET_CONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'b728b33130cc37e157fde632ddb4cee5',
  
  // Celo Network Details
  CELO_CHAIN_ID: '42220',
  CELO_TESTNET_CHAIN_ID: '11142220', // Celo Sepolia (Official Chain ID)
  CELO_RPC_URL: 'https://rpc.celocolombia.org',
  CELO_TESTNET_RPC_URL: 'https://sepolia-forno.celo-testnet.org',
  
  // API Configuration
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  API_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  
  // Payment Configuration
  PAYMENT_PROVIDER: process.env.NEXT_PUBLIC_PAYMENT_PROVIDER || 'stripe',
  CRYPTO_PAYMENTS_ENABLED: process.env.NEXT_PUBLIC_CRYPTO_PAYMENTS_ENABLED === 'true',
  
  // Analytics
  GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
  MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '',
  
  // Feature Flags
  ENABLE_WEB3: process.env.NEXT_PUBLIC_ENABLE_WEB3 !== 'false',
  ENABLE_CRYPTO_PAYMENTS: process.env.NEXT_PUBLIC_ENABLE_CRYPTO_PAYMENTS !== 'false',
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_DEBUG: process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true',
  
  // Social Media Links
  TWITTER_URL: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/copoazulabs',
  DISCORD_URL: process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/copoazulabs',
  TELEGRAM_URL: process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/copoazulabs',
  GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/0xj4an',
} as const;

// Type definitions for better TypeScript support
export type EnvConfig = typeof env;

// Validation function to check if required env vars are set
export function validateEnvVars() {
  const required = [
    'NEXT_PUBLIC_APP_NAME',
    'NEXT_PUBLIC_APP_URL',
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
  }
  
  return missing.length === 0;
}

// Helper function to get environment-specific configuration
export function getEnvironmentConfig() {
  return {
    isDevelopment: env.IS_DEVELOPMENT,
    isProduction: env.IS_PRODUCTION,
    apiUrl: env.API_BASE_URL,
    enableDebug: env.ENABLE_DEBUG,
    enableAnalytics: env.ENABLE_ANALYTICS,
  };
}

// Celo-specific configuration helpers
export function getCeloConfig() {
  return {
    chainId: env.CHAIN_ID,
    rpcUrl: env.RPC_URL,
    isCeloMainnet: env.CHAIN_ID === env.CELO_CHAIN_ID,
    isCeloTestnet: env.CHAIN_ID === env.CELO_TESTNET_CHAIN_ID,
    explorerUrl: env.CHAIN_ID === env.CELO_CHAIN_ID 
      ? 'https://explorer.celo.org' 
      : 'https://sepolia-blockscout.celo-testnet.org',
    nativeCurrency: {
      name: 'CELO',
      symbol: 'CELO',
      decimals: 18,
    },
  };
}

// Get network configuration for wallet connection
export function getNetworkConfig() {
  const celoConfig = getCeloConfig();
  
  return {
    chainId: parseInt(celoConfig.chainId),
    chainName: celoConfig.isCeloMainnet ? 'Celo' : 'Celo Sepolia',
    rpcUrls: [celoConfig.rpcUrl],
    blockExplorerUrls: [celoConfig.explorerUrl],
    nativeCurrency: celoConfig.nativeCurrency,
  };
}
