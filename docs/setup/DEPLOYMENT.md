# 🚀 Deployment Guide

This guide covers deployment options, configuration, and best practices for the Copoazú Shop application.

## 📋 Table of Contents

- [Environment Setup](#environment-setup)
- [Build Process](#build-process)
- [Deployment Platforms](#deployment-platforms)
- [Environment Variables](#environment-variables)
- [Performance Optimization](#performance-optimization)
- [Monitoring & Analytics](#monitoring--analytics)
- [Security Considerations](#security-considerations)

## Environment Setup

### Prerequisites

Before deployment, ensure you have:

- Node.js 18+ installed
- Package manager (npm, yarn, or pnpm)
- Git repository access
- Environment variables configured
- Domain name (for production)

### Local Development

```bash
# Clone repository
git clone https://github.com/0xj4an/copoazushop.git
cd copoazushop

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Production Build

```bash
# Create optimized production build
npm run build

# Test production build locally
npm start

# Check build output
npm run build && ls -la .next/
```

## Build Process

### Build Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

### Build Optimization

The application includes several optimizations:

1. **Next.js Optimizations**:
   - Automatic code splitting
   - Image optimization (WebP/AVIF)
   - Font optimization
   - Bundle analysis

2. **TypeScript**:
   - Strict type checking
   - Build-time error detection

3. **Tailwind CSS**:
   - Unused style purging
   - CSS optimization

### Build Output

```
.next/
├── cache/              # Build cache
├── server/             # Server-side code
├── static/             # Static assets
└── standalone/         # Standalone deployment files
```

## Deployment Platforms

### Vercel (Recommended)

**Why Vercel:**
- Optimized for Next.js
- Automatic deployments
- Edge network
- Serverless functions
- Built-in analytics

**Setup:**

1. **Connect Repository**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy from command line
   vercel --prod
   ```

2. **Configure via Dashboard**:
   - Connect GitHub repository
   - Set environment variables
   - Configure domain
   - Enable analytics

3. **Automatic Deployments**:
   - Main branch → Production
   - Feature branches → Preview deployments

**Configuration (`vercel.json`)**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "pages/api/**/*.ts": {
      "runtime": "@vercel/node"
    }
  }
}
```

### Netlify

**Setup:**

1. **Connect Repository**:
   - Link GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`

2. **Configuration (`netlify.toml`)**:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [build.environment]
     NODE_VERSION = "18"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### AWS Amplify

**Setup:**

1. **Create Amplify App**:
   ```bash
   # Install Amplify CLI
   npm install -g @aws-amplify/cli

   # Initialize project
   amplify init

   # Add hosting
   amplify add hosting

   # Deploy
   amplify publish
   ```

2. **Build Configuration**:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

### Docker Deployment

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  copoazu-shop:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=${WALLETCONNECT_PROJECT_ID}
    restart: unless-stopped
```

## Environment Variables

### Required Variables

```bash
# .env.local (development)
# .env.production (production)

# Web3 Configuration
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_CELO_RPC_URL=https://forno.celo.org
NEXT_PUBLIC_CELO_EXPLORER_URL=https://celoscan.io

# Application Configuration
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_SITE_NAME="Copoazú Shop"

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id

# Monitoring (Optional)
SENTRY_DSN=your_sentry_dsn
SENTRY_ORG=your_org
SENTRY_PROJECT=your_project

# API Keys (Optional)
NEXT_PUBLIC_DIVVI_API_KEY=your_divvi_key
```

### Platform-Specific Setup

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add each variable for Production/Preview/Development
3. Redeploy if needed

**Netlify:**
1. Go to Site Settings → Environment Variables
2. Add key-value pairs
3. Redeploy site

**AWS Amplify:**
1. Go to App Settings → Environment Variables
2. Add variables for each environment
3. Redeploy app

### Variable Types

```typescript
// Environment variable types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string;
      NEXT_PUBLIC_CELO_RPC_URL: string;
      NEXT_PUBLIC_APP_URL: string;
      SENTRY_DSN?: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}
```

## Performance Optimization

### Build Optimizations

1. **Bundle Analysis**:
   ```bash
   # Analyze bundle size
   npm install -D @next/bundle-analyzer

   # Add to next.config.js
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   });

   # Run analysis
   ANALYZE=true npm run build
   ```

2. **Image Optimization**:
   ```javascript
   // next.config.js
   module.exports = {
     images: {
       formats: ['image/webp', 'image/avif'],
       domains: ['example.com'],
       deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
     }
   };
   ```

3. **Code Splitting**:
   ```typescript
   // Dynamic imports for heavy components
   const CryptoPayment = dynamic(() => import('@/components/CryptoPayment'), {
     loading: () => <PaymentSkeleton />,
     ssr: false
   });
   ```

### Runtime Optimizations

1. **Caching Strategy**:
   ```javascript
   // next.config.js
   module.exports = {
     async headers() {
       return [
         {
           source: '/assets/(.*)',
           headers: [
             {
               key: 'Cache-Control',
               value: 'public, max-age=31536000, immutable',
             },
           ],
         },
       ];
     },
   };
   ```

2. **Service Worker** (Optional):
   ```javascript
   // Register service worker
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/sw.js');
   }
   ```

### Core Web Vitals

Monitor and optimize:

- **LCP (Largest Contentful Paint)** < 2.5s
- **FID (First Input Delay)** < 100ms
- **CLS (Cumulative Layout Shift)** < 0.1

```typescript
// Web Vitals reporting
export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    // Send to analytics
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_label: metric.id,
    });
  }
}
```

## Monitoring & Analytics

### Error Tracking with Sentry

1. **Installation**:
   ```bash
   npm install @sentry/nextjs
   ```

2. **Configuration**:
   ```javascript
   // sentry.client.config.ts
   import * as Sentry from '@sentry/nextjs';

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     tracesSampleRate: 1.0,
   });
   ```

3. **Error Boundaries**:
   ```typescript
   import { withErrorBoundary } from '@sentry/react';

   export default withErrorBoundary(MyComponent, {
     fallback: ErrorFallback,
   });
   ```

### Analytics

1. **Google Analytics 4**:
   ```typescript
   // lib/gtag.ts
   export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

   export const pageview = (url: string) => {
     window.gtag('config', GA_TRACKING_ID, {
       page_path: url,
     });
   };
   ```

2. **Custom Events**:
   ```typescript
   // Track add to cart
   const trackAddToCart = (product: Product) => {
     gtag('event', 'add_to_cart', {
       currency: 'USD',
       value: product.price,
       items: [product]
     });
   };
   ```

### Performance Monitoring

1. **Lighthouse CI**:
   ```yaml
   # .github/workflows/lighthouse.yml
   name: Lighthouse CI
   on: [push]
   jobs:
     lhci:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
         - run: npm install && npm run build
         - run: npx @lhci/cli@0.12.x autorun
   ```

2. **Real User Monitoring**:
   ```typescript
   // Track performance metrics
   import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

   getCLS(console.log);
   getFID(console.log);
   getFCP(console.log);
   getLCP(console.log);
   getTTFB(console.log);
   ```

## Security Considerations

### Content Security Policy

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com;
      style-src 'self' 'unsafe-inline' *.googleapis.com;
      img-src 'self' blob: data: *.githubusercontent.com;
      font-src 'self' *.gstatic.com;
      connect-src 'self' *.celo.org *.walletconnect.org;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      }
    ];
  }
};
```

