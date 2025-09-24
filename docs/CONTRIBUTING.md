# 🤝 Contributing to Copoazú Shop

Thank you for your interest in contributing to Copoazú Shop! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18 or higher
- **npm**, **yarn**, or **pnpm**
- **Git**
- A code editor (VS Code recommended)

### Development Setup

1. **Fork and Clone**
```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR-USERNAME/copoazushop.git
cd copoazushop
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Verify Setup**
Visit [http://localhost:3000](http://localhost:3000) to ensure everything works.

## 📋 Development Workflow

### Branch Naming

Use clear, descriptive branch names following this pattern:
```bash
# Feature branches
git checkout -b feature/add-product-reviews
git checkout -b feature/improve-search-functionality

# Bug fixes
git checkout -b fix/cart-calculation-error
git checkout -b fix/mobile-navigation-issue

# Chores/maintenance
git checkout -b chore/update-dependencies
git checkout -b docs/update-api-documentation
```

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Format
<type>(<scope>): <description>

# Examples
feat(cart): add item quantity controls
fix(payment): resolve cCOP token calculation
docs(readme): update installation instructions
style(components): apply new brand colors
refactor(hooks): simplify useWallet logic
test(checkout): add payment flow tests
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring without feature changes
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## 🧩 Code Standards

### TypeScript Guidelines

**Use Strict Typing**
```typescript
// ✅ Good - Specific interfaces
interface ProductProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  showQuickView?: boolean;
}

// ❌ Avoid - Using 'any'
const handleClick = (data: any) => { ... }
```

**Component Props**
```typescript
// ✅ Good - Well-defined props interface
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children
}) => {
  // Component implementation
};
```

### React Best Practices

**Component Structure**
```typescript
// 1. Imports
import React, { useState, useEffect } from 'react';
import { Product } from '@/types';

// 2. Types/Interfaces
interface ComponentProps {
  // props definition
}

// 3. Component
export const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 4. State
  const [state, setState] = useState(initialValue);

  // 5. Effects
  useEffect(() => {
    // effect logic
  }, [dependencies]);

  // 6. Event handlers
  const handleClick = () => {
    // handler logic
  };

  // 7. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

**State Management**
```typescript
// ✅ Good - Use appropriate state management
const [items, setItems] = useState<Product[]>([]);

// For complex state
const [state, dispatch] = useReducer(reducer, initialState);

// For global state
const { cart, addToCart } = useCart();
```

### Styling Guidelines

**Tailwind CSS Usage**
```typescript
// ✅ Good - Semantic, readable classes
<button className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-accent transition-colors">
  Add to Cart
</button>

// ✅ Good - Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**CSS Variables for Brand Colors**
```typescript
// ✅ Good - Use brand color classes
<div className="bg-brand-primary text-brand-white">

// ✅ Good - Use CSS variables for inline styles
<div style={{ backgroundColor: 'var(--brand-primary)' }}>

// ❌ Avoid - Hardcoded colors
<div className="bg-blue-500">
<div style={{ backgroundColor: '#3D7DD6' }}>
```

### Accessibility Standards

**Semantic HTML**
```typescript
// ✅ Good - Semantic elements
<button onClick={handleClick} aria-label="Add to cart">
  <PlusIcon />
</button>

<nav aria-label="Main navigation">
  <ul>
    <li><a href="/products">Products</a></li>
  </ul>
</nav>

// ✅ Good - Form accessibility
<label htmlFor="email">Email Address</label>
<input
  id="email"
  type="email"
  aria-describedby="email-error"
  required
/>
<div id="email-error" role="alert">
  {emailError}
</div>
```

**Keyboard Navigation**
```typescript
// ✅ Good - Keyboard support
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick();
  }
};

<div
  role="button"
  tabIndex={0}
  onKeyDown={handleKeyDown}
  onClick={handleClick}
>
  Clickable content
