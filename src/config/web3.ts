// Web3 Configuration with Reown AppKit
import { createStorage, cookieStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { celo } from 'viem/chains'
import { envConfig } from '../../env.config'

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
export const projectId = envConfig.blockchain.walletConnectProjectId || 'demo-project-id'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Convert to AppKitNetwork format
export const networks = [
  {
    id: celoMainnet.id,
    name: celoMainnet.name,
    rpcUrl: celoMainnet.rpcUrls.default.http[0],
    blockExplorerUrl: celoMainnet.blockExplorers.default.url,
    nativeCurrency: celoMainnet.nativeCurrency,
    chainId: celoMainnet.id,
  }
] as any

// Wagmi adapter configuration with proper SSR support
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks: [celoMainnet]
})

export const config = wagmiAdapter.wagmiConfig

// Set up metadata
export const metadata = {
  name: 'Copoazú Labs',
  description: 'Web3 Fashion & Merchandise Marketplace - Colombian Crypto Fashion',
  url: envConfig.app.url,
  icons: [`${envConfig.app.url}/favicon.ico`]
}

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