# 🌍 Environment Variables Configuration

This document describes all environment variables used in the Copoazú Labs Web3 Fashion Marketplace project.

## 📋 Quick Setup

1. **Copy the example file:**
   ```bash
   cp env.config.ts.example .env.local
   ```

2. **Fill in your actual values:**
   - Replace `YOUR_INFURA_KEY` with your Infura project ID
   - Replace `YOUR_WALLET_CONNECT_PROJECT_ID` with your WalletConnect project ID
   - Update social media URLs with your actual links

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

### Application Configuration
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_APP_NAME` | Application name | "Copoazú Labs" | No |
| `NEXT_PUBLIC_APP_DESCRIPTION` | Application description | "Web3 Fashion & Merchandise Marketplace" | No |
| `NEXT_PUBLIC_APP_URL` | Application URL | "http://localhost:3000" | Yes |
| `NEXT_PUBLIC_APP_VERSION` | Application version | "0.1.0" | No |

### Web3 Configuration - Celo Network
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_CHAIN_ID` | Blockchain chain ID | "42220" (Celo Mainnet) | No |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint URL | "https://rpc.celocolombia.org" | Yes |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | "" | Yes |

#### Celo Network Details:
- **Mainnet Chain ID**: 42220
- **Testnet Chain ID**: 11142220 (Celo Sepolia)
- **Mainnet RPC URL**: https://rpc.celocolombia.org
- **Testnet RPC URL**: https://sepolia-forno.celo-testnet.org
- **Mainnet Explorer**: https://explorer.celo.org
- **Testnet Explorer**: https://sepolia-blockscout.celo-testnet.org

**Note**: Celo Sepolia is the current developer testnet built on Ethereum Sepolia, perfect for new projects. See [official documentation](https://docs.celo.org/network/celo-sepolia).

### API Configuration
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | API base URL | "http://localhost:3000/api" | No |
| `NEXT_PUBLIC_API_TIMEOUT` | API timeout in ms | "10000" | No |

### Payment Configuration
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_PAYMENT_PROVIDER` | Payment provider | "stripe" | No |
| `NEXT_PUBLIC_CRYPTO_PAYMENTS_ENABLED` | Enable crypto payments | "true" | No |

### Analytics (Optional)
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Google Analytics ID | "" | No |
| `NEXT_PUBLIC_MIXPANEL_TOKEN` | Mixpanel token | "" | No |

### Feature Flags
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_ENABLE_WEB3` | Enable Web3 features | "true" | No |
| `NEXT_PUBLIC_ENABLE_CRYPTO_PAYMENTS` | Enable crypto payments | "true" | No |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Enable analytics | "false" | No |
| `NEXT_PUBLIC_ENABLE_DEBUG` | Enable debug mode | "true" | No |

### Social Media Links
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_TWITTER_URL` | Twitter profile URL | "https://twitter.com/copoazulabs" | No |
| `NEXT_PUBLIC_DISCORD_URL` | Discord server URL | "https://discord.gg/copoazulabs" | No |
| `NEXT_PUBLIC_TELEGRAM_URL` | Telegram channel URL | "https://t.me/copoazulabs" | No |
| `NEXT_PUBLIC_GITHUB_URL` | GitHub repository URL | "https://github.com/0xj4an" | No |

## 🚀 Deployment Configuration

### Vercel Deployment
When deploying to Vercel, add these environment variables in your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable with the appropriate value
4. Set the environment (Production, Preview, Development)

### Required for Production (Celo Mainnet):
```bash
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_CHAIN_ID=42220
NEXT_PUBLIC_RPC_URL=https://rpc.celocolombia.org
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NODE_ENV=production
```

### For Development (Celo Sepolia Testnet):
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CHAIN_ID=11142220
NEXT_PUBLIC_RPC_URL=https://sepolia-forno.celo-testnet.org
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NODE_ENV=development
```

## 🔒 Security Notes

- **Never commit `.env.local`** to version control
- **Use `NEXT_PUBLIC_` prefix** for client-side variables
- **Keep sensitive data** (API keys, secrets) in server-side variables only
- **Validate environment variables** on application startup

## 📝 Usage in Code

```typescript
import { env } from './env.config';

// Use environment variables
const appName = env.APP_NAME;
const isDevelopment = env.IS_DEVELOPMENT;
const apiUrl = env.API_BASE_URL;

// Feature flags
if (env.ENABLE_WEB3) {
  // Enable Web3 features
}

if (env.ENABLE_DEBUG) {
  console.log('Debug mode enabled');
}
```

## 🛠️ Development vs Production

### Development (.env.local)
```bash
NODE_ENV=development
NEXT_PUBLIC_ENABLE_DEBUG=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Production (Vercel Environment Variables)
```bash
NODE_ENV=production
NEXT_PUBLIC_ENABLE_DEBUG=false
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

## 🔍 Troubleshooting

### Common Issues:
1. **Variables not loading**: Restart your development server
2. **Build errors**: Check that all required variables are set
3. **Runtime errors**: Verify variable names and types

### Validation:
```typescript
import { validateEnvVars } from './env.config';

// Validate on app startup
if (!validateEnvVars()) {
  console.error('Missing required environment variables');
}
```
