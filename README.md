# 🌿 Copoazú Shop - Web3 Fashion Marketplace

> **A decentralized fashion marketplace built on Celo blockchain, featuring crypto payments, referral rewards, and Web3 merchandise.**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)](https://nextjs.org/)
[![Celo](https://img.shields.io/badge/Celo-Mainnet-35D07F)](https://celo.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC)](https://tailwindcss.com/)

---

## 📁 Project Structure

```
copoazushop/
├── 📄 README.md                    # This file - Project overview
├── 📁 docs/                        # 📚 Complete Documentation
│   ├── 📄 README.md               # Documentation navigation
│   ├── 📄 COMPONENTS.md           # Component documentation
│   ├── 📄 CONTRIBUTING.md         # Contributing guidelines
│   ├── 📁 environment/            # 🔧 Environment & Configuration
│   │   ├── 📄 ENV_SETUP.md        # Environment setup guide
│   │   ├── 📄 ENV_VARIABLES.md    # Complete variables reference
│   │   ├── 📄 production.env.example    # Production variables
│   │   ├── 📄 development.env.example  # Development variables
│   │   └── 📄 template.env.example      # Variables template
│   ├── 📁 setup/                  # ⚙️ Project Setup
│   │   ├── 📄 CELO_SETUP.md       # Celo blockchain setup
│   │   ├── 📄 DEPLOYMENT.md       # Deployment guide
│   │   └── 📄 I18N_SETUP.md       # Internationalization setup
│   └── 📁 integration/            # 🔗 Third-party Integrations
│       └── 📄 DIVVI_INTEGRATION.md # Divvi referral system
├── 📁 src/                        # 💻 Source Code
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 [locale]/           # Internationalized routes
│   │   │   ├── 📁 about/          # About page
│   │   │   ├── 📁 checkout/       # Checkout page
│   │   │   ├── 📁 collections/    # Collections page
│   │   │   ├── 📁 products/       # Products page
│   │   │   └── 📄 page.tsx        # Home page
│   │   ├── 📄 layout.tsx          # Root layout
│   │   ├── 📄 globals.css         # Global styles
│   │   ├── 📄 robots.ts           # SEO robots
│   │   └── 📄 sitemap.ts          # SEO sitemap
│   ├── 📁 components/             # 🧩 React Components
│   │   ├── 📄 CartButton.tsx      # Shopping cart button
│   │   ├── 📄 CartDrawer.tsx      # Cart sidebar
│   │   ├── 📄 CeloPayment.tsx     # Celo payment component
│   │   ├── 📄 CryptoPayment.tsx   # Crypto payment handler
│   │   ├── 📄 DivviStatus.tsx     # Divvi referral status
│   │   ├── 📄 Footer.tsx          # Site footer
│   │   ├── 📄 Header.tsx          # Site header
│   │   ├── 📄 ProductCard.tsx     # Product display card
│   │   ├── 📄 ThemeToggle.tsx     # Dark/light mode toggle
│   │   ├── 📄 VerificationButton.tsx    # Self verification
│   │   ├── 📄 VerificationPopup.tsx     # Verification modal
│   │   ├── 📄 VerificationStatus.tsx    # Verification status
│   │   └── 📄 WalletConnect.tsx   # Wallet connection
│   ├── 📁 config/                 # ⚙️ Configuration
│   │   └── 📄 web3.ts             # Web3 & WalletConnect config
│   ├── 📁 contexts/               # 🔄 React Contexts
│   │   ├── 📄 CartContext.tsx     # Shopping cart state
│   │   ├── 📄 ThemeContext.tsx    # Theme state
│   │   ├── 📄 VerificationContext.tsx   # Verification state
│   │   └── 📄 Web3Context.tsx     # Web3 state
│   ├── 📁 data/                   # 📊 Static Data
│   │   ├── 📄 collections.ts     # Product collections
│   │   ├── 📄 products.ts         # Product catalog
│   │   └── 📄 index.ts            # Data exports
│   ├── 📁 hooks/                  # 🎣 Custom Hooks
│   │   ├── 📄 useDivvi.ts         # Divvi referral integration
│   │   ├── 📄 usePayment.ts       # Payment processing
│   │   └── 📄 useWallet.ts        # Wallet management
│   ├── 📁 i18n/                   # 🌍 Internationalization
│   │   ├── 📄 config.ts           # i18n configuration
│   │   ├── 📄 index.ts            # i18n exports
│   │   └── 📄 request.ts          # i18n request handler
│   ├── 📁 lib/                    # 🛠️ Utilities
│   │   ├── 📄 constants.ts        # App constants
│   │   └── 📁 utils/              # Utility functions
│   │       ├── 📄 accessibility.ts    # A11y helpers
│   │       ├── 📄 cart-utils.ts       # Cart utilities
│   │       ├── 📄 format.ts           # Formatting helpers
│   │       └── 📄 validation.ts       # Validation helpers
│   ├── 📁 messages/               # 🌐 Translations
│   │   ├── 📄 en.json             # English translations
│   │   └── 📄 es.json             # Spanish translations
│   ├── 📁 types/                  # 📝 TypeScript Types
│   │   ├── 📄 cart.ts             # Cart types
│   │   ├── 📄 common.ts           # Common types
│   │   ├── 📄 ethereum.d.ts       # Ethereum types
│   │   ├── 📄 index.ts            # Type exports
│   │   ├── 📄 product.ts          # Product types
│   │   └── 📄 web3.ts             # Web3 types
│   └── 📄 middleware.ts           # Next.js middleware
├── 📁 public/                     # 🌐 Static Assets
│   ├── 📁 assets/                 # Images & Media
│   │   ├── 📁 collections/        # Collection images
│   │   └── 📁 products/           # Product images
│   ├── 📄 favicon.ico             # Site favicon
│   ├── 📄 manifest.json           # PWA manifest
│   └── 📄 farcaster-icon.svg     # Social icons
├── 📄 package.json                # Dependencies
├── 📄 next.config.js                # Next.js configuration
├── 📄 tailwind.config.js         # Tailwind CSS config
├── 📄 tsconfig.json              # TypeScript config
├── 📄 env.config.ts              # Environment configuration
└── 📄 vercel.json                # Vercel deployment config
```

---

## 🚀 Quick Start / Inicio Rápido

### English

#### Prerequisites
- Node.js 18+ 
- npm or yarn
- Celo-compatible wallet (MetaMask, Valora, etc.)

#### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/copoazushop.git
cd copoazushop

# Install dependencies
npm install

# Set up environment variables
cp docs/environment/development.env.example .env.local
# Edit .env.local with your actual values

# Start development server
npm run dev
```

#### Environment Setup
1. **Copy environment template**: `docs/environment/development.env.example` → `.env.local`
2. **Configure variables**: See `docs/environment/ENV_SETUP.md`
3. **Get CELO tokens**: Purchase from exchanges or use faucet
4. **Connect wallet**: Add Celo Mainnet to your wallet

### Español

#### Prerrequisitos
- Node.js 18+
- npm o yarn
- Wallet compatible con Celo (MetaMask, Valora, etc.)

#### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/copoazushop.git
cd copoazushop

# Instalar dependencias
npm install

# Configurar variables de entorno
cp docs/environment/development.env.example .env.local
# Editar .env.local con tus valores reales

# Iniciar servidor de desarrollo
npm run dev
```

#### Configuración del Entorno
1. **Copiar plantilla**: `docs/environment/development.env.example` → `.env.local`
2. **Configurar variables**: Ver `docs/environment/ENV_SETUP.md`
3. **Obtener tokens CELO**: Comprar en exchanges o usar faucet
4. **Conectar wallet**: Agregar Celo Mainnet a tu wallet

---

## 📚 Documentation / Documentación

### English

| Topic | Location | Description |
|-------|----------|-------------|
| **Environment Setup** | `docs/environment/` | Complete environment variables guide |
| **Celo Configuration** | `docs/setup/CELO_SETUP.md` | Celo blockchain setup |
| **Deployment** | `docs/setup/DEPLOYMENT.md` | Production deployment guide |
| **Components** | `docs/COMPONENTS.md` | Component documentation |
| **Divvi Integration** | `docs/integration/DIVVI_INTEGRATION.md` | Referral system setup |
| **Contributing** | `docs/CONTRIBUTING.md` | How to contribute |

### Español

| Tema | Ubicación | Descripción |
|------|-----------|-------------|
| **Configuración de Entorno** | `docs/environment/` | Guía completa de variables de entorno |
| **Configuración de Celo** | `docs/setup/CELO_SETUP.md` | Configuración de blockchain Celo |
| **Despliegue** | `docs/setup/DEPLOYMENT.md` | Guía de despliegue en producción |
| **Componentes** | `docs/COMPONENTS.md` | Documentación de componentes |
| **Integración Divvi** | `docs/integration/DIVVI_INTEGRATION.md` | Configuración del sistema de referidos |
| **Contribuir** | `docs/CONTRIBUTING.md` | Cómo contribuir |

---

## 🛠️ Tech Stack / Stack Tecnológico

### Core Technologies
- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript 5.6.0
- **Styling**: Tailwind CSS 3.4.0
- **Blockchain**: Celo Mainnet
- **Web3**: Wagmi + Viem
- **Wallet**: WalletConnect v2

### Key Features
- 🌐 **Internationalization**: English/Spanish support
- 🛒 **Shopping Cart**: Full e-commerce functionality
- 💳 **Crypto Payments**: CELO and cCOP support
- 🎁 **Referral System**: Divvi integration for rewards
- 🔐 **Self Verification**: Identity verification
- 📱 **Responsive**: Mobile-first design
- 🌙 **Dark Mode**: Theme switching

---

## 🔧 Development / Desarrollo

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run test         # Run tests
```

### Environment Variables
See `docs/environment/ENV_SETUP.md` for complete setup guide.

**Required Variables:**
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `NEXT_PUBLIC_CELO_RPC_URL`
- `NEXT_PUBLIC_DIVVI_CONSUMER_ADDRESS`

---

## 🌐 Deployment / Despliegue

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
See `docs/setup/DEPLOYMENT.md` for detailed instructions.

---

## 🤝 Contributing / Contribuir

We welcome contributions! Please see `docs/CONTRIBUTING.md` for guidelines.

¡Las contribuciones son bienvenidas! Por favor consulta `docs/CONTRIBUTING.md` para las pautas.

---

## 📄 License / Licencia

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## 🔗 Links / Enlaces

- **Live Demo**: [copoazushop.vercel.app](https://copoazushop.vercel.app)
- **Documentation**: `docs/README.md`
- **Celo Explorer**: [explorer.celo.org](https://explorer.celo.org)
- **Divvi Integration**: [divvi.xyz](https://divvi.xyz)

---

## 📞 Support / Soporte

- **Email**: support@copoazulabs.com
- **GitHub Issues**: [Create an issue](https://github.com/your-username/copoazushop/issues)
- **Documentation**: Check `docs/` folder for detailed guides

---

**Built with ❤️ by Copoazú Labs**