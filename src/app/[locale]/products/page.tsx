'use client';

import { useTranslations } from 'next-intl';
import ProductCard from '@/components/ProductCard';

// Sample products data - same as in main page
const allProducts = [
  {
    id: '1',
    name: 'Web3 Hoodie',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 124,
    image: '/products/placeholder.svg',
    category: 'Hoodies',
    isNew: true,
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Blockchain T-Shirt',
    price: 29.99,
    rating: 4.6,
    reviewCount: 89,
    image: '/products/placeholder.svg',
    category: 'T-Shirts',
    isNew: true
  },
  {
    id: '3',
    name: 'Crypto Cap',
    price: 24.99,
    rating: 4.7,
    reviewCount: 67,
    image: '/products/placeholder.svg',
    category: 'Accessories',
    isBestSeller: true
  },
  {
    id: '4',
    name: 'DeFi Sweatshirt',
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.9,
    reviewCount: 156,
    image: '/products/placeholder.svg',
    category: 'Sweatshirts',
    isNew: true
  },
  {
    id: '5',
    name: 'NFT Hoodie Collection',
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.9,
    reviewCount: 203,
    image: '/products/placeholder.svg',
    category: 'Hoodies',
    isBestSeller: true
  },
  {
    id: '6',
    name: 'Smart Contract T-Shirt',
    price: 34.99,
    rating: 4.7,
    reviewCount: 142,
    image: '/products/placeholder.svg',
    category: 'T-Shirts',
    isNew: true
  },
  {
    id: '7',
    name: 'Metaverse Cap',
    price: 29.99,
    rating: 4.8,
    reviewCount: 98,
    image: '/products/placeholder.svg',
    category: 'Accessories',
    isBestSeller: true
  },
  {
    id: '8',
    name: 'DAO Sweatshirt',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviewCount: 167,
    image: '/products/placeholder.svg',
    category: 'Sweatshirts',
    isNew: true
  }
];

export default function ProductsPage() {
  const t = useTranslations('products');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F1E7', padding: '32px 16px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1C1C1C', marginBottom: '16px' }}>
          {t('title')}
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#9A9A9A', marginBottom: '48px' }}>
          {t('subtitle')}
        </p>
        
        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          marginBottom: '48px'
        }}>
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Additional Info */}
        <div style={{ 
          backgroundColor: '#FFFFFF', 
          padding: '32px', 
          borderRadius: '16px', 
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginTop: '48px'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1C1C1C', marginBottom: '16px' }}>
            {t('moreComingSoon')}
          </h2>
          <p style={{ color: '#9A9A9A' }}>
            {t('moreProductsDescription')}
          </p>
        </div>
      </div>
    </div>
  );
}