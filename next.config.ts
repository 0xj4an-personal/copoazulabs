import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Optimized for Vercel deployment
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: ['localhost'],
    unoptimized: false,
  },
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Build optimizations
  output: 'standalone',
  
  // Fix workspace root warning
  outputFileTracingRoot: process.cwd(),
  
  // Webpack configuration for Reown AppKit
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default withNextIntl(nextConfig);
