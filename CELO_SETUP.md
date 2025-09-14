# 🌾 Celo Network Configuration

This document provides specific setup instructions for deploying Copoazú Labs on the Celo network. This project is built from scratch using the latest Celo Sepolia testnet.

## 🔧 Network Configuration

### Celo Mainnet (Production)
- **Chain ID**: 42220
- **RPC URL**: https://rpc.celocolombia.org
- **Explorer**: https://explorer.celo.org
- **Native Currency**: CELO

### Celo Sepolia Testnet (Development)
- **Chain ID**: 11142220
- **RPC URL**: https://sepolia-forno.celo-testnet.org
- **Explorer**: https://sepolia-blockscout.celo-testnet.org
- **Native Currency**: CELO
- **Foundation**: Built on Ethereum Sepolia

## 💰 Supported Tokens

### Celo Native Tokens
- **CELO** - Native currency
- **cUSD** - Celo Dollar (Stablecoin)
- **cEUR** - Celo Euro (Stablecoin)
- **cREAL** - Celo Real (Stablecoin)

## 🔐 Environment Variables for Celo

Create a `.env.local` file with the following configuration:

### For Development (Celo Sepolia)
```bash
# Application
NEXT_PUBLIC_APP_NAME="Copoazú Labs"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Celo Sepolia Testnet (Official Chain ID: 11142220)
NEXT_PUBLIC_CHAIN_ID="11142220"
NEXT_PUBLIC_RPC_URL="https://sepolia-forno.celo-testnet.org"

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
4. Connect wallet to Celo Sepolia testnet (Chain ID: 11142220)
5. Get testnet tokens from faucet

### 2. Vercel Deployment
1. Set environment variables in Vercel dashboard
2. Deploy from GitHub
3. Configure custom domain (optional)

### 3. Wallet Setup
Users need to:
1. Install MetaMask or Celo-compatible wallet
2. Add Celo network to their wallet
3. Get testnet tokens from faucet (for testing)

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

**Celo Sepolia:**
- Network Name: Celo Sepolia
- RPC URL: https://sepolia-forno.celo-testnet.org
- Chain ID: 11142220
- Currency Symbol: CELO
- Block Explorer: https://sepolia-blockscout.celo-testnet.org

## 💧 Getting Testnet Tokens

For Celo Sepolia testnet:
1. Visit the [Celo Sepolia Faucet](https://faucet.celo.org/)
2. Connect your wallet
3. Request testnet CELO and stablecoins
4. Use tokens for testing payments

## 🔍 Testing Payment Flow

1. Connect wallet to Celo Sepolia
2. Ensure you have testnet tokens
3. Navigate to products page
4. Add items to cart
5. Test crypto payment with CELO, cUSD, cEUR, or cREAL

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
- Sepolia: https://sepolia-blockscout.celo-testnet.org

### Celo Docs
- Official Documentation: https://docs.celo.org
- Developer Resources: https://developers.celo.org

## 🚨 Important Notes

1. **Testnet vs Mainnet**: Always test on Celo Sepolia before deploying to mainnet
2. **Gas Fees**: Celo has very low gas fees compared to Ethereum
3. **Stablecoins**: cUSD, cEUR, cREAL are algorithmic stablecoins
4. **Security**: Never share private keys or seed phrases
5. **Updates**: Keep wallet and dependencies updated
6. **Fresh State**: Celo Sepolia starts with a clean slate, perfect for new projects

## 🔗 Useful Links

- [Celo Foundation](https://celo.org/)
- [Celo Developer Portal](https://developers.celo.org/)
- [Celo Community](https://forum.celo.org/)
- [Celo Discord](https://discord.gg/celo)
- [Celo Twitter](https://twitter.com/CeloOrg)
