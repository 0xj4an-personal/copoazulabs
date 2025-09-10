# 🌿 Copoazú Labs - Web3 Fashion & Merchandise

A modern, responsive e-commerce platform for Web3 branded clothing and merchandise. Built with Next.js 15, TypeScript, and inline CSS styling, featuring crypto payments and wallet integration.

## ✨ Features

- **🎨 Beautiful Design**: Custom Copoazú Labs color palette with modern UI/UX
- **🔗 Web3 Integration**: Wallet connection and crypto payment options
- **📱 Responsive**: Mobile-first design that works on all devices
- **🛍️ E-commerce**: Product catalog, search, filtering, and shopping cart
- **⚡ Fast**: Built with Next.js 15 and optimized for performance
- **🎯 TypeScript**: Full type safety and better developer experience
- **🎨 Inline Styling**: Consistent styling using inline CSS for reliability
- **🌐 Multi-page**: Complete website with Home, About, Products, and Collections pages

## 🎨 Color Palette

The design uses the exclusive Copoazú Labs color scheme:

### Primary Colors
- **🍫 Cáscara Marrón**: `#4B2E1E` - Brand identity, strong and elegant
- **🥥 Pulpa Crema**: `#F5F1E7` - Light background, clean base
- **🌱 Verde Selva**: `#3E7C4A` - Natural green, vitality

### Secondary Colors
- **🌼 Amarillo Amazónico**: `#E6B450` - Warm accent, energy
- **🌸 Rosa Fruto Tropical**: `#D88FA0` - Modern detail, vibrant

### Neutral Colors
- **🖤 Negro Suave**: `#1C1C1C` - Main text, strong contrasts
- **🩶 Gris Ceniza**: `#9A9A9A` - Secondary text, borders
- **🤍 Blanco**: `#FFFFFF` - Clean spaces, visual breathing room

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/0xj4an/web3-clothing-page.git
cd web3-clothing-page
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Alternative Development Server

If you encounter issues with the default development server, try running without turbopack:

```bash
npx next dev --port 3000
```

### Troubleshooting

If you experience styling issues or build errors:

1. Clear the cache and reinstall dependencies:
```bash
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

2. Check that all pages are accessible:
- Homepage: [http://localhost:3000](http://localhost:3000)
- Products: [http://localhost:3000/products](http://localhost:3000/products)
- Collections: [http://localhost:3000/collections](http://localhost:3000/collections)
- About: [http://localhost:3000/about](http://localhost:3000/about)

## 📁 Project Structure

```
web3-clothing-page/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles and color variables
│   │   ├── layout.tsx         # Root layout component
│   │   ├── page.tsx           # Homepage
│   │   ├── about/             # About page
│   │   │   └── page.tsx       # About page component
│   │   ├── products/          # Products page
│   │   │   └── page.tsx       # Products page component
│   │   └── collections/       # Collections page
│   │       └── page.tsx       # Collections page component
│   └── components/            # Reusable components
│       ├── Header.tsx         # Navigation header with mobile menu
│       ├── Footer.tsx         # Site footer with links
│       ├── ProductCard.tsx    # Product display card
│       ├── WalletConnect.tsx  # Web3 wallet connection
│       └── CryptoPayment.tsx  # Crypto payment component
├── public/                    # Static assets
│   ├── favicon.ico           # Site favicon
│   └── *.svg                 # SVG icons
├── tailwind.config.js        # Tailwind CSS configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## 🛠️ Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Inline CSS + Tailwind CSS (for configuration)
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)
- **Package Manager**: npm
- **Development**: Hot reload with Next.js dev server

## 🌐 Web3 Features

- **Wallet Connection**: Connect MetaMask and other Web3 wallets
- **Crypto Payments**: Pay with ETH, BTC, USDC, and other cryptocurrencies
- **Blockchain Security**: Secure transactions using blockchain technology
- **Decentralized Identity**: User ownership of data and transactions

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## 🎯 Key Pages