</div>
```

## 🧪 Testing Guidelines

### Component Testing

```typescript
// Example test structure
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/ProductCard';
import { mockProduct } from '@/tests/mocks';

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} onAddToCart={jest.fn()} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
  });

  it('calls onAddToCart when button is clicked', () => {
    const mockAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    fireEvent.click(screen.getByText('Add to Cart'));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
```

### Manual Testing Checklist

Before submitting a PR, ensure you've tested:

- [ ] **Responsive Design**: Mobile, tablet, desktop
- [ ] **Dark/Light Mode**: Both themes work correctly
- [ ] **Internationalization**: English and Spanish versions
- [ ] **Accessibility**: Keyboard navigation, screen readers
- [ ] **Cross-browser**: Chrome, Firefox, Safari, Edge
- [ ] **Web3 Features**: Wallet connection, payments (if applicable)

## 📚 Project Structure Understanding

### Key Directories

```
src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
├── contexts/              # React Context providers
├── hooks/                 # Custom React hooks
├── data/                  # Static data and configurations
├── types/                 # TypeScript type definitions
├── config/                # Application configuration
├── i18n/                  # Internationalization setup
└── messages/              # Translation files
```

### Component Categories

1. **Layout Components**: Header, Footer, Navigation
2. **UI Components**: Button, Input, Modal, Card
3. **Feature Components**: ProductCard, CartDrawer, WalletConnect
4. **Page Components**: Homepage sections, About content

### State Management Architecture

```typescript
// Global State (Context)
CartContext       -> Shopping cart state
ThemeContext      -> Dark/light mode
Web3Context       -> Wallet and blockchain state
VerificationContext -> User verification

// Local State (useState/useReducer)
Component-specific state that doesn't need to be global

// Server State (React Query)
API data fetching and caching
```

## 🌐 Web3 Development

### Wallet Integration

```typescript
// Example wallet integration
import { useAccount, useConnect } from 'wagmi';

const WalletComponent = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  return (
    <div>
      {isConnected ? (
        <p>Connected: {address}</p>
      ) : (
        <button onClick={() => connect({ connector: connectors[0] })}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};
```

### Payment Implementation

```typescript
// Example payment flow
const handlePayment = async () => {
  try {
    // 1. Check wallet connection
    if (!isConnected) {
      await connect();
      return;
    }

    // 2. Verify token balance
    const balance = await getBalance();
    if (balance < amount) {
      throw new Error('Insufficient balance');
    }

    // 3. Execute payment
    const tx = await payWithCCOP(amount);

    // 4. Wait for confirmation
    await tx.wait();

    // 5. Update UI
    setPaymentStatus('success');
  } catch (error) {
    setPaymentStatus('error');
    console.error('Payment failed:', error);
  }
};
```

## 🌍 Internationalization

### Adding New Translations

1. **Add to English (`src/messages/en.json`)**
```json
{
  "products": {
    "newFeature": "New feature description",
    "buttons": {
      "newAction": "New Action"
    }
  }
}
```

2. **Add to Spanish (`src/messages/es.json`)**
```json
{
  "products": {
    "newFeature": "Descripción de nueva funcionalidad",
    "buttons": {
      "newAction": "Nueva Acción"
    }
  }
}
```

3. **Use in Components**
```typescript
import { useTranslations } from 'next-intl';

const Component = () => {
  const t = useTranslations('products');

  return (
    <div>
      <p>{t('newFeature')}</p>
      <button>{t('buttons.newAction')}</button>
    </div>
  );
};
```

## 🐛 Debugging Guide

### Common Issues

**Hydration Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

**TypeScript Errors**
```bash
# Check for type errors
npx tsc --noEmit

# Common fixes
- Ensure proper type imports
- Check interface definitions
- Verify prop types match
```

**Styling Issues**
```bash
# Clear all caches
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

### Development Tools

**Browser DevTools**
- React Developer Tools
- Redux DevTools (if using Redux)
- Web3 wallet developer mode

**VS Code Extensions**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Hero
- Auto Rename Tag
- Bracket Pair Colorizer

## 📋 Pull Request Process

### Before Submitting

1. **Self Review**
   - [ ] Code follows project standards
   - [ ] No console.log statements
   - [ ] TypeScript errors resolved
   - [ ] Manual testing completed
   - [ ] Responsive design verified

2. **Documentation**
   - [ ] README updated (if needed)
   - [ ] Code comments added
   - [ ] API documentation updated

3. **Performance**
   - [ ] No unnecessary re-renders
   - [ ] Images optimized
   - [ ] Bundle size impact considered

### PR Template

```markdown
## Description
Brief description of changes and motivation.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] Responsive design verified
- [ ] Cross-browser testing done

## Screenshots
Include screenshots for visual changes.

## Additional Notes
Any additional information or considerations.
```

### Review Process

1. **Automated Checks**
   - TypeScript compilation
   - ESLint checks
   - Build verification

2. **Manual Review**
   - Code quality assessment
   - Design system compliance
   - Performance considerations
   - Security review

3. **Testing**
   - Feature functionality
   - Regression testing
   - Accessibility verification

## 🏆 Recognition

Contributors will be recognized in:
- GitHub contributors list
- Project documentation
- Release notes (for significant contributions)

## 💬 Getting Help

**Technical Questions**
- Create a GitHub Discussion
- Join our Discord community
- Check existing issues and documentation

**Code Review**
- Request review from maintainers
- Participate in community discussions
- Share knowledge and help others

## 📜 Code of Conduct

### Our Standards

**Positive Behavior:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

**Unacceptable Behavior:**
- Harassment of any kind
- Publishing others' private information
- Unprofessional conduct or language

### Enforcement

Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report issues to: [copoazulabs@gmail.com](mailto:copoazulabs@gmail.com)

---

**Thank you for contributing to Copoazú Shop! 🙏**

Your contributions help make Web3 e-commerce more accessible and user-friendly for everyone.