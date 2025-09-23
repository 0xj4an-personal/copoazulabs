import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductCard from '@/components/ProductCard'
import { CartProvider } from '@/contexts/CartContext'
import { VerificationProvider } from '@/contexts/VerificationContext'

// Mock product data
const mockProduct = {
  id: 'test-product-1',
  nameKey: 'testProduct',
  categoryKey: 'testCategory',
  collectionId: 'test-collection',
  price: 100000,
  originalPrice: 120000,
  image: '/test-image.jpg',
  availableSizes: ['S', 'M', 'L'],
  rating: 4.5,
  reviews: 42,
  inStock: true,
}

// Mock handlers
const mockOnAddToCart = jest.fn()
const mockOnToggleWishlist = jest.fn()

// Test wrapper with providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <VerificationProvider>
    <CartProvider>
      {children}
    </CartProvider>
  </VerificationProvider>
)

describe('ProductCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders product information correctly', () => {
    render(
      <TestWrapper>
        <ProductCard
          product={mockProduct}
          onAddToCart={mockOnAddToCart}
          onToggleWishlist={mockOnToggleWishlist}
        />
      </TestWrapper>
    )

    expect(screen.getByText('testProduct')).toBeInTheDocument()
    expect(screen.getByText('testCategory')).toBeInTheDocument()
    expect(screen.getByText('100,000 cCOP')).toBeInTheDocument()
  })

  it('shows available sizes', () => {
    render(
      <TestWrapper>
        <ProductCard
          product={mockProduct}
          onAddToCart={mockOnAddToCart}
          onToggleWishlist={mockOnToggleWishlist}
        />
      </TestWrapper>
    )

    expect(screen.getByText('S')).toBeInTheDocument()
    expect(screen.getByText('M')).toBeInTheDocument()
    expect(screen.getByText('L')).toBeInTheDocument()
  })

  it('enables add to cart button when size is selected', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <ProductCard
          product={mockProduct}
          onAddToCart={mockOnAddToCart}
          onToggleWishlist={mockOnToggleWishlist}
        />
      </TestWrapper>
    )

    const addToCartButton = screen.getByRole('button', { name: /sizes\.selectSize/i })
    expect(addToCartButton).toBeDisabled()

    // Select a size
    const sizeButton = screen.getByText('M')
    await user.click(sizeButton)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /addToCart/i })).not.toBeDisabled()
    })
  })

  it('calls onAddToCart when add to cart button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <ProductCard
          product={mockProduct}
          onAddToCart={mockOnAddToCart}
          onToggleWishlist={mockOnToggleWishlist}
        />
      </TestWrapper>
    )

    // Select a size first
    const sizeButton = screen.getByText('M')
    await user.click(sizeButton)

    // Click add to cart
    const addToCartButton = screen.getByRole('button', { name: /addToCart/i })
    await user.click(addToCartButton)

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct)
  })

  it('handles wishlist toggle correctly', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <ProductCard
          product={mockProduct}
          onAddToCart={mockOnAddToCart}
          onToggleWishlist={mockOnToggleWishlist}
        />
      </TestWrapper>
    )

    // Hover to show actions (on desktop)
    const productCard = screen.getByRole('img').closest('div')
    if (productCard) {
      fireEvent.mouseEnter(productCard)
    }

    await waitFor(() => {
      const wishlistButton = screen.getByRole('button', { name: /heart/i })
      expect(wishlistButton).toBeInTheDocument()
    })

    // Click wishlist button
    const wishlistButton = screen.getByRole('button', { name: /heart/i })
    await user.click(wishlistButton)

    expect(mockOnToggleWishlist).toHaveBeenCalledWith(mockProduct)
  })

  it('handles image load error gracefully', () => {
    render(
      <TestWrapper>
        <ProductCard
          product={mockProduct}
          onAddToCart={mockOnAddToCart}
          onToggleWishlist={mockOnToggleWishlist}
        />
      </TestWrapper>
    )

    const image = screen.getByRole('img')

    // Simulate image load error
    fireEvent.error(image)

    // The error handler should have been called
    expect(image.style.display).toBe('none')
  })

  it('applies correct styling based on props', () => {
    const { container } = render(
      <TestWrapper>
        <ProductCard
          product={mockProduct}
          onAddToCart={mockOnAddToCart}
          onToggleWishlist={mockOnToggleWishlist}
        />
      </TestWrapper>
    )

    const productCard = container.firstChild as HTMLElement
    expect(productCard).toHaveClass('relative', 'bg-white', 'rounded-2xl')
  })
})