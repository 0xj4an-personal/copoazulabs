/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/i18n/index.ts');

const nextConfig = withNextIntl({
  // Skip ESLint during build (we'll run it separately)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Bundle analyzer (optional)
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle size
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        '@react-native-async-storage/async-storage': false,
      };

      // Ignore React Native specific modules
      config.resolve.alias = {
        ...config.resolve.alias,
        '@react-native-async-storage/async-storage': false,
      };

      // Bundle optimization for Web3 libraries
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            web3: {
              test: /[\\/]node_modules[\\/](@celo|@reown|@tanstack|wagmi|viem|ethers)[\\/]/,
              name: 'web3',
              chunks: 'all',
              priority: 20,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
          },
        },
      };
    }

    // Ignore warnings for React Native modules
    config.ignoreWarnings = [
      /Module not found: Can't resolve '@react-native-async-storage\/async-storage'/,
      /Critical dependency: the request of a dependency is an expression/,
    ];

    return config;
  },

  // Environment variables
  env: {
    CUSTOM_APP_NAME: 'Copoazú Shop',
    CUSTOM_APP_DESCRIPTION: 'Web3 Fashion & Merchandise E-commerce Platform',
  },

  // Output configuration
  output: 'standalone',

  // Experimental features
  experimental: {
    scrollRestoration: true,
    optimizeCss: true,
    optimizeServerReact: true,
  },

  // Caching configuration
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // Performance headers
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/assets/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
});

module.exports = nextConfig;