### Environment Security

1. **Secrets Management**:
   - Never commit secrets to git
   - Use platform environment variables
   - Rotate keys regularly
   - Use different keys per environment

2. **API Security**:
   ```typescript
   // Validate environment variables
   const requiredEnvVars = [
     'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID',
     'NEXT_PUBLIC_CELO_RPC_URL'
   ];

   requiredEnvVars.forEach((envVar) => {
     if (!process.env[envVar]) {
       throw new Error(`Missing required environment variable: ${envVar}`);
     }
   });
   ```

### Web3 Security

1. **RPC Endpoints**:
   - Use official RPC endpoints
   - Implement rate limiting
   - Monitor for unusual activity

2. **Smart Contract Interaction**:
   ```typescript
   // Validate contract addresses
   const VALID_CONTRACTS = {
     cCOP: '0x765DE816845861e75A25fCA122bb6898B8B1282a'
   };

   const validateContract = (address: string) => {
     return Object.values(VALID_CONTRACTS).includes(address);
   };
   ```

## Deployment Checklist

### Pre-Deployment

- [ ] Run `npm run build` successfully
- [ ] Test production build locally
- [ ] Verify all environment variables are set
- [ ] Run TypeScript checks: `npx tsc --noEmit`
- [ ] Run linting: `npm run lint`
- [ ] Test Web3 functionality
- [ ] Verify responsive design
- [ ] Check accessibility compliance
- [ ] Test internationalization

### Post-Deployment

- [ ] Verify site loads correctly
- [ ] Test all major user flows
- [ ] Check Web3 wallet connections
- [ ] Verify analytics tracking
- [ ] Test form submissions
- [ ] Check error pages (404, 500)
- [ ] Verify SEO meta tags
- [ ] Test performance with Lighthouse
- [ ] Monitor error logs

### Production Monitoring

- [ ] Set up uptime monitoring
- [ ] Configure error alerting
- [ ] Monitor performance metrics
- [ ] Track user analytics
- [ ] Monitor server resources
- [ ] Check security headers
- [ ] Verify SSL certificate
- [ ] Monitor Core Web Vitals

## Troubleshooting

### Common Deployment Issues

1. **Build Failures**:
   ```bash
   # Clear cache and rebuild
   rm -rf .next node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Environment Variable Issues**:
   ```bash
   # Check if variables are accessible
   console.log('Environment variables:', {
     walletConnect: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
     celoRpc: process.env.NEXT_PUBLIC_CELO_RPC_URL
   });
   ```

3. **Hydration Errors**:
   - Ensure client/server rendering consistency
   - Check for browser-only code in SSR
   - Verify theme detection logic

4. **Web3 Connection Issues**:
   - Verify WalletConnect project ID
   - Check network configuration
   - Test with different wallets

### Rollback Procedures

1. **Vercel Rollback**:
   ```bash
   # Promote previous deployment
   vercel --prod --force
   ```

2. **Git Rollback**:
   ```bash
   # Revert to previous commit
   git revert HEAD
   git push origin main
   ```

---

This deployment guide provides comprehensive information for deploying the Copoazú Shop application across various platforms with optimal performance and security.