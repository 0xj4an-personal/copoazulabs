/**
 * Application constants
 */

// App Configuration
export const APP_CONFIG = {
  name: 'Copoazú Shop',
  description: 'Web3 Fashion & Merchandise E-commerce Platform',
  version: '1.0.0',
  author: 'Copoazú Labs',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supportEmail: 'copoazulabs@gmail.com',
} as const;

// Theme Configuration
export const THEME_CONFIG = {
  defaultTheme: 'light',
  storageKey: 'copoazu-theme',
  colors: {
    brand: {
      primary: '#3D7DD6',
      light: '#B4E2F9',
      background: '#F5F8FA',
      neutral: '#C6CED6',
      accent: '#1A49FF',
      dark: '#1B1B2E',
      purple: '#A5A0E4',
      white: '#FFFFFF',
    },
  },
} as const;

// Internationalization
export const I18N_CONFIG = {
  defaultLocale: 'en',
  locales: ['en', 'es'],
  storageKey: 'copoazu-locale',
} as const;

// Cart Configuration
export const CART_CONFIG = {
  storageKey: 'cart',
  maxItems: 50,
  discountPercentage: 10,
  autoOpenOnAdd: true,
} as const;

// Product Configuration
export const PRODUCT_CONFIG = {
  defaultImagePlaceholder: '/images/product-placeholder.png',
  maxImagesPerProduct: 10,
  availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  defaultCategory: 'clothing',
  maxRating: 5,
  featuredLimit: 8,
} as const;

// Web3 Configuration
export const WEB3_CONFIG = {
  celo: {
    chainId: 42220,
    name: 'Celo Mainnet',
    rpcUrl: process.env.NEXT_PUBLIC_CELO_RPC_URL || 'https://forno.celo.org',
    explorerUrl: process.env.NEXT_PUBLIC_CELO_EXPLORER_URL || 'https://celoscan.io',
    currency: {
      name: 'Celo',
      symbol: 'CELO',
      decimals: 18,
    },
  },
  tokens: {
    cCOP: {
      address: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
      symbol: 'cCOP',
      name: 'Celo Colombian Peso',
      decimals: 18,
    },
  },
  walletConnect: {
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  },
} as const;

// API Configuration
export const API_CONFIG = {
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
  endpoints: {
    divvi: 'https://api.divvi.com',
  },
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  email: {
    maxLength: 254,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
  },
  wallet: {
    addressPattern: /^0x[a-fA-F0-9]{40}$/,
    transactionHashPattern: /^0x[a-fA-F0-9]{64}$/,
  },
  product: {
    nameMinLength: 2,
    nameMaxLength: 100,
    descriptionMaxLength: 1000,
    priceMin: 0,
    priceMax: 1000000,
  },
} as const;

// UI Configuration
export const UI_CONFIG = {
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  layout: {
    headerHeight: '80px',
    footerHeight: '200px',
    sidebarWidth: '280px',
    maxContentWidth: '1440px',
  },
} as const;

// SEO Configuration
export const SEO_CONFIG = {
  defaultTitle: 'Copoazú Shop - Web3 Fashion & Merchandise',
  titleTemplate: '%s | Copoazú Shop',
  defaultDescription: 'Discover unique fashion and merchandise in the Web3 ecosystem. Shop with cryptocurrency on Celo blockchain.',
  defaultKeywords: [
    'web3',
    'fashion',
    'merchandise',
    'celo',
    'cryptocurrency',
    'blockchain',
    'ecommerce',
    'copoazu',
  ],
  defaultImage: '/images/og-image.png',
  twitterHandle: '@copoazulabs',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  validation: 'Please check your input and try again.',
  unauthorized: 'You are not authorized to perform this action.',
  notFound: 'The requested resource was not found.',
  serverError: 'Server error. Please try again later.',
  walletConnection: 'Failed to connect wallet. Please try again.',
  transaction: 'Transaction failed. Please try again.',
  insufficientFunds: 'Insufficient funds for this transaction.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  itemAdded: 'Item added to cart successfully!',
  orderPlaced: 'Order placed successfully!',
  paymentCompleted: 'Payment completed successfully!',
  walletConnected: 'Wallet connected successfully!',
  profileUpdated: 'Profile updated successfully!',
  settingsSaved: 'Settings saved successfully!',
} as const;

// Routes
export const ROUTES = {
  home: '/',
  products: '/products',
  about: '/about',
  contact: '/contact',
  cart: '/cart',
  checkout: '/checkout',
  profile: '/profile',
  orders: '/orders',
  wishlist: '/wishlist',
  terms: '/terms',
  privacy: '/privacy',
  cookies: '/cookies',
} as const;

// External Links
export const EXTERNAL_LINKS = {
  github: 'https://github.com/0xj4an/copoazushop',
  discord: 'https://discord.gg/copoazu',
  twitter: 'https://twitter.com/copoazulabs',
  instagram: 'https://instagram.com/copoazulabs',
  linkedin: 'https://linkedin.com/company/copoazulabs',
  documentation: 'https://docs.copoazu.com',
  support: 'mailto:copoazulabs@gmail.com',
} as const;

// Feature Flags
export const FEATURES = {
  walletConnect: true,
  darkMode: true,
  internationalization: true,
  analytics: true,
  sentry: false,
  notifications: false,
  wishlist: false,
  reviews: false,
  chat: false,
} as const;