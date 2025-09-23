# 🧩 Component Documentation

This document provides detailed information about all components in the Copoazú Shop application.

## 📋 Table of Contents

- [Layout Components](#layout-components)
- [UI Components](#ui-components)
- [Feature Components](#feature-components)
- [Web3 Components](#web3-components)
- [Context Providers](#context-providers)
- [Custom Hooks](#custom-hooks)

## Layout Components

### Header
**Location**: `src/components/Header.tsx`

Main navigation header with responsive mobile menu.

**Props**:
```typescript
interface HeaderProps {
  // No props required
}
```

**Features**:
- Responsive navigation menu
- Mobile hamburger menu
- Logo and brand identity
- Language switcher integration
- Theme toggle integration
- Wallet connection button
- Cart button with item count

**Usage**:
```tsx
import Header from '@/components/Header';

<Header />
```

### Footer
**Location**: `src/components/Footer.tsx`

Site footer with links and company information.

**Props**:
```typescript
interface FooterProps {
  // No props required
}
```

**Features**:
- Company information and logo
- Social media links
- Quick navigation links
- Support links
- Legal links (Privacy, Terms, Cookies)

**Usage**:
```tsx
import Footer from '@/components/Footer';

<Footer />
```

## UI Components

### ThemeToggle
**Location**: `src/components/ThemeToggle.tsx`

Toggle button for switching between light and dark themes.

**Props**:
```typescript
interface ThemeToggleProps {
  // No props required
}
```

**Features**:
- Visual theme switching
- Persistent theme preference
- Smooth transitions
- Accessible keyboard navigation

**Usage**:
```tsx
import ThemeToggle from '@/components/ThemeToggle';

<ThemeToggle />
```

### LanguageSwitcher
**Location**: `src/components/LanguageSwitcher.tsx`

Dropdown for selecting application language.

**Props**:
```typescript
interface LanguageSwitcherProps {
  // No props required
}
```

**Features**:
- English/Spanish language switching
- Flag icons for visual identification
- Persistent language preference
- URL localization
- Dropdown interface

**Usage**:
```tsx
import LanguageSwitcher from '@/components/LanguageSwitcher';

<LanguageSwitcher />
```

### Logo
**Location**: `src/components/Logo.tsx`

Company logo component with fallback handling.

**Props**:
```typescript
interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}
```

**Features**:
- SVG logo rendering
- Fallback loading state
- Customizable dimensions
- Responsive behavior

**Usage**:
```tsx
import Logo from '@/components/Logo';

<Logo width={80} height={80} className="mx-auto" />
```

## Feature Components

### ProductCard
**Location**: `src/components/ProductCard.tsx`

Card component for displaying product information.

**Props**:
```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  showActions?: boolean;
  variant?: 'grid' | 'list';
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  collection: string;
  rating: number;
  reviews: number;
  sizes: string[];
  description: string;
}
```

**Features**:
- Product image with fallback
- Product information display
- Rating and review display
- Add to cart functionality
- Size selection
- Responsive grid/list layouts
- Hover effects and animations

**Usage**:
```tsx
import ProductCard from '@/components/ProductCard';

<ProductCard
  product={product}
  onAddToCart={handleAddToCart}
  showActions={true}
  variant="grid"
/>
```

### CartButton
**Location**: `src/components/CartButton.tsx`

Shopping cart button with item count badge.

**Props**:
```typescript
interface CartButtonProps {
  style?: React.CSSProperties;
}
```

**Features**:
- Item count badge
- Cart drawer toggle
- Responsive design
- Accessibility features

**Usage**:
```tsx
import CartButton from '@/components/CartButton';

<CartButton />
```

### CartDrawer
**Location**: `src/components/CartDrawer.tsx`

Slide-out drawer showing cart contents.

**Props**:
```typescript
interface CartDrawerProps {
  // No props required - uses CartContext
}
```

**Features**:
- Cart items display
- Quantity controls
- Remove item functionality
- Total calculation
- Checkout navigation
- Responsive overlay

**Usage**:
```tsx
import CartDrawer from '@/components/CartDrawer';

<CartDrawer />
```

## Web3 Components

### WalletConnect
**Location**: `src/components/WalletConnect.tsx`

Web3 wallet connection interface.

**Props**:
```typescript
interface WalletConnectProps {
  // No props required - uses Web3Context
}
```

**Features**:
- Multiple wallet support
- Connection status display
- Account information
- Disconnect functionality
- Error handling

**Usage**:
```tsx
import WalletConnect from '@/components/WalletConnect';

<WalletConnect />
```

### CryptoPayment
**Location**: `src/components/CryptoPayment.tsx`

Generic crypto payment interface.

**Props**:
```typescript
interface CryptoPaymentProps {
  amount: number;
  onPaymentComplete?: (method: string) => void;
}
```

**Features**:
- Payment method selection
- Amount display
- Transaction processing
- Success/error handling

**Usage**:
```tsx
import CryptoPayment from '@/components/CryptoPayment';

<CryptoPayment
  amount={totalAmount}
  onPaymentComplete={handlePaymentSuccess}
/>
```

### CeloPayment
**Location**: `src/components/CeloPayment.tsx`

Celo-specific payment implementation.

**Props**:
```typescript
interface CeloPaymentProps {
  totalPrice: number;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
}
```

**Features**:
- cCOP token payments
- Balance checking
- Transaction confirmation
- Celo Explorer integration
- Real-time status updates

**Usage**:
```tsx
import CeloPayment from '@/components/CeloPayment';

<CeloPayment
  totalPrice={amount}
  onPaymentSuccess={handleSuccess}
  onPaymentError={handleError}
/>
```

### VerificationPopup
**Location**: `src/components/VerificationPopup.tsx`

Identity verification modal.

**Props**:
```typescript
interface VerificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Features**:
- Multi-step verification process
- Progress indication
- Success/error states
- Modal overlay
- Responsive design

**Usage**:
```tsx
import VerificationPopup from '@/components/VerificationPopup';

<VerificationPopup
  isOpen={showVerification}
  onClose={() => setShowVerification(false)}
/>
```

### VerificationButton
**Location**: `src/components/VerificationButton.tsx`

Button to trigger identity verification.

**Props**:
```typescript
interface VerificationButtonProps {
  className?: string;
}
```

**Features**:
- Verification status display
- Click handling
- Loading states
- Accessible design

**Usage**:
```tsx
import VerificationButton from '@/components/VerificationButton';

<VerificationButton className="custom-class" />
```

## Context Providers

### CartContext
**Location**: `src/contexts/CartContext.tsx`

Global shopping cart state management.

**State**:
```typescript
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}
```

**Actions**:
```typescript
interface CartContextType {
  state: CartState;
  addItem: (product: Product, size?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
}
```

**Usage**:
```tsx
import { useCart } from '@/contexts/CartContext';

const { state, addItem, removeItem, toggleCart } = useCart();
```

### ThemeContext
**Location**: `src/contexts/ThemeContext.tsx`

Theme (dark/light mode) state management.

**State**:
```typescript
interface ThemeContextType {
  isDark: boolean;
  toggle: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}
```

**Usage**:
```tsx
import { useTheme } from '@/contexts/ThemeContext';

const { isDark, toggle, setTheme } = useTheme();
```

### VerificationContext
**Location**: `src/contexts/VerificationContext.tsx`

User verification state management.

**State**:
```typescript
interface VerificationContextType {
  isVerified: boolean;
  isVerifying: boolean;
  verificationStatus: 'idle' | 'pending' | 'success' | 'error';
  startVerification: () => void;
  completeVerification: () => void;
  resetVerification: () => void;
}
```

**Usage**:
```tsx
import { useVerification } from '@/contexts/VerificationContext';

const { isVerified, startVerification } = useVerification();
```

### Web3Context
**Location**: `src/contexts/Web3Context.tsx`

Web3 wallet and blockchain state management.

**State**:
```typescript
interface Web3ContextType {
  isConnected: boolean;
  address?: string;
  balance?: string;
  chainId?: number;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchChain: (chainId: number) => Promise<void>;
}
```

**Usage**:
```tsx
import { useWeb3 } from '@/contexts/Web3Context';

const { isConnected, address, connect, disconnect } = useWeb3();
```

## Custom Hooks

### useWallet
**Location**: `src/hooks/useWallet.ts`

Hook for wallet connection and balance management.

**Returns**:
```typescript
interface UseWalletReturn {
  isConnected: boolean;
  address?: string;
  ccopBalance: string;
  connect: () => Promise<void>;
  disconnect: () => void;
  refreshBalance: () => Promise<void>;
}
```

**Usage**:
```tsx
import { useWallet } from '@/hooks/useWallet';

const { isConnected, ccopBalance, connect } = useWallet();
```

### usePayment
**Location**: `src/hooks/usePayment.ts`

Hook for cryptocurrency payment processing.

**Returns**:
```typescript
interface UsePaymentReturn {
  isProcessing: boolean;
  paymentStatus: 'idle' | 'pending' | 'success' | 'error';
  txHash?: string;
  error?: string;
  isConfirming: boolean;
  payWithCCOP: (amount: number) => Promise<void>;
  getExplorerUrl: (txHash: string) => string;
  formatAmount: (amount: number) => string;
}
```

**Usage**:
```tsx
import { usePayment } from '@/hooks/usePayment';

const { paymentStatus, payWithCCOP, getExplorerUrl } = usePayment();
```

### useDivvi
**Location**: `src/hooks/useDivvi.ts`

Hook for referral system integration.

**Returns**:
```typescript
interface UseDivviReturn {
  isLoading: boolean;
  referralCode?: string;
  createReferral: (data: ReferralData) => Promise<void>;
  trackConversion: (amount: number) => Promise<void>;
}
```

**Usage**:
```tsx
import { useDivvi } from '@/hooks/useDivvi';

const { referralCode, createReferral, trackConversion } = useDivvi();
```

## Component Patterns

### Error Boundaries

Components should be wrapped with error boundaries for production:

```tsx
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary fallback={<ErrorFallback />}>
  <ProductCard product={product} />
</ErrorBoundary>
```

### Loading States

Implement consistent loading states:

```tsx
const Component = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <ComponentContent />;
};
```

### Responsive Design

Use mobile-first responsive patterns:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>
```

### Accessibility

Ensure all interactive components are accessible:

```tsx
<button
  aria-label="Add to cart"
  onClick={handleAddToCart}
  disabled={isLoading}
>
  {isLoading ? 'Adding...' : 'Add to Cart'}
</button>
```

## Testing Components

### Component Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 100,
    // ... other properties
  };

  it('renders product information', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('handles add to cart click', () => {
    const mockAddToCart = jest.fn();
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockAddToCart}
      />
    );

    fireEvent.click(screen.getByText('Add to Cart'));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
```

### Context Testing

```tsx
import { render } from '@testing-library/react';
import { CartProvider } from '@/contexts/CartContext';

const renderWithCart = (component) => {
  return render(
    <CartProvider>
      {component}
    </CartProvider>
  );
};
```

## Performance Optimization

### Memoization

Use React.memo for expensive components:

```tsx
const ProductCard = React.memo<ProductCardProps>(({ product, onAddToCart }) => {
  // Component implementation
});
```

### Callback Optimization

Use useCallback for event handlers:

```tsx
const handleAddToCart = useCallback((product: Product) => {
  // Handler implementation
}, [dependencies]);
```

### Effect Optimization

Use useMemo for expensive calculations:

```tsx
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

## Component Guidelines

### File Organization

```
components/
├── ui/                 # Basic UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Modal.tsx
├── layout/            # Layout components
│   ├── Header.tsx
│   └── Footer.tsx
├── features/          # Feature-specific components
│   ├── ProductCard.tsx
│   └── CartDrawer.tsx
└── web3/             # Web3-related components
    ├── WalletConnect.tsx
    └── CryptoPayment.tsx
```

### Naming Conventions

- **Components**: PascalCase (e.g., `ProductCard.tsx`)
- **Props**: camelCase (e.g., `onAddToCart`)
- **Files**: Match component name (e.g., `ProductCard.tsx`)

### Export Patterns

```tsx
// Default export for components
export default function ProductCard({ product }: ProductCardProps) {
  // Component implementation
}

// Named export for types
export type { ProductCardProps };
```

---

This documentation provides a comprehensive overview of all components in the Copoazú Shop application. For specific implementation details, refer to the individual component files.