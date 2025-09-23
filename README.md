# 🛍️ Copoazú Shop - Web3 Fashion & Merchandise E-commerce

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A cutting-edge, fully responsive e-commerce platform for Web3 branded clothing and merchandise. Built with Next.js 15, TypeScript, Tailwind CSS, and modern Web3 integrations, featuring crypto payments, wallet connectivity, and decentralized commerce features.

## ✨ Key Features

### 🎨 **Modern Design System**
- **Custom Brand Palette**: Modern blue-based color scheme with cohesive design
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Dark Mode**: Seamless theme switching with proper hydration handling
- **Accessibility**: WCAG compliant with semantic HTML and ARIA support

### 🔗 **Web3 Integration**
- **Wallet Connection**: MetaMask and Web3 wallet support via AppKit/Reown
- **Crypto Payments**: Native cCOP token payments on Celo blockchain
- **ENS Support**: Ethereum Name Service integration
- **Decentralized Identity**: User ownership of data and transactions

### 🛍️ **E-commerce Features**
- **Product Catalog**: 18 Web3 merchandise items across 6 themed collections
- **Smart Filtering**: Server-side filtering with instant results
- **Shopping Cart**: Full cart functionality with persistent state
- **Collection System**: Gaming, ReFi, DeFi, Governance, Coding, and Degen collections
- **Search & Sort**: Advanced product discovery capabilities

### 🌐 **Internationalization**
- **Multi-language**: Complete English/Spanish support with next-intl
- **Localized Routing**: URL structure adapts to user language (`/en/products`, `/es/productos`)
- **Type-safe Translations**: Strongly typed translation keys
- **SSR Translations**: Server-side rendering with proper hydration

### ⚡ **Performance & Development**
- **Next.js 15**: Latest App Router with React Server Components
- **TypeScript**: Strict type checking with comprehensive type definitions
- **Modern Bundling**: Optimized builds with code splitting
- **Image Optimization**: WebP/AVIF support with Next.js Image component

## 🎨 Brand Color Palette

The design uses the modern Copoazú Labs color scheme:

### Primary Colors
- **🔵 Primary Blue**: `#3D7DD6` - Main brand color, primary actions
- **💧 Light Blue**: `#B4E2F9` - Accent and highlights
- **🌊 Background Blue**: `#F5F8FA` - Light background, page base

### Secondary Colors
- **⚡ Bright Blue**: `#1A49FF` - Call-to-action elements
- **🌌 Dark Navy**: `#1B1B2E` - Text and dark elements
- **💜 Purple Accent**: `#A5A0E4` - Special highlights

### Neutral Colors
- **🩶 Neutral Gray**: `#C6CED6` - Secondary elements, borders
- **🤍 Pure White**: `#FFFFFF` - Clean spaces, visual breathing room

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+
- **npm/yarn/pnpm** package manager
- **Git** for version control

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/0xj4an/copoazushop.git
cd copoazushop
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Start development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser:**
Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Alternative Development Options

If you encounter issues with the default development server:

```bash
# Run without turbopack
npx next dev --port 3000

# Use different port
npm run dev -- --port 3001
```

## 📁 Project Architecture

