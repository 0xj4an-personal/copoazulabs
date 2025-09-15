// Web3 Configuration with Reown AppKit
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { celo } from 'viem/chains'
import { QueryClient } from '@tanstack/react-query'
import { env } from '../../env.config'

// Query client for React Query
export const queryClient = new QueryClient()

// Celo network configuration optimized for Colombia
const celoMainnet = {
  ...celo,
  rpcUrls: {
    default: {
      http: ['https://rpc.celocolombia.org'],
    },
    public: {
      http: ['https://rpc.celocolombia.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Celoscan',
      url: 'https://celoscan.io',
    },
  },
}

// Project ID - This should be set in environment variables
const projectId = env.WALLET_CONNECT_PROJECT_ID || 'demo-project-id'

if (!env.WALLET_CONNECT_PROJECT_ID) {
  console.warn('WALLET_CONNECT_PROJECT_ID not set. Using demo project ID.')
}

// Wagmi adapter configuration
export const wagmiAdapter = new WagmiAdapter({
  networks: [celoMainnet],
  projectId,
  ssr: true,
})

// Reown AppKit configuration
export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks: [celoMainnet],
  projectId,
  metadata: {
    name: 'Copoazú Labs',
    description: 'Web3 Fashion & Merchandise Marketplace - Colombian Crypto Fashion',
    url: env.APP_URL,
    icons: [`${env.APP_URL}/favicon.ico`],
  },
  // Enhanced features for e-commerce
  features: {
    email: true,        // Social login with email
    socials: ['google', 'apple', 'github'], // Social login options
    onramp: true,       // Buy crypto directly
    swaps: true,        // Token swaps
    smartSessions: true, // Smart accounts with session keys
  },
  // Theme customization to match Copoazú branding
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': '#8B4513', // Brown (matching your coffee theme)
    '--w3m-color-mix-strength': 20,
    '--w3m-accent': '#8B4513',
    '--w3m-border-radius-master': '8px',
  },
  // Custom wallet ordering for Colombian users
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
    '19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927', // Ledger Live
  ],
})

// Export configuration types
export type { AppKit } from '@reown/appkit/react'
export type { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// Helper function to get current network info
export function getCurrentNetwork() {
  return celoMainnet
}

// cCOP token configuration
export const CCOP_TOKEN = {
  address: '0x765DE816845861e75A25fCA122bb6898B8B1282a' as const,
  symbol: 'cCOP',
  decimals: 18,
  name: 'Celo Colombian Peso',
}

// Payment configuration
export const PAYMENT_CONFIG = {
  receiverAddress: '0x06C000F406AdD41462E4899Ff3A22312d7AACF46' as const,
  token: CCOP_TOKEN,
  network: celoMainnet,
}