# 🌾 Celo Network Configuration

This document provides specific setup instructions for deploying Copoazú Labs on the Celo network. This project is configured for Celo Mainnet production.

## 🔧 Network Configuration

### Celo Mainnet (Production)
- **Chain ID**: 42220
- **RPC URL**: https://rpc.celocolombia.org
- **Explorer**: https://explorer.celo.org
- **Native Currency**: CELO

### Celo Mainnet (Production)
- **Chain ID**: 42220
- **RPC URL**: https://rpc.celocolombia.org
- **Explorer**: https://explorer.celo.org
- **Native Currency**: CELO
- **Foundation**: Celo Mainnet

## 💰 Supported Tokens

### Celo Native Tokens
- **CELO** - Native currency
- **cCOP** - Celo Colombian Peso (Stablecoin)

## 🔐 Environment Variables for Celo

Create a `.env.local` file with the following configuration:

### For Development (Celo Sepolia)
```bash
# Application
NEXT_PUBLIC_APP_NAME="Copoazú Labs"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Celo Mainnet (Official Chain ID: 42220)
NEXT_PUBLIC_CHAIN_ID="42220"
NEXT_PUBLIC_RPC_URL="https://rpc.celocolombia.org"

# WalletConnect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID="your_project_id"

# Features
NEXT_PUBLIC_ENABLE_WEB3="true"
NEXT_PUBLIC_ENABLE_CRYPTO_PAYMENTS="true"
```

### For Production (Celo Mainnet)
```bash
# Application
NEXT_PUBLIC_APP_NAME="Copoazú Labs"
NEXT_PUBLIC_APP_URL="https://your-app.vercel.app"

# Celo Mainnet
NEXT_PUBLIC_CHAIN_ID="42220"
NEXT_PUBLIC_RPC_URL="https://rpc.celocolombia.org"

# WalletConnect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID="your_project_id"

# Features
NEXT_PUBLIC_ENABLE_WEB3="true"
NEXT_PUBLIC_ENABLE_CRYPTO_PAYMENTS="true"
NODE_ENV="production"
```

## 🚀 Deployment Steps

### 1. Local Development
1. Copy environment variables to `.env.local`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Connect wallet to Celo Mainnet (Chain ID: 42220)
5. Ensure you have CELO tokens for transactions

### 2. Vercel Deployment
1. Set environment variables in Vercel dashboard
2. Deploy from GitHub
3. Configure custom domain (optional)

### 3. Wallet Setup
Users need to:
1. Install MetaMask or Celo-compatible wallet
2. Add Celo network to their wallet
3. Ensure you have CELO tokens for transactions

## 🌐 Adding Celo Network to MetaMask

### Automatic Network Addition
The application will automatically prompt users to add the Celo network when they connect their wallet.

### Manual Network Addition
Users can manually add Celo network:

**Celo Mainnet:**
- Network Name: Celo
- RPC URL: https://rpc.celocolombia.org
- Chain ID: 42220
- Currency Symbol: CELO
- Block Explorer: https://explorer.celo.org

**Celo Mainnet:**
- Network Name: Celo Mainnet
- RPC URL: https://rpc.celocolombia.org
- Chain ID: 42220
- Currency Symbol: CELO
- Block Explorer: https://explorer.celo.org

## 💰 Getting CELO Tokens

For Celo Mainnet:
1. Purchase CELO from exchanges like Coinbase, Binance, or KuCoin
2. Transfer CELO to your wallet
3. Use CELO for transactions and payments

## 🔍 Testing Payment Flow

1. Connect wallet to Celo Mainnet
2. Ensure you have CELO tokens
3. Navigate to products page
4. Add items to cart
5. Test crypto payment with cCOP

## 📱 Mobile Wallet Support

The application supports:
- **MetaMask Mobile**
- **Celo Wallet**
- **Valora**
- **Any WalletConnect-compatible wallet**

## 🛠️ Development Tools

### Celo CLI
Install Celo CLI for contract deployment:
```bash
npm install -g @celo/celo-cli
```

### Celo Explorer
- Mainnet: https://explorer.celo.org

### Celo Docs
- Official Documentation: https://docs.celo.org
- Developer Resources: https://developers.celo.org

## 🚨 Important Notes

1. **Testnet vs Mainnet**: Always test on Celo Sepolia before deploying to mainnet
2. **Gas Fees**: Celo has very low gas fees compared to Ethereum
3. **Stablecoins**: cCOP is an algorithmic stablecoin
4. **Security**: Never share private keys or seed phrases
5. **Updates**: Keep wallet and dependencies updated
6. **Fresh State**: Celo Sepolia starts with a clean slate, perfect for new projects

## 🔗 Useful Links

- [Celo Foundation](https://celo.org/)
- [Celo Developer Portal](https://developers.celo.org/)
- [Celo Community](https://forum.celo.org/)
- [Celo Discord](https://discord.gg/celo)
- [Celo Twitter](https://twitter.com/CeloOrg)