```
copoazushop/
├── 📁 src/
│   ├── 📁 app/                      # Next.js 15 App Router
│   │   ├── 📁 [locale]/             # Internationalized routes
│   │   │   ├── layout.tsx           # Locale layout with providers
│   │   │   ├── page.tsx             # Homepage with hero & features
│   │   │   ├── 📁 about/            # Company information
│   │   │   ├── 📁 products/         # Product catalog & search
│   │   │   ├── 📁 collections/      # Curated collections
│   │   │   └── 📁 checkout/         # Payment & order processing
│   │   ├── globals.css              # Global styles & CSS variables
│   │   ├── layout.tsx               # Root layout & metadata
│   │   └── page.tsx                 # Root redirect handler
│   ├── 📁 components/               # Reusable UI components (17 files)
│   │   ├── Header.tsx               # Navigation with mobile menu
│   │   ├── Footer.tsx               # Site footer with links
│   │   ├── ProductCard.tsx          # Product display component
│   │   ├── CartButton.tsx           # Cart with item count
│   │   ├── CartDrawer.tsx           # Slide-out cart interface
│   │   ├── WalletConnect.tsx        # Web3 wallet integration
│   │   ├── CryptoPayment.tsx        # Crypto payment interface
│   │   ├── CeloPayment.tsx          # Celo-specific payment flow
│   │   ├── ThemeToggle.tsx          # Dark/light mode switch
│   │   ├── LanguageSwitcher.tsx     # Language selection
│   │   ├── VerificationPopup.tsx    # Identity verification
│   │   └── ...                      # Additional UI components
│   ├── 📁 contexts/                 # React Context providers (4 files)
│   │   ├── CartContext.tsx          # Shopping cart state management
│   │   ├── ThemeContext.tsx         # Dark/light theme state
│   │   ├── VerificationContext.tsx  # User verification state
│   │   └── Web3Context.tsx          # Web3 wallet & blockchain state
│   ├── 📁 hooks/                    # Custom React hooks (3 files)
│   │   ├── useWallet.ts             # Wallet connection logic
│   │   ├── usePayment.ts            # Payment processing logic
│   │   └── useDivvi.ts              # Referral system integration
│   ├── 📁 data/                     # Static data & configurations
│   │   ├── products.ts              # Product catalog data
│   │   ├── collections.ts           # Collection definitions
│   │   └── ...                      # Additional data sources
│   ├── 📁 i18n/                     # Internationalization setup
│   │   └── config.ts                # Locale configuration
│   ├── 📁 messages/                 # Translation files
│   │   ├── en.json                  # English translations
│   │   └── es.json                  # Spanish translations
│   ├── 📁 config/                   # Configuration files
│   │   └── web3.ts                  # Web3 & blockchain config
│   └── 📁 types/                    # TypeScript type definitions
│       ├── index.ts                 # Core type exports
│       └── ...                      # Additional type definitions
├── 📁 public/                       # Static assets
│   ├── favicon.ico                  # Site favicon
│   ├── logo.svg                     # Company logo
│   └── assets/                      # Images, icons, etc.
├── 📄 tailwind.config.js            # Tailwind CSS configuration
├── 📄 next.config.js                # Next.js configuration
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 eslint.config.js              # ESLint configuration
├── 📄 package.json                  # Dependencies & scripts
└── 📄 README.md                     # Project documentation
```

## 🛠️ Technology Stack