### 🏠 Homepage (`/`)
- Hero section with compelling call-to-action
- Featured products showcase
- Company statistics and social proof
- Feature highlights (Lightning Fast, Secure & Private, Community Driven)
- Call-to-action for wallet connection

### 🛍️ Products (`/products`)
- Complete product catalog with 8+ Web3 merchandise items
- Advanced search and filtering capabilities
- Category filtering (Hoodies, T-Shirts, Accessories, etc.)
- Sort options (Newest, Price, Rating)
- Grid and list view modes
- Product cards with ratings, prices, and quick actions

### 📚 Collections (`/collections`)
- Curated product collections
- Featured collections showcase
- Collection filtering and browsing
- Interactive collection cards
- Create collection call-to-action

### ℹ️ About (`/about`)
- Company mission and vision
- Core values (Innovation, Transparency, Community)
- Team member profiles
- Company statistics and goals
- Join mission call-to-action

## 🎨 Design System

### Styling Approach
The project uses **inline CSS styling** for maximum reliability and consistency:

- **Inline Styles**: All components use React inline styles for guaranteed rendering
- **Color Variables**: CSS custom properties defined in `globals.css`
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Consistent Spacing**: Standardized padding, margins, and gaps
- **Typography**: Inter font family with consistent sizing scale

### Component Architecture
- **Reusable Components**: Modular design with shared components
- **TypeScript Interfaces**: Strong typing for all props and data structures
- **State Management**: React hooks for local state management
- **Event Handling**: Proper event handling for user interactions

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click
4. Your site will be available at `https://your-project.vercel.app`

### Build for Production
```bash
npm run build
npm start
```

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- **Netlify**: Connect GitHub repo and deploy
- **AWS Amplify**: Full-stack deployment with CI/CD
- **Railway**: Simple deployment with automatic builds
- **DigitalOcean App Platform**: Managed hosting solution

## 🔧 Development Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type checking
npx tsc --noEmit
```

## 🐛 Common Issues & Solutions

### Styling Not Loading
If styles appear broken or not loading:
1. Clear browser cache
2. Restart development server
3. Check console for CSS errors
4. Verify inline styles are properly formatted

### Build Errors
If you encounter build errors:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` to reinstall dependencies
3. Clear Next.js cache: `rm -rf .next`
4. Try building again: `npm run build`

### Port Already in Use
If port 3000 is already in use:
```bash
npx next dev --port 3001
# or
npm run dev -- --port 3001
```

## 📊 Project Status

✅ **Completed Features:**
- [x] Homepage with hero section and featured products
- [x] Products page with search and filtering
- [x] Collections page with interactive browsing
- [x] About page with company information
- [x] Responsive design for all screen sizes
- [x] Web3 wallet connection component
- [x] Crypto payment integration
- [x] Consistent Copoazú Labs branding
- [x] Inline CSS styling for reliability

🔄 **In Progress:**
- [ ] Shopping cart functionality
- [ ] User authentication system
- [ ] Order management system
- [ ] Payment processing integration

📋 **Future Enhancements:**
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Newsletter subscription
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Mobile app development

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following the existing code style
4. **Test your changes** thoroughly
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request** with a clear description

### Development Guidelines
- Use TypeScript for all new components
- Follow the existing inline CSS styling approach
- Maintain the Copoazú Labs color palette
- Write clear, descriptive commit messages
- Test on multiple screen sizes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern Web3 and fashion brands
- **Color Palette**: Inspired by tropical and natural elements
- **Icons**: Provided by [Lucide](https://lucide.dev)
- **Fonts**: [Google Fonts](https://fonts.google.com) - Inter font family
- **Framework**: Built with [Next.js](https://nextjs.org)
- **Icons**: [Lucide React](https://lucide.dev) icon library

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Common Issues & Solutions](#-common-issues--solutions) section
2. Search existing [GitHub Issues](https://github.com/0xj4an/web3-clothing-page/issues)
3. Create a new issue with detailed information
4. Contact the development team

---

**Built with ❤️ by [Copoazú Labs](https://github.com/0xj4an)**

*Pioneering the future of fashion through Web3 technology*
