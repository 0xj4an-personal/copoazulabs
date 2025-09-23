// Export all types from a central location
export * from './cart';
export * from './common';
export * from './product';
export * from './web3';

// Global type definitions
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Environment variables type safety
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string;
      NEXT_PUBLIC_CELO_RPC_URL: string;
      NEXT_PUBLIC_CELO_EXPLORER_URL: string;
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_SITE_NAME: string;
      NEXT_PUBLIC_GA_ID?: string;
      NEXT_PUBLIC_HOTJAR_ID?: string;
      NEXT_PUBLIC_DIVVI_API_KEY?: string;
      SENTRY_DSN?: string;
      SENTRY_ORG?: string;
      SENTRY_PROJECT?: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}