### **Core Framework**
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library with concurrent features
- **[TypeScript 5.6](https://www.typescriptlang.org/)** - Type-safe development

### **Styling & UI**
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Inter Font](https://fonts.google.com/)** - Modern, readable typography

### **Web3 & Blockchain**
- **[@reown/appkit](https://github.com/WalletConnect/web3modal)** - Wallet connection interface
- **[wagmi](https://wagmi.sh/)** - React hooks for Ethereum
- **[viem](https://viem.sh/)** - TypeScript Ethereum client
- **[ethers.js](https://ethers.org/)** - Ethereum JavaScript library
- **[@celo/*](https://celo.org/)** - Celo blockchain integration

### **State Management**
- **React Context** - Built-in state management
- **[@tanstack/react-query](https://tanstack.com/query)** - Server state management
- **Custom Hooks** - Reusable stateful logic

### **Internationalization**
- **[next-intl](https://next-intl-docs.vercel.app/)** - Type-safe internationalization
- **Locale Routing** - Automatic URL localization
- **SSR Translations** - Server-side rendering support

### **Development Tools**
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting (configured)
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking

## 🌐 Web3 Features Deep Dive

### **Wallet Integration**
```typescript
// Example wallet connection
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const { address, isConnected } = useAccount();
const { connect, connectors } = useConnect();
const { disconnect } = useDisconnect();
```

### **Crypto Payment Flow**
1. **Wallet Connection** - Users connect their Web3 wallet
2. **Token Balance Check** - Verify cCOP token balance
3. **Transaction Approval** - Request user approval for payment
4. **Blockchain Transaction** - Execute payment on Celo network
5. **Confirmation** - Display transaction success with explorer link

### **Supported Wallets**
- MetaMask
- WalletConnect compatible wallets
- Coinbase Wallet
- Trust Wallet
- And more via AppKit/Reown integration

## 🎯 Page Structure & Features

### 🏠 **Homepage** (`/` → `/{locale}`)
**Purpose**: Convert visitors into customers with compelling value proposition
- **Hero Section**: Eye-catching banner with main call-to-action
- **Featured Products**: Showcase of best-selling items
- **Statistics**: Company metrics and social proof
- **Features Showcase**: Key platform benefits
- **Newsletter Signup**: Email collection for marketing

### 🛍️ **Products** (`/{locale}/products`)
**Purpose**: Comprehensive product discovery and browsing
- **Product Grid**: Clean, responsive product card layout
- **Advanced Search**: Real-time search with suggestions
- **Smart Filtering**: Category, price, and attribute filters
- **Sort Options**: Price, popularity, newest, rating
- **Pagination**: Efficient large catalog navigation
- **Quick Actions**: Add to cart, wishlist, quick view

### 📚 **Collections** (`/{locale}/collections`)
**Purpose**: Curated product experiences and themed browsing
- **6 Themed Collections**:
  - 🎮 **Gaming**: Esports and gaming culture merchandise
  - 🌱 **ReFi**: Regenerative Finance themed items
  - 💰 **DeFi**: Decentralized Finance community gear
  - 🏛️ **Governance**: DAO and governance participation wear
  - 💻 **Coding**: Developer and tech professional items
  - 🚀 **Degen**: Bold and experimental crypto culture
- **Collection Filtering**: Click to filter products by collection
- **Visual Storytelling**: Rich imagery and descriptions

### ℹ️ **About** (`/{locale}/about`)
**Purpose**: Build trust and communicate company values
- **Mission Statement**: Clear company purpose and vision
- **Core Values**: Innovation, Community, Sustainability, Transparency
- **Company Statistics**: Growth metrics and achievements
- **Team Showcase**: Leadership and key team members
- **Call-to-Action**: Join mission and connect with community

### 🛒 **Checkout** (`/{locale}/checkout`)
**Purpose**: Seamless payment experience with Web3 integration
- **Order Summary**: Clear breakdown of items and pricing
- **Payment Options**: Traditional and crypto payment methods
- **Web3 Integration**: Native blockchain payment flow
- **Order Confirmation**: Transaction success and tracking info

## 🎨 Design System & Components

### **Component Architecture**
```typescript
// Example component structure
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  showQuickView?: boolean;
  variant?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  showQuickView = true,
  variant = 'grid'
}) => {
  // Component implementation
};
```

### **State Management Pattern**
```typescript
// Context + Custom Hooks pattern
const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
```

### **Styling Approach**
- **CSS Variables**: Centralized color system
- **Tailwind Classes**: Utility-first styling
- **Responsive Design**: Mobile-first breakpoints
- **Dark Mode**: Automatic theme detection and manual toggle

## 🚀 Deployment & DevOps

### **Vercel (Recommended)**
```bash
# Deploy to Vercel
npm i -g vercel
vercel --prod
```

### **Build Optimization**
```bash
# Production build
npm run build

# Analyze bundle size
npm run build:analyze

# Start production server
npm start
```

### **Environment Variables**
```bash
# .env.local
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_CELO_RPC_URL=https://forno.celo.org
NEXT_PUBLIC_DIVVI_API_KEY=your_divvi_key
```

### **Performance Optimization**
- **Image Optimization**: WebP/AVIF with Next.js Image
- **Code Splitting**: Automatic route-based splitting
- **Font Optimization**: Google Fonts with display=swap
- **Bundle Analysis**: Size monitoring and optimization

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:turbo        # Start with Turbopack (experimental)

# Building
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # TypeScript type checking

# Utilities
npm run clean            # Clean build artifacts
npm run analyze          # Bundle size analysis
```

## 🧪 Testing & Quality Assurance

### **Manual Testing Checklist**
- [ ] **Responsive Design**: Test all breakpoints
- [ ] **Cross-browser**: Chrome, Firefox, Safari, Edge
- [ ] **Accessibility**: Screen reader compatibility
- [ ] **Performance**: Lighthouse scores > 90
- [ ] **Web3 Features**: Wallet connection and payments
- [ ] **Internationalization**: Both language versions

### **Code Quality Tools**
```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Format code (if Prettier is configured)
npm run format
```

## 🔧 Common Issues & Troubleshooting

### **Hydration Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Restart development server
npm run dev
```

### **Styling Issues**
```bash
# Clear all caches
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

### **Web3 Connection Problems**
1. Ensure MetaMask is installed and unlocked
2. Check wallet is connected to Celo network
3. Verify sufficient cCOP token balance
4. Clear browser cache and try again

### **Build Errors**
```bash
# Check TypeScript errors
npx tsc --noEmit

# Lint issues
npm run lint

# Dependency conflicts
npm ls
```

## 📊 Project Status & Roadmap

### ✅ **Completed Features**
- [x] **Core E-commerce**: Product catalog, search, filtering
- [x] **Web3 Integration**: Wallet connection, crypto payments
- [x] **Internationalization**: English/Spanish support
- [x] **Responsive Design**: Mobile-first, all devices
- [x] **Dark Mode**: Theme switching with persistence
- [x] **Brand Identity**: Complete design system implementation
- [x] **Collections System**: 6 themed collections with 18 products
- [x] **Shopping Cart**: Full cart functionality
- [x] **Performance**: Optimized builds and loading

### 🔄 **In Progress**
- [ ] **Testing Suite**: Unit and integration tests
- [ ] **Error Boundaries**: Robust error handling
- [ ] **Analytics**: User behavior tracking
- [ ] **SEO Optimization**: Schema markup and sitemaps

### 📋 **Future Enhancements**
- [ ] **User Accounts**: Registration and profiles
- [ ] **Order Management**: Order history and tracking
- [ ] **Reviews & Ratings**: Product review system
- [ ] **Wishlist**: Save items for later
- [ ] **Advanced Search**: AI-powered product discovery
- [ ] **Social Features**: Share products and collections
- [ ] **Mobile App**: React Native implementation
- [ ] **NFT Integration**: Limited edition NFT merchandise

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

### **Development Workflow**
1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes following our coding standards
5. **Test** your changes thoroughly
6. **Commit** with clear messages: `git commit -m 'feat: add amazing feature'`
7. **Push** to your fork: `git push origin feature/amazing-feature`
8. **Create** a Pull Request with detailed description

### **Coding Standards**
- **TypeScript**: All new code must be TypeScript
- **Naming**: Use camelCase for variables, PascalCase for components
- **Styling**: Follow Tailwind CSS patterns and brand colors
- **Comments**: Document complex logic and business rules
- **Testing**: Include tests for new features
- **Accessibility**: Ensure WCAG 2.1 compliance

### **Pull Request Guidelines**
- **Description**: Clear explanation of changes and motivation
- **Screenshots**: Visual changes must include before/after images
- **Testing**: Describe how changes were tested
- **Breaking Changes**: Clearly document any breaking changes
- **Documentation**: Update README and code comments as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Leading Web3 and fashion e-commerce platforms
- **Community**: Celo ecosystem and Web3 development community
- **Tools**: Amazing open-source projects that make this possible
- **Contributors**: Everyone who has helped improve this project

## 📞 Support & Community

### **Get Help**
- 📖 **Documentation**: This README and inline code comments
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/0xj4an/copoazushop/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/0xj4an/copoazushop/discussions)
- 📧 **Direct Contact**: [copoazulabs@gmail.com](mailto:copoazulabs@gmail.com)

### **Community Links**
- 🌐 **Website**: [copoazulabs.com](https://copoazulabs.com)
- 🐦 **Twitter**: [@copoazulabs](https://twitter.com/copoazulabs)
- 📷 **Instagram**: [@copoazulabs](https://instagram.com/copoazulabs)
- 💬 **Discord**: [Join our community](https://discord.gg/copoazulabs)

---

<div align="center">

**Built with ❤️ by [Copoazú Labs](https://github.com/0xj4an)**

*Pioneering the future of fashion through Web3 technology*

[![Follow @copoazulabs](https://img.shields.io/twitter/follow/copoazulabs?style=social)](https://twitter.com/copoazulabs)
[![Star this repo](https://img.shields.io/github/stars/0xj4an/copoazushop?style=social)](https://github.com/0xj4an/copoazushop)

</